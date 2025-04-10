// Mapping of Malayalam alphabets with their English transliterations
export interface MalayalamLetter {
  english: string
  malayalam: string
  pronunciation: string
}

// New class mapping from the backend model (updated)
export const classMapping = {
  a: 0, aa: 1, ah: 2, ai: 3, am: 4, au: 5, ba: 6, bha: 7, cha: 8, chha: 9, 
  da: 10, dda: 11, dha: 12, dhha: 13, e: 14, ee: 15, ga: 16, gha: 17, ha: 18, 
  i: 19, ii: 20, ja: 21, ka: 22, kha: 23, la: 24, lla: 25, ma: 26, na: 27, 
  nga: 28, njya: 29, nna: 30, nothing: 31, o: 32, oo: 33, pa: 34, pha: 35, 
  r: 36, ra: 37, rra: 38, sa: 39, sha: 40, shha: 41, ta: 42, tha: 43, thha: 44, 
  tta: 45, u: 46, uu: 47, va: 48, ya: 49, zha: 50
}

// Get all class names from the mapping
export const allGestureClasses = Object.keys(classMapping)

// Direct mapping from class names to Malayalam letters
export const gestureToMalayalam: Record<string, MalayalamLetter> = {
  a: { english: "a", malayalam: "അ", pronunciation: "ah" },
  aa: { english: "aa", malayalam: "ആ", pronunciation: "aah" },
  ah: { english: "ah", malayalam: "അഃ", pronunciation: "aha" },
  ai: { english: "ai", malayalam: "ഐ", pronunciation: "ai" },
  am: { english: "am", malayalam: "അം", pronunciation: "am" },
  au: { english: "au", malayalam: "ഔ", pronunciation: "au" },
  ba: { english: "ba", malayalam: "ബ", pronunciation: "ba" },
  bha: { english: "bha", malayalam: "ഭ", pronunciation: "bha" },
  cha: { english: "cha", malayalam: "ച", pronunciation: "cha" },
  chha: { english: "chha", malayalam: "ഛ", pronunciation: "chha" },
  da: { english: "da", malayalam: "ഡ", pronunciation: "da" },
  dda: { english: "dda", malayalam: "ഢ", pronunciation: "ɖʱa" },
  dha: { english: "dha", malayalam: "ദ", pronunciation: "d̪a" },
  dhha: { english: "dhha", malayalam: "ധ", pronunciation: "d̪ʱa" },
  e: { english: "e", malayalam: "എ", pronunciation: "ea" },
  ee: { english: "ee", malayalam: "ഏ", pronunciation: "eeh" },
  ga: { english: "ga", malayalam: "ഗ", pronunciation: "ga" },
  gha: { english: "gha", malayalam: "ഘ", pronunciation: "gha" },
  ha: { english: "ha", malayalam: "ഹ", pronunciation: "ha" },
  i: { english: "i", malayalam: "ഇ", pronunciation: "eh" },
  ii: { english: "ii", malayalam: "ഈ", pronunciation: "eeh" },
  ja: { english: "ja", malayalam: "ജ", pronunciation: "ja" },
  ka: { english: "ka", malayalam: "ക", pronunciation: "ka" },
  kha: { english: "kha", malayalam: "ഖ", pronunciation: "kha" },
  la: { english: "la", malayalam: "ല", pronunciation: "la" },
  lla: { english: "lla", malayalam: "ള്ള", pronunciation: "lla" },
  ma: { english: "ma", malayalam: "മ", pronunciation: "ma" },
  na: { english: "na", malayalam: "ന", pronunciation: "na" },
  nga: { english: "nga", malayalam: "ങ", pronunciation: "nga" },
  njya: { english: "njya", malayalam: "ഞ", pronunciation: "nya" },
  nna: { english: "nna", malayalam: "ണ", pronunciation: "nna" },
  o: { english: "o", malayalam: "ഒ", pronunciation: "oh" },
  oo: { english: "oo", malayalam: "ഓ", pronunciation: "ooh" },
  pa: { english: "pa", malayalam: "പ", pronunciation: "pa" },
  pha: { english: "pha", malayalam: "ഫ", pronunciation: "pʰa" },
  r: { english: "r", malayalam: "ഋ", pronunciation: "ri" },
  ra: { english: "ra", malayalam: "ര", pronunciation: "ra" },
  rra: { english: "rra", malayalam: "റ", pronunciation: "rra" },
  sa: { english: "sa", malayalam: "സ", pronunciation: "sa" },
  sha: { english: "sha", malayalam: "ശ", pronunciation: "sha" },
  shha: { english: "shha", malayalam: "ഷ", pronunciation: "ʂa" },
  ta: { english: "ta", malayalam: "ട", pronunciation: "ta" },
  tha: { english: "tha", malayalam: "ത", pronunciation: "tha" },
  thha: { english: "thha", malayalam: "ഥ", pronunciation: "thha" },
  tta: { english: "tta", malayalam: "ഠ", pronunciation: "ʈʰa" },
  u: { english: "u", malayalam: "ഉ", pronunciation: "uh" },
  uu: { english: "uu", malayalam: "ഊ", pronunciation: "uː" },
  va: { english: "va", malayalam: "വ", pronunciation: "va" },
  ya: { english: "ya", malayalam: "യ", pronunciation: "ya" },
  zha: { english: "zha", malayalam: "ഴ", pronunciation: "zha" },
  nothing: { english: "", malayalam: "", pronunciation: "" }
}

// Utility functions
export function findMalayalamByEnglish(english: string): MalayalamLetter | undefined {
  const lowerEnglish = english.toLowerCase();

  // Look up the gesture in the mapping
  const malayalamLetter = gestureToMalayalam[lowerEnglish];

  // If the gesture is not found, return undefined or a fallback object
  if (!malayalamLetter) {
    console.warn(`No Malayalam translation found for gesture: ${lowerEnglish}`);
    return undefined; // Return undefined to indicate no translation is available
  }

  return malayalamLetter;
}


export function findMalayalamByCharacter(character: string): MalayalamLetter | undefined {
  return Object.values(gestureToMalayalam).find(letter => letter.malayalam === character)
}

// Get all gesture classes for simulation
export function getAllGestureClasses(): string[] {
  return allGestureClasses.filter((cls) => cls !== "nothing")
}
