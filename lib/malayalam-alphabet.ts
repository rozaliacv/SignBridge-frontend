// Mapping of Malayalam alphabets with their English transliterations
export interface MalayalamLetter {
  english: string
  malayalam: string
  pronunciation: string
}

// Class mapping from the backend model
export const classMapping = {
  A: 0,
  Aa: 1,
  Ah: 2,
  Ai: 3,
  Am: 4,
  Au: 5,
  Ba: 6,
  Bha: 7,
  Ca: 8,
  Cha: 9,
  D_a: 10,
  D_ha: 11,
  Da: 12,
  Dha: 13,
  E: 14,
  E_: 15,
  Ee: 16,
  Ee_: 17,
  Ga: 18,
  Gha: 19,
  Ha: 20,
  I: 21,
  Ii: 22,
  Ilh: 23,
  Ill: 24,
  In: 25,
  Irr: 26,
  Ja: 27,
  Ka: 28,
  Kha: 29,
  La: 30,
  Lha: 31,
  Ma: 32,
  N_a: 33,
  Na: 34,
  Nga: 35,
  Nha: 36,
  Nothing: 37,
  O: 38,
  Oo: 39,
  Pa: 40,
  Pha: 41,
  R: 42,
  Ra: 43,
  Rha: 44,
  Sa: 45,
  Sha: 46,
  Shha: 47,
  Space: 48,
  T_a: 49,
  T_ha: 50,
  Ta: 51,
  Tha: 52,
  U: 53,
  U_: 54,
  Uu: 55,
  Uu_: 56,
  Va: 57,
  Ya: 58,
  Zha: 59,
}

// Get all class names from the mapping
export const allGestureClasses = Object.keys(classMapping)

// Direct mapping from class names to Malayalam letters
export const gestureToMalayalam: Record<string, MalayalamLetter> = {
  // Vowels
  A: { english: "a", malayalam: "അ", pronunciation: "ah" },
  Aa: { english: "aa", malayalam: "ആ", pronunciation: "aah" },
  I: { english: "i", malayalam: "ഇ", pronunciation: "ih" },
  Ii: { english: "ii", malayalam: "ഈ", pronunciation: "eeh" },
  U: { english: "u", malayalam: "ഉ", pronunciation: "uh" },
  Uu: { english: "uu", malayalam: "ഊ", pronunciation: "ooh" },
  R: { english: "r", malayalam: "ഋ", pronunciation: "ri" },
  E: { english: "e", malayalam: "എ", pronunciation: "eh" },
  E_: { english: "e", malayalam: "ഏ", pronunciation: "ae" },
  Ai: { english: "ai", malayalam: "ഐ", pronunciation: "ai" },
  O: { english: "o", malayalam: "ഒ", pronunciation: "oh" },
  Oo: { english: "oo", malayalam: "ഓ", pronunciation: "oh" },
  Au: { english: "au", malayalam: "ഔ", pronunciation: "au" },
  Am: { english: "am", malayalam: "അം", pronunciation: "am" },
  Ah: { english: "ah", malayalam: "അഃ", pronunciation: "aha" },

  // Consonants
  Ka: { english: "ka", malayalam: "ക", pronunciation: "ka" },
  Kha: { english: "kha", malayalam: "ഖ", pronunciation: "kha" },
  Ga: { english: "ga", malayalam: "ഗ", pronunciation: "ga" },
  Gha: { english: "gha", malayalam: "ഘ", pronunciation: "gha" },
  Nga: { english: "nga", malayalam: "ങ", pronunciation: "nga" },
  Ca: { english: "cha", malayalam: "ച", pronunciation: "cha" },
  Cha: { english: "chha", malayalam: "ഛ", pronunciation: "chha" },
  Ja: { english: "ja", malayalam: "ജ", pronunciation: "ja" },
  Jha: { english: "jha", malayalam: "ഝ", pronunciation: "jha" },
  Nha: { english: "nya", malayalam: "ഞ", pronunciation: "nya" },
  Ta: { english: "ta", malayalam: "ട", pronunciation: "ta" },
  T_a: { english: "tta", malayalam: "ഠ", pronunciation: "tta" },
  Da: { english: "da", malayalam: "ഡ", pronunciation: "da" },
  D_a: { english: "dda", malayalam: "ഢ", pronunciation: "dda" },
  Na: { english: "na", malayalam: "ണ", pronunciation: "na" },
  Tha: { english: "tha", malayalam: "ത", pronunciation: "tha" },
  T_ha: { english: "thha", malayalam: "ഥ", pronunciation: "thha" },
  Dha: { english: "dha", malayalam: "ദ", pronunciation: "dha" },
  D_ha: { english: "dhha", malayalam: "ധ", pronunciation: "dhha" },
  N_a: { english: "nna", malayalam: "ന", pronunciation: "nna" },
  Pa: { english: "pa", malayalam: "പ", pronunciation: "pa" },
  Pha: { english: "pha", malayalam: "ഫ", pronunciation: "pha" },
  Ba: { english: "ba", malayalam: "ബ", pronunciation: "ba" },
  Bha: { english: "bha", malayalam: "ഭ", pronunciation: "bha" },
  Ma: { english: "ma", malayalam: "മ", pronunciation: "ma" },
  Ya: { english: "ya", malayalam: "യ", pronunciation: "ya" },
  Ra: { english: "ra", malayalam: "ര", pronunciation: "ra" },
  Rha: { english: "rra", malayalam: "റ", pronunciation: "rra" },
  La: { english: "la", malayalam: "ല", pronunciation: "la" },
  Lha: { english: "lla", malayalam: "ള", pronunciation: "lla" },
  Va: { english: "va", malayalam: "വ", pronunciation: "va" },
  Sha: { english: "sha", malayalam: "ശ", pronunciation: "sha" },
  Shha: { english: "shha", malayalam: "ഷ", pronunciation: "shha" },
  Sa: { english: "sa", malayalam: "സ", pronunciation: "sa" },
  Ha: { english: "ha", malayalam: "ഹ", pronunciation: "ha" },
  Zha: { english: "zha", malayalam: "ഴ", pronunciation: "zha" },

  // Special characters
  Ill: { english: "ll", malayalam: "ല്ല", pronunciation: "lla" },
  Ilh: { english: "lh", malayalam: "ള്ള", pronunciation: "lha" },
  In: { english: "n", malayalam: "ന്", pronunciation: "n" },
  Irr: { english: "rr", malayalam: "ര്", pronunciation: "r" },

  // Vowel signs
  Ee_: { english: "ee", malayalam: "ീ", pronunciation: "ee" },
  Uu_: { english: "oo", malayalam: "ൂ", pronunciation: "oo" },
  U_: { english: "u", malayalam: "ു", pronunciation: "u" },

  // Special cases
  Nothing: { english: "", malayalam: "", pronunciation: "" },
  Space: { english: " ", malayalam: " ", pronunciation: "space" },
}

// Utility functions
export function findMalayalamByEnglish(english: string): MalayalamLetter | undefined {
  // First try direct mapping from gesture class
  if (gestureToMalayalam[english]) {
    return gestureToMalayalam[english]
  }

  // Try case-insensitive lookup
  const upperEnglish = english.toUpperCase()
  for (const key of Object.keys(gestureToMalayalam)) {
    if (key.toUpperCase() === upperEnglish) {
      return gestureToMalayalam[key]
    }
  }

  // If not found, create a default mapping
  return {
    english: english.toLowerCase(),
    malayalam: "?",
    pronunciation: english.toLowerCase().replace(/_/g, " "),
  }
}

export function findMalayalamByCharacter(character: string): MalayalamLetter | undefined {
  for (const letter of Object.values(gestureToMalayalam)) {
    if (letter.malayalam === character) {
      return letter
    }
  }
  return undefined
}

// Get all gesture classes for simulation
export function getAllGestureClasses(): string[] {
  return allGestureClasses.filter((cls) => cls !== "Nothing" && cls !== "Space")
}