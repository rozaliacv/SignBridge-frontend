"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Loader2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// API endpoint - make sure this matches your backend server
const API_URL = "http://localhost:5000/predict";

export default function TranslatePage() {
  const [isRecording, setIsRecording] = useState(false);
  const [recognizedGesture, setRecognizedGesture] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [cameraError, setCameraError] = useState(false);
  const [confidence, setConfidence] = useState(0);
  const [apiError, setApiError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Create a hidden canvas element for capturing frames
    const canvas = document.createElement('canvas');
    canvasRef.current = canvas;

    // Test API connectivity on component mount
    testApiConnection();

    return () => {
      // Clean up the camera stream and interval when component unmounts
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Debug useEffect to track isRecording state
  useEffect(() => {
    console.log("[DEBUG] isRecording state updated:", isRecording);
  }, [isRecording]);

  // Test API connectivity
  const testApiConnection = async () => {
    try {
      const response = await fetch(`${API_URL.split('/predict')[0]}/health`, {
        method: 'GET',
      });
      
      if (response.ok) {
        console.log("Backend API is reachable!");
        setApiError(null);
      } else {
        setApiError("Backend health check failed. API may be down.");
        console.error("Backend health check failed");
      }
    } catch (error) {
      console.error("Cannot reach backend:", error);
      setApiError("Cannot connect to backend server");
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) videoRef.current.srcObject = stream;
      streamRef.current = stream;
      
      // Add timeout to ensure state updates
      setTimeout(() => {
        setIsRecording(true);
        startGestureRecognition();
      }, 100);
    } catch (error) {
      console.error("Camera error:", error);
      setCameraError(true);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    if (intervalRef.current) {
      console.log("[DEBUG] Clearing interval");
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsRecording(false);
    setRecognizedGesture("");
    setConfidence(0);
  };

  const captureFrame = (): string | null => {
    if (!videoRef.current || !canvasRef.current) return null;

    const video = videoRef.current;
    const canvas = canvasRef.current;

    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw the current video frame to the canvas
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert canvas to base64 image data
    return canvas.toDataURL('image/jpeg', 0.8);
  };

  const startGestureRecognition = () => {
    console.log("[DEBUG] Starting gesture recognition interval");
    intervalRef.current = setInterval(async () => {
      console.log("[DEBUG] Interval tick - isRecording:", isRecording);
      
      // if (!isRecording) {
      //   console.log("[DEBUG] Clearing interval - recording stopped");
      //   if (intervalRef.current) clearInterval(intervalRef.current);
      //   return;
      // }

      try {
        console.log("[DEBUG] Attempting frame capture");
        const imageData = captureFrame();
        
        if (!imageData) {
          console.error("[ERROR] Failed to capture frame");
          return;
        }

        console.log("[DEBUG] Sending frame to API");
        const response = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image: imageData.split(",")[1] }),
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error("API request failed:", errorText);
          throw new Error(`API request failed: ${response.status} ${errorText}`);
        }
        
        const data = await response.json();
        console.log("API response:", data);
        
        // Use the top prediction
        if (data.predictions && data.predictions.length > 0) {
          const topPrediction = data.predictions[0];
          setRecognizedGesture(topPrediction.class);
          setConfidence(Math.round(topPrediction.confidence * 100));
          console.log(`Gesture recognized: ${topPrediction.class} (${Math.round(topPrediction.confidence * 100)}%)`);
          console.log("Updating state with recognized gesture:", topPrediction.class);
          console.log("Updating state with confidence:", Math.round(topPrediction.confidence * 100));
        } else {
          console.log("No predictions returned from API");
          setRecognizedGesture("");
          setConfidence(0);
        }
      } catch (error) {
        console.error("Error detecting gestures:", error);
        setApiError(error instanceof Error ? error.message : "Unknown error occurred");
      } finally {
        setIsProcessing(false);
      }
    }, 2000); // Process every 2 seconds
  };

  return (
    <div className="container py-8 px-4 md:px-6">
      <h1 className="text-3xl font-bold mb-6">Sign Language Translation</h1>

      {apiError && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Connection Error</AlertTitle>
          <AlertDescription>{apiError}</AlertDescription>
        </Alert>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle>Live Video Feed</CardTitle>
            <CardDescription>Position your hands clearly in the frame for best results</CardDescription>
          </CardHeader>
          <CardContent className="p-0 aspect-video bg-muted relative">
            {cameraError ? (
              <Alert variant="destructive" className="m-4">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>Could not access camera. Please check permissions and try again.</AlertDescription>
              </Alert>
            ) : (
              <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
            )}
            {!isRecording && !cameraError && (
              <div className="absolute inset-0 flex items-center justify-center bg-background/80">
                <Button size="lg" onClick={startCamera}>
                  Start Camera
                </Button>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between p-4">
            {isRecording ? (
              <Button variant="destructive" onClick={stopCamera}>
                Stop Translation
              </Button>
            ) : (
              <Button onClick={startCamera} disabled={cameraError}>
                Start Translation
              </Button>
            )}
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recognized Gesture</CardTitle>
            <CardDescription>The translated sign will appear here</CardDescription>
          </CardHeader>
          <CardContent className="min-h-[200px] flex items-center justify-center">
            {isProcessing ? (
              <div className="flex flex-col items-center gap-2">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-muted-foreground">Processing gesture...</p>
              </div>
            ) : recognizedGesture ? (
              <div className="text-center">
                <p className="text-4xl font-bold mb-2">{recognizedGesture}</p>
                <p className="text-muted-foreground">Sign recognized with {confidence}% confidence</p>
              </div>
            ) : (
              <p className="text-muted-foreground text-center">
                {isRecording ? "Waiting for gestures..." : "Start the translation to see recognized gestures"}
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}