// src/lib/profileSchema.ts

// TypeScript interface for type safety in the application
export interface UserProfile {
  // Core fields
  $id: string;
  userId: string;
  email: string;
  name: string;
  displayName: string;
  avatarUrl?: string;
  userType: "clipper" | "streamer" | "agency";
  onboardingCompleted: boolean;
  $createdAt: string;
  $updatedAt: string;

  // Social/Platform fields
  twitterUsername?: string;
  twitchUsername?: string;
  youtubeChannel?: string;
  instagramUsername?: string;
  discordUsername?: string;

  // Streamer-specific
  streamingPlatform?: "twitch" | "youtube" | "kick";
  bannerUrl?: string;
  walletAddress?: string;
  streamSchedule?: string[]; // JSON string array
  subscriberCount?: number;
  avgViewerCount?: number;

  // Agency-specific
  agencyName?: string;
  contactEmail?: string;
  contactPhone?: string;
  website?: string;
  teamSize?: number;
  specializations?: string[]; // Array of specializations

  // Clipper-specific
  portfolioUrl?: string;
  preferredGenres?: string[]; // Array of genres
  averageClipsPerWeek?: number;
  editingSoftware?: string;

  // Common profile
  bio?: string;
  location?: string;
  timezone?: string;
  languages?: string[]; // Array of languages - FIXED
  joinedAt: string;

  // Performance/Stats
  totalEarnings?: number;
  monthlyEarnings?: number;
  totalViews?: number;
  totalClips?: number;
  successRate?: number;
  rating?: number;

  // Settings/Preferences
  emailNotifications?: boolean;
  pushNotifications?: boolean;
  profileVisibility?: "public" | "private" | "followers";
  availableForHire?: boolean;
  preferredPaymentMethod?: string;

  // Verification/Status
  isVerified?: boolean;
  verificationLevel?: "none" | "basic" | "premium";
  accountStatus?: "active" | "suspended" | "pending";
  lastActive?: string;

  // Additional metadata
  referralCode?: string;
  referredBy?: string;
  tags?: string[]; // Array of tags
  customFields?: Record<string, unknown>; // Object instead of JSON string
}

// Helper functions for working with the profile data
export const createEmptyProfile = (
  userId: string,
  email: string,
  userType: UserProfile["userType"]
): Partial<UserProfile> => {
  return {
    userId,
    email,
    name: "",
    displayName: "",
    userType,
    onboardingCompleted: false,
    joinedAt: new Date().toISOString(),
    totalEarnings: 0,
    monthlyEarnings: 0,
    totalViews: 0,
    totalClips: 0,
    successRate: 0,
    rating: 0,
    subscriberCount: 0,
    avgViewerCount: 0,
    teamSize: 1,
    averageClipsPerWeek: 0,
    languages: [], // Initialize as empty array
    specializations: [],
    preferredGenres: [],
    tags: [],
    emailNotifications: true,
    pushNotifications: true,
    profileVisibility: "public",
    availableForHire: true,
    isVerified: false,
    verificationLevel: "none",
    accountStatus: "active",
  };
};

// Function to validate required fields based on user type
export const validateProfileByType = (
  profile: Partial<UserProfile>
): string[] => {
  const errors: string[] = [];

  // Common required fields
  if (!profile.name?.trim()) errors.push("Name is required");
  if (!profile.displayName?.trim()) errors.push("Display name is required");

  // Type-specific validations
  switch (profile.userType) {
    case "streamer":
      if (!profile.streamingPlatform)
        errors.push("Primary streaming platform is required");
      break;

    case "agency":
      if (!profile.agencyName?.trim()) errors.push("Agency name is required");
      if (!profile.contactEmail?.trim())
        errors.push("Contact email is required");
      break;

    case "clipper":
      // Clippers have no additional required fields beyond common ones
      break;
  }

  return errors;
};

// Helper function to convert comma-separated string to array
export const stringToArray = (str: string | undefined): string[] => {
  if (!str || !str.trim()) return [];
  return str
    .split(",")
    .map((item) => item.trim())
    .filter((item) => item);
};

// Helper function to convert array to comma-separated string
export const arrayToString = (arr: string[] | undefined): string => {
  if (!arr || !Array.isArray(arr)) return "";
  return arr.join(", ");
};

// Function to prepare profile data for database insert
export const prepareProfileForDatabase = (profile: Partial<UserProfile>) => {
  // Remove undefined values
  const cleanProfile = Object.fromEntries(
    Object.entries(profile).filter(([_, value]) => value !== undefined)
  );

  // Ensure arrays are properly formatted for Appwrite
  if (profile.languages) {
    cleanProfile.languages = Array.isArray(profile.languages)
      ? profile.languages
      : stringToArray(profile.languages as string);
  }

  if (profile.specializations) {
    cleanProfile.specializations = Array.isArray(profile.specializations)
      ? profile.specializations
      : stringToArray(profile.specializations as string);
  }

  if (profile.preferredGenres) {
    cleanProfile.preferredGenres = Array.isArray(profile.preferredGenres)
      ? profile.preferredGenres
      : stringToArray(profile.preferredGenres as string);
  }

  if (profile.tags) {
    cleanProfile.tags = Array.isArray(profile.tags)
      ? profile.tags
      : stringToArray(profile.tags as string);
  }

  return cleanProfile;
};

// Function to parse profile data from database (now arrays come as arrays)
export const parseProfileFromDatabase = (profile: UserProfile): UserProfile => {
  const parsedProfile = { ...profile };

  // Ensure arrays are arrays (Appwrite should return them as arrays already)
  if (parsedProfile.languages && !Array.isArray(parsedProfile.languages)) {
    parsedProfile.languages = stringToArray(parsedProfile.languages);
  }

  if (
    parsedProfile.specializations &&
    !Array.isArray(parsedProfile.specializations)
  ) {
    parsedProfile.specializations = stringToArray(
      parsedProfile.specializations
    );
  }

  if (
    parsedProfile.preferredGenres &&
    !Array.isArray(parsedProfile.preferredGenres)
  ) {
    parsedProfile.preferredGenres = stringToArray(
      parsedProfile.preferredGenres
    );
  }

  if (parsedProfile.tags && !Array.isArray(parsedProfile.tags)) {
    parsedProfile.tags = stringToArray(parsedProfile.tags);
  }

  // Parse other JSON fields if they exist as strings
  try {
    if (
      parsedProfile.customFields &&
      typeof parsedProfile.customFields === "string"
    ) {
      parsedProfile.customFields = JSON.parse(parsedProfile.customFields);
    }
  } catch (error) {
    console.error("Error parsing profile JSON fields:", error);
  }

  return parsedProfile;
};

// Type guards for checking user types
export const isStreamer = (profile: UserProfile): boolean => {
  return profile.userType === "streamer";
};

export const isClipper = (profile: UserProfile): boolean => {
  return profile.userType === "clipper";
};

export const isAgency = (profile: UserProfile): boolean => {
  return profile.userType === "agency";
};
