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
  streamSchedule?: string; // JSON string
  subscriberCount?: number;
  avgViewerCount?: number;

  // Agency-specific
  agencyName?: string;
  contactEmail?: string;
  contactPhone?: string;
  website?: string;
  teamSize?: number;
  specializations?: string; // JSON array

  // Clipper-specific
  portfolioUrl?: string;
  preferredGenres?: string; // JSON array
  averageClipsPerWeek?: number;
  editingSoftware?: string;

  // Common profile
  bio?: string;
  location?: string;
  timezone?: string;
  languages?: string; // JSON array
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
  tags?: string; // JSON array
  customFields?: string; // JSON object
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

// Function to prepare profile data for database insert
export const prepareProfileForDatabase = (profile: Partial<UserProfile>) => {
  // Remove undefined values and prepare JSON fields
  const cleanProfile = Object.fromEntries(
    Object.entries(profile).filter(([_, value]) => value !== undefined)
  );

  // Convert arrays to JSON strings if they exist and are arrays
  if (profile.specializations && Array.isArray(profile.specializations)) {
    cleanProfile.specializations = JSON.stringify(profile.specializations);
  }
  if (profile.preferredGenres && Array.isArray(profile.preferredGenres)) {
    cleanProfile.preferredGenres = JSON.stringify(profile.preferredGenres);
  }
  if (profile.languages && Array.isArray(profile.languages)) {
    cleanProfile.languages = JSON.stringify(profile.languages);
  }
  if (profile.tags && Array.isArray(profile.tags)) {
    cleanProfile.tags = JSON.stringify(profile.tags);
  }

  return cleanProfile;
};

// Function to parse profile data from database
export const parseProfileFromDatabase = (profile: any): UserProfile => {
  const parsedProfile = { ...profile };

  // Parse JSON string fields back to arrays/objects
  try {
    if (
      parsedProfile.specializations &&
      typeof parsedProfile.specializations === "string"
    ) {
      parsedProfile.specializations = JSON.parse(parsedProfile.specializations);
    }
    if (
      parsedProfile.preferredGenres &&
      typeof parsedProfile.preferredGenres === "string"
    ) {
      parsedProfile.preferredGenres = JSON.parse(parsedProfile.preferredGenres);
    }
    if (
      parsedProfile.languages &&
      typeof parsedProfile.languages === "string"
    ) {
      parsedProfile.languages = JSON.parse(parsedProfile.languages);
    }
    if (parsedProfile.tags && typeof parsedProfile.tags === "string") {
      parsedProfile.tags = JSON.parse(parsedProfile.tags);
    }
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
