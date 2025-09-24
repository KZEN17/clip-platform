// src/components/onboarding/StreamerOnboarding.tsx
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/useToast";
import { account, databases, storage } from "@/lib/appwrite";
import {
  createEmptyProfile,
  prepareProfileForDatabase,
  UserProfile,
  validateProfileByType,
} from "@/lib/profileSchema";
import { ID } from "appwrite";
import {
  Check,
  Clock,
  Globe,
  Instagram,
  Languages,
  MapPin,
  TrendingUp,
  Twitch,
  Twitter,
  Upload,
  Wallet,
  Youtube,
} from "lucide-react";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface StreamerOnboardingProps {
  onComplete: () => void;
}

export const StreamerOnboarding = ({ onComplete }: StreamerOnboardingProps) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const { user, refreshUser } = useAuth();
  const { toast } = useToast();

  const [formData, setFormData] = useState(() => {
    if (user) {
      return {
        ...createEmptyProfile(user.$id, user.email, "streamer"),
        name: user.name || "",
        displayName: user.name || "",
      } as Partial<UserProfile>;
    }
    return {
      name: "",
      displayName: "",
      streamingPlatform: "",
      bio: "",
      location: "",
      timezone: "",
      twitchUsername: "",
      youtubeChannel: "",
      twitterUsername: "",
      instagramUsername: "",
      walletAddress: "",
      website: "",
      languages: "",
      subscriberCount: 0,
      avgViewerCount: 0,
    } as unknown as Partial<UserProfile>;
  });

  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>("");
  const [bannerPreview, setBannerPreview] = useState<string>("");
  const [errors, setErrors] = useState<string[]>([]);

  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "avatar" | "banner"
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select a file smaller than 5MB",
          variant: "destructive",
        });
        return;
      }

      if (type === "avatar") {
        setAvatarFile(file);
      } else {
        setBannerFile(file);
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        if (type === "avatar") {
          setAvatarPreview(result);
        } else {
          setBannerPreview(result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadFile = async (
    file: File,
    prefix: string
  ): Promise<string | null> => {
    if (!user) return null;

    try {
      const fileId = `${prefix}_${user.$id}_${Date.now()}`;
      const bucketId = process.env.NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_ID;

      if (!bucketId) {
        console.warn("Storage bucket ID not configured");
        return null;
      }

      const response = await storage.createFile(bucketId, fileId, file);
      const fileUrl = storage.getFileView(bucketId, response.$id);
      return fileUrl.toString();
    } catch (error) {
      console.error(`${prefix} upload error:`, error);
      return null;
    }
  };

  const handleNext = () => {
    const stepErrors = validateCurrentStep();
    if (stepErrors.length > 0) {
      setErrors(stepErrors);
      return;
    }
    setErrors([]);
    setStep(step + 1);
  };

  const validateCurrentStep = (): string[] => {
    switch (step) {
      case 1:
        const errors = [];
        if (!formData.name?.trim()) errors.push("Channel name is required");
        return errors;
      case 2:
        return formData.streamingPlatform
          ? []
          : ["Primary streaming platform is required"];
      case 3:
        return []; // All optional fields
      default:
        return [];
    }
  };

  const handleComplete = async () => {
    if (!user) return;

    // Final validation
    const validationErrors = validateProfileByType(formData);
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      let avatarUrl = formData.avatarUrl;
      let bannerUrl = formData.bannerUrl;

      // Upload files if they exist
      if (avatarFile) {
        const uploadedUrl = await uploadFile(avatarFile, "streamer_avatar");
        if (uploadedUrl) avatarUrl = uploadedUrl;
      }

      if (bannerFile) {
        const uploadedUrl = await uploadFile(bannerFile, "streamer_banner");
        if (uploadedUrl) bannerUrl = uploadedUrl;
      }

      // Prepare complete profile data
      const completeProfile: Partial<UserProfile> = {
        ...formData,
        userId: user.$id,
        email: user.email,
        avatarUrl,
        bannerUrl,
        userType: "streamer",
        onboardingCompleted: true,
        joinedAt: new Date().toISOString(),
        lastActive: new Date().toISOString(),
      };

      // Update user preferences
      await account.updatePrefs({
        ...user.prefs,
        onboardingCompleted: true,
        userType: "streamer",
        displayName: formData.displayName,
        avatarUrl,
        bannerUrl,
        streamingPlatform: formData.streamingPlatform,
        twitchUsername: formData.twitchUsername,
        youtubeChannel: formData.youtubeChannel,
        twitterUsername: formData.twitterUsername,
        walletAddress: formData.walletAddress,
      });

      // Create user profile in database
      try {
        const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
        const collectionId =
          process.env.NEXT_PUBLIC_APPWRITE_PROFILES_COLLECTION_ID;

        if (databaseId && collectionId) {
          const profileData = prepareProfileForDatabase(completeProfile);
          await databases.createDocument(
            databaseId,
            collectionId,
            ID.unique(),
            profileData
          );
        }
      } catch (dbError) {
        console.error("Database profile creation failed:", dbError);
        // Continue anyway since user prefs were updated successfully
      }

      // Refresh user data in context
      await refreshUser();

      toast({
        title: "Welcome, Streamer!",
        description:
          "Your profile is ready. Time to create your first token launch!",
      });

      onComplete();
    } catch (error) {
      console.error("Profile setup error:", error);
      toast({
        title: "Setup Failed",
        description:
          "There was an error setting up your profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    {
      title: "Profile Setup",
      description: "Upload your branding & basic info",
    },
    { title: "Streaming Details", description: "Connect your channels" },
    { title: "Additional Info", description: "Complete your profile" },
  ];

  const timezones = [
    { value: "UTC", label: "UTC - Coordinated Universal Time" },
    { value: "America/New_York", label: "EST - Eastern Time" },
    { value: "America/Chicago", label: "CST - Central Time" },
    { value: "America/Denver", label: "MST - Mountain Time" },
    { value: "America/Los_Angeles", label: "PST - Pacific Time" },
    { value: "Europe/London", label: "GMT - Greenwich Mean Time" },
    { value: "Europe/Paris", label: "CET - Central European Time" },
    { value: "Asia/Tokyo", label: "JST - Japan Standard Time" },
    { value: "Asia/Shanghai", label: "CST - China Standard Time" },
    { value: "Australia/Sydney", label: "AEST - Australian Eastern Time" },
  ];

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full space-y-8">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
            <TrendingUp className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white">Streamer Setup</h1>
          <p className="text-gray-400">
            Step {step} of {steps.length}: {steps[step - 1].description}
          </p>

          <div className="w-full bg-gray-700 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / steps.length) * 100}%` }}
            />
          </div>
        </div>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">
              {steps[step - 1].title}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Error Display */}
            {errors.length > 0 && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                <ul className="text-red-400 text-sm space-y-1">
                  {errors.map((error, index) => (
                    <li key={index}>• {error}</li>
                  ))}
                </ul>
              </div>
            )}

            {step === 1 && (
              <>
                {/* Banner Upload */}
                <div className="space-y-2">
                  <Label className="text-white">Channel Banner</Label>
                  <div className="relative">
                    <div className="w-full h-32 bg-gray-700 rounded-lg overflow-hidden border-2 border-dashed border-gray-600">
                      {bannerPreview ? (
                        <img
                          src={bannerPreview}
                          alt="Banner"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="text-center">
                            <Upload className="w-8 h-8 text-gray-500 mx-auto mb-2" />
                            <p className="text-sm text-gray-400">
                              Upload banner
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                    <label className="absolute bottom-2 right-2 w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-pink-600 transition-colors">
                      <Upload className="w-4 h-4 text-white" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e, "banner")}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                {/* Avatar & Display Name */}
                <div className="flex items-end gap-4">
                  <div className="relative">
                    <Avatar className="w-20 h-20">
                      <AvatarImage src={avatarPreview || formData.avatarUrl} />
                      <AvatarFallback className="text-xl bg-gray-600 text-white">
                        {formData.displayName?.slice(0, 2).toUpperCase() ||
                          "ST"}
                      </AvatarFallback>
                    </Avatar>
                    <label className="absolute -bottom-1 -right-1 w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-pink-600 transition-colors">
                      <Upload className="w-3 h-3 text-white" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e, "avatar")}
                        className="hidden"
                      />
                    </label>
                  </div>

                  <div className="flex-1 space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="display_name" className="text-white">
                        Channel Name *
                      </Label>
                      <Input
                        id="display_name"
                        placeholder="Your channel name"
                        value={formData.displayName || ""}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            name: e.target.value,
                            displayName: e.target.value,
                          }))
                        }
                        className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                      />
                    </div>
                  </div>
                </div>

                {/* Bio */}
                <div className="space-y-2">
                  <Label htmlFor="bio" className="text-white">
                    Bio
                  </Label>
                  <Textarea
                    id="bio"
                    placeholder="Tell your audience about yourself and your content..."
                    value={formData.bio || ""}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, bio: e.target.value }))
                    }
                    rows={3}
                    className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                  />
                </div>

                <div className="flex justify-end">
                  <Button
                    onClick={handleNext}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                  >
                    Next
                  </Button>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-white">
                      Primary Streaming Platform *
                    </Label>
                    <Select
                      value={formData.streamingPlatform || ""}
                      onValueChange={(value: string) =>
                        setFormData((prev) => ({
                          ...prev,
                          streamingPlatform: value as
                            | "twitch"
                            | "youtube"
                            | "kick",
                        }))
                      }
                    >
                      <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                        <SelectValue placeholder="Select platform" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="twitch">
                          <div className="flex items-center gap-2">
                            <Twitch className="w-4 h-4 text-purple-500" />
                            Twitch
                          </div>
                        </SelectItem>
                        <SelectItem value="youtube">
                          <div className="flex items-center gap-2">
                            <Youtube className="w-4 h-4 text-red-500" />
                            YouTube
                          </div>
                        </SelectItem>
                        <SelectItem value="kick">
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-green-500 rounded" />
                            Kick
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="twitch_username"
                        className="flex items-center gap-2 text-white"
                      >
                        <Twitch className="w-4 h-4 text-purple-500" />
                        Twitch Username
                      </Label>
                      <Input
                        id="twitch_username"
                        placeholder="your_twitch_handle"
                        value={formData.twitchUsername || ""}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            twitchUsername: e.target.value,
                          }))
                        }
                        className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="youtube_channel"
                        className="flex items-center gap-2 text-white"
                      >
                        <Youtube className="w-4 h-4 text-red-500" />
                        YouTube Channel
                      </Label>
                      <Input
                        id="youtube_channel"
                        placeholder="@yourchannel or channel URL"
                        value={formData.youtubeChannel || ""}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            youtubeChannel: e.target.value,
                          }))
                        }
                        className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="subscriber_count" className="text-white">
                        Subscriber Count
                      </Label>
                      <Input
                        id="subscriber_count"
                        type="number"
                        placeholder="0"
                        value={formData.subscriberCount || ""}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            subscriberCount: parseInt(e.target.value) || 0,
                          }))
                        }
                        className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="avg_viewers" className="text-white">
                        Average Viewers
                      </Label>
                      <Input
                        id="avg_viewers"
                        type="number"
                        placeholder="0"
                        value={formData.avgViewerCount || ""}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            avgViewerCount: parseInt(e.target.value) || 0,
                          }))
                        }
                        className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={() => setStep(1)}
                    className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={handleNext}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                  >
                    Next
                  </Button>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="twitter"
                        className="flex items-center gap-2 text-white"
                      >
                        <Twitter className="w-4 h-4 text-blue-400" />
                        Twitter Username
                      </Label>
                      <Input
                        id="twitter"
                        placeholder="@yourhandle"
                        value={formData.twitterUsername || ""}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            twitterUsername: e.target.value,
                          }))
                        }
                        className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                      />
                      <p className="text-xs text-gray-500">
                        Essential for token launches
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="instagram"
                        className="flex items-center gap-2 text-white"
                      >
                        <Instagram className="w-4 h-4 text-pink-500" />
                        Instagram Username
                      </Label>
                      <Input
                        id="instagram"
                        placeholder="@yourhandle"
                        value={formData.instagramUsername || ""}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            instagramUsername: e.target.value,
                          }))
                        }
                        className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="wallet"
                        className="flex items-center gap-2 text-white"
                      >
                        <Wallet className="w-4 h-4 text-orange-500" />
                        Wallet Address
                      </Label>
                      <Input
                        id="wallet"
                        placeholder="Your Solana wallet address"
                        value={formData.walletAddress || ""}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            walletAddress: e.target.value,
                          }))
                        }
                        className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                      />
                      <p className="text-xs text-gray-500">
                        For pump.fun token launches
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="website"
                        className="flex items-center gap-2 text-white"
                      >
                        <Globe className="w-4 h-4 text-cyan-400" />
                        Website
                      </Label>
                      <Input
                        id="website"
                        placeholder="https://yourwebsite.com"
                        value={formData.website || ""}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            website: e.target.value,
                          }))
                        }
                        className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="location"
                        className="flex items-center gap-2 text-white"
                      >
                        <MapPin className="w-4 h-4 text-green-400" />
                        Location
                      </Label>
                      <Input
                        id="location"
                        placeholder="City, Country"
                        value={formData.location || ""}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            location: e.target.value,
                          }))
                        }
                        className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="flex items-center gap-2 text-white">
                        <Clock className="w-4 h-4 text-blue-400" />
                        Timezone
                      </Label>
                      <Select
                        value={formData.timezone || ""}
                        onValueChange={(value) =>
                          setFormData((prev) => ({ ...prev, timezone: value }))
                        }
                      >
                        <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                          <SelectValue placeholder="Select timezone" />
                        </SelectTrigger>
                        <SelectContent>
                          {timezones.map((tz) => (
                            <SelectItem key={tz.value} value={tz.value}>
                              {tz.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="languages"
                      className="flex items-center gap-2 text-white"
                    >
                      <Languages className="w-4 h-4 text-purple-400" />
                      Languages Spoken
                    </Label>
                    <Input
                      id="languages"
                      placeholder="English, Spanish, Japanese (comma separated)"
                      value={formData.languages || ""}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          languages: e.target.value,
                        }))
                      }
                      className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                    />
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={() => setStep(2)}
                    className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={handleComplete}
                    disabled={loading}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                  >
                    {loading ? (
                      "Setting up..."
                    ) : (
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4" />
                        Complete Setup
                      </div>
                    )}
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
