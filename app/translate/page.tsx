"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, Loader2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function TranslatePage() {
  const [isRecording, setIsRecording] = useState(false)
  const [recognizedGesture, setRecognizedGesture] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [cameraError, setCameraError] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)

  useEffect(() => {
    return () => {
      // Clean up the camera stream when component unmounts
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop())
      }
    }
  }, [])

  const startCamera = async () => {
    try {
      setCameraError(false)
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }
      streamRef.current = stream
      setIsRecording(true)

      // Simulate gesture recognition with a timer
      simulateGestureRecognition()
    } catch (error) {
      console.error("Error accessing camera:", error)
      setCameraError(true)
    }
  }

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop())
      streamRef.current = null
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null
    }
    setIsRecording(false)
    setRecognizedGesture("")
  }

  const simulateGestureRecognition = () => {
    // This is a placeholder for actual ML-based gesture recognition
    // In a real app, you would integrate with TensorFlow.js or a similar library
    const gestures = ["Hello", "Thank you", "Yes", "No", "Help", "Please", "Good"]

    const recognitionInterval = setInterval(() => {
      if (!isRecording) {
        clearInterval(recognitionInterval)
        return
      }

      setIsProcessing(true)

      // Simulate processing delay
      setTimeout(() => {
        const randomGesture = gestures[Math.floor(Math.random() * gestures.length)]
        setRecognizedGesture(randomGesture)
        setIsProcessing(false)
      }, 1500)
    }, 5000)

    return () => clearInterval(recognitionInterval)
  }

  return (
    <div className="container py-8 px-4 md:px-6">
      <h1 className="text-3xl font-bold mb-6">Sign Language Translation</h1>

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
                <p className="text-muted-foreground">Sign recognized</p>
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
  )
}

