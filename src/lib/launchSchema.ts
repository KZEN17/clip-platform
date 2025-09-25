// src/lib/launchSchema.ts

export interface LaunchEvent {
  $id: string;
  $createdAt: string;
  $updatedAt: string;

  // Required fields
  streamerName: string;
  launchTitle: string;
  tokenLogo: string; // URL to uploaded image
  scheduledDate: string; // ISO date string

  // Optional fields
  userId?: string; // Creator of the launch
  description?: string;
  twitchUsername?: string;
  youtubeChannel?: string;
  tiktokUsername?: string;
  instagramUsername?: string;
  discordServer?: string; // Discord server invite link
  gameCategory?: string;

  // Status and metadata
  status: "scheduled" | "live" | "completed" | "cancelled";
  maxParticipants?: number;
  currentParticipants: number;

  // Launch specific
  tokenSymbol?: string;
  expectedViews?: number;
  streamPlatform: "twitch" | "youtube" | "kick" | "multiple";

  // Engagement
  totalViews: number;
  totalClips: number;
  isVerified: boolean;
  isFeatured: boolean;

  // Timing
  estimatedDuration?: number; // in minutes
  timezone?: string;
}

// src/lib/campaignSchema.ts

export interface RewardsCampaign {
  $id: string;
  $createdAt: string;
  $updatedAt: string;

  // Required fields
  campaignTitle: string;
  campaignImage: string; // URL to uploaded image
  prizePool: number; // in USD
  payoutPer1kViews: number; // in USD
  campaignEndDate: string; // ISO date string
  googleDriveLink: string;
  socialMediaLinks: string[]; // Array of social media URLs

  // Optional fields
  creatorId?: string; // User who created the campaign
  description?: string;
  campaignConditions?: string; // Terms and conditions

  // Campaign settings
  status: "draft" | "active" | "paused" | "completed" | "cancelled";
  maxPayoutPerClip?: number; // Maximum payout per individual clip
  minViews?: number; // Minimum views required for payout
  targetAudience?: string;
  contentGuidelines?: string;

  // Participation
  currentParticipants: number;
  maxParticipants?: number;
  totalSubmissions: number;
  approvedSubmissions: number;

  // Financial tracking
  totalPaidOut: number;
  remainingBudget: number;

  // Settings
  autoApproveSubmissions: boolean;
  requiresApproval: boolean;
  allowMultipleSubmissions: boolean;

  // Metrics
  totalViews: number;
  avgViewsPerClip: number;
  conversionRate: number; // percentage

  // Tags and categorization
  tags?: string[];
  category?: string;
  difficulty?: "beginner" | "intermediate" | "advanced";
}

// Helper functions for Launch Events
export const createEmptyLaunchEvent = (
  userId?: string
): Partial<LaunchEvent> => {
  return {
    userId,
    streamerName: "",
    launchTitle: "",
    tokenLogo: "",
    scheduledDate: "",
    description: "",
    twitchUsername: "",
    youtubeChannel: "",
    tiktokUsername: "",
    instagramUsername: "",
    discordServer: "",
    gameCategory: "",
    status: "scheduled",
    maxParticipants: 100,
    currentParticipants: 0,
    tokenSymbol: "",
    expectedViews: 0,
    streamPlatform: "twitch",
    totalViews: 0,
    totalClips: 0,
    isVerified: false,
    isFeatured: false,
    estimatedDuration: 120, // 2 hours default
    timezone: "UTC",
  };
};

export const validateLaunchEvent = (launch: Partial<LaunchEvent>): string[] => {
  const errors: string[] = [];

  if (!launch.streamerName?.trim()) {
    errors.push("Streamer name is required");
  }

  if (!launch.launchTitle?.trim()) {
    errors.push("Launch title is required");
  }

  // if (!launch.tokenLogo?.trim()) {
  //   errors.push("Token logo is required");
  // }

  if (!launch.scheduledDate?.trim()) {
    errors.push("Scheduled date is required");
  } else {
    const date = new Date(launch.scheduledDate);
    if (isNaN(date.getTime())) {
      errors.push("Invalid date format");
    } else if (date < new Date()) {
      errors.push("Scheduled date must be in the future");
    }
  }

  return errors;
};

// Helper functions for Rewards Campaigns
export const createEmptyRewardsCampaign = (
  creatorId?: string
): Partial<RewardsCampaign> => {
  return {
    creatorId,
    campaignTitle: "",
    campaignImage: "",
    prizePool: 0,
    payoutPer1kViews: 0,
    campaignEndDate: "",
    googleDriveLink: "",
    socialMediaLinks: [],
    description: "",
    campaignConditions: "",
    status: "draft",
    maxPayoutPerClip: 100,
    minViews: 1000,
    targetAudience: "",
    contentGuidelines: "",
    currentParticipants: 0,
    maxParticipants: 500,
    totalSubmissions: 0,
    approvedSubmissions: 0,
    totalPaidOut: 0,
    remainingBudget: 0,
    autoApproveSubmissions: false,
    requiresApproval: true,
    allowMultipleSubmissions: true,
    totalViews: 0,
    avgViewsPerClip: 0,
    conversionRate: 0,
    tags: [],
    category: "",
    difficulty: "beginner",
  };
};

export const validateRewardsCampaign = (
  campaign: Partial<RewardsCampaign>
): string[] => {
  const errors: string[] = [];

  if (!campaign.campaignTitle?.trim()) {
    errors.push("Campaign title is required");
  }

  // if (!campaign.campaignImage?.trim()) {
  //   errors.push("Campaign image is required");
  // }

  if (!campaign.prizePool || campaign.prizePool <= 0) {
    errors.push("Prize pool must be greater than 0");
  }

  if (!campaign.payoutPer1kViews || campaign.payoutPer1kViews <= 0) {
    errors.push("Payout per 1K views must be greater than 0");
  }

  if (!campaign.campaignEndDate?.trim()) {
    errors.push("Campaign end date is required");
  } else {
    const date = new Date(campaign.campaignEndDate);
    if (isNaN(date.getTime())) {
      errors.push("Invalid end date format");
    } else if (date < new Date()) {
      errors.push("End date must be in the future");
    }
  }

  // if (!campaign.googleDriveLink?.trim()) {
  //   errors.push("Google Drive link is required");
  // }

  // if (!campaign.socialMediaLinks || campaign.socialMediaLinks.length === 0) {
  //   errors.push("At least one social media link is required");
  // }

  // Validate social media links format
  if (campaign.socialMediaLinks) {
    campaign.socialMediaLinks.forEach((link, index) => {
      try {
        new URL(link);
      } catch {
        errors.push(`Social media link ${index + 1} is not a valid URL`);
      }
    });
  }

  // Validate Google Drive link format
  // if (campaign.googleDriveLink && campaign.googleDriveLink.trim()) {
  //   try {
  //     const url = new URL(campaign.googleDriveLink);
  //     if (
  //       !url.hostname.includes("drive.google.com") &&
  //       !url.hostname.includes("docs.google.com")
  //     ) {
  //       errors.push("Google Drive link must be a valid Google Drive URL");
  //     }
  //   } catch {
  //     errors.push("Google Drive link is not a valid URL");
  //   }
  // }

  return errors;
};

// Helper function to prepare data for database
export const prepareLaunchEventForDatabase = (launch: Partial<LaunchEvent>) => {
  const cleanLaunch = Object.fromEntries(
    Object.entries(launch).filter(([, value]) => value !== undefined)
  );

  // Set computed fields
  cleanLaunch.remainingBudget =
    Number(cleanLaunch.prizePool) - Number(cleanLaunch.totalPaidOut || 0);

  return cleanLaunch;
};

export const prepareRewardsCampaignForDatabase = (
  campaign: Partial<RewardsCampaign>
) => {
  const cleanCampaign = Object.fromEntries(
    Object.entries(campaign).filter(([, value]) => value !== undefined)
  );

  // Set computed fields
  cleanCampaign.remainingBudget =
    Number(cleanCampaign.prizePool || 0) -
    Number(cleanCampaign.totalPaidOut || 0);

  // Ensure arrays are properly formatted
  if (campaign.socialMediaLinks && !Array.isArray(campaign.socialMediaLinks)) {
    cleanCampaign.socialMediaLinks = [];
  }

  if (campaign.tags && !Array.isArray(campaign.tags)) {
    cleanCampaign.tags = [];
  }

  return cleanCampaign;
};
