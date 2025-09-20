// src/components/onboarding/StreamerOnboarding.tsx
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/useToast";
import { account, databases, storage } from "@/lib/appwrite";
import { ID } from "appwrite";
import {
  Check,
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
  const { user } = useAuth();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    display_name: "",
    avatar_url: "",
    banner_url: "",
    streaming_platform: "",
    twitch_username: "",
    youtube_channel: "",
    twitter_username: "",
    wallet_address: "",
  });

  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>("");
  const [bannerPreview, setBannerPreview] = useState<string>("");

  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "avatar" | "banner"
  ) => {
    const file = e.target.files?.[0];
    if (file) {
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
      const bucketId = process.env.NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_ID!;

      const response = await storage.createFile(bucketId, fileId, file);
      const fileUrl = storage.getFileView(bucketId, response.$id);

      return fileUrl.toString();
    } catch (error) {
      console.error(`${prefix} upload error:`, error);
      return null;
    }
  };

  const handleComplete = async () => {
    if (!user) return;

    setLoading(true);
    try {
      let avatarUrl = formData.avatar_url;
      let bannerUrl = formData.banner_url;

      if (avatarFile) {
        const uploadedUrl = await uploadFile(avatarFile, "avatar");
        if (uploadedUrl) avatarUrl = uploadedUrl;
      }

      if (bannerFile) {
        const uploadedUrl = await uploadFile(bannerFile, "banner");
        if (uploadedUrl) bannerUrl = uploadedUrl;
      }

      // Update user preferences
      await account.updatePrefs({
        ...user.prefs,
        onboardingCompleted: true,
        userType: "streamer",
        displayName: formData.display_name,
        avatarUrl: avatarUrl,
        bannerUrl: bannerUrl,
        streamingPlatform: formData.streaming_platform,
        twitchUsername: formData.twitch_username,
        youtubeChannel: formData.youtube_channel,
        twitterUsername: formData.twitter_username,
        walletAddress: formData.wallet_address,
      });

      // Create user profile in database
      const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
      const collectionId =
        process.env.NEXT_PUBLIC_APPWRITE_PROFILES_COLLECTION_ID!;

      await databases.createDocument(databaseId, collectionId, ID.unique(), {
        userId: user.$id,
        email: user.email,
        name: formData.display_name,
        displayName: formData.display_name,
        avatarUrl: avatarUrl,
        bannerUrl: bannerUrl,
        streamingPlatform: formData.streaming_platform,
        twitchUsername: formData.twitch_username,
        youtubeChannel: formData.youtube_channel,
        twitterUsername: formData.twitter_username,
        walletAddress: formData.wallet_address,
        userType: "streamer",
        onboardingCompleted: true,
        createdAt: new Date().toISOString(),
      });

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
    { title: "Profile Setup", description: "Upload your branding" },
    { title: "Streaming Details", description: "Connect your channels" },
    { title: "Social & Wallet", description: "Complete your setup" },
  ];

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-2xl w-full space-y-8">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-secondary to-accent flex items-center justify-center">
            <TrendingUp className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold">Streamer Setup</h1>
          <p className="text-muted-foreground">
            Step {step} of {steps.length}: {steps[step - 1].description}
          </p>

          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-gradient-to-r from-secondary to-accent h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / steps.length) * 100}%` }}
            />
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{steps[step - 1].title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {step === 1 && (
              <>
                {/* Banner Upload */}
                <div className="space-y-2">
                  <Label>Channel Banner</Label>
                  <div className="relative">
                    <div className="w-full h-32 bg-muted rounded-lg overflow-hidden border-2 border-dashed border-muted-foreground/20">
                      {bannerPreview ? (
                        <img
                          src={bannerPreview}
                          alt="Banner"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Upload className="w-8 h-8 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                    <label className="absolute bottom-2 right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center cursor-pointer">
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
                      <AvatarImage src={avatarPreview || formData.avatar_url} />
                      <AvatarFallback className="text-xl">
                        {formData.display_name.slice(0, 2).toUpperCase() ||
                          "ST"}
                      </AvatarFallback>
                    </Avatar>
                    <label className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center cursor-pointer">
                      <Upload className="w-3 h-3 text-white" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e, "avatar")}
                        className="hidden"
                      />
                    </label>
                  </div>

                  <div className="flex-1 space-y-2">
                    <Label htmlFor="display_name">Channel Name *</Label>
                    <Input
                      id="display_name"
                      placeholder="Your channel name"
                      value={formData.display_name}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          display_name: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button
                    onClick={() => setStep(2)}
                    disabled={!formData.display_name.trim()}
                    className="bg-gradient-to-r from-secondary to-accent"
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
                    <Label>Primary Streaming Platform *</Label>
                    <Select
                      value={formData.streaming_platform}
                      onValueChange={(value: string) =>
                        setFormData((prev) => ({
                          ...prev,
                          streaming_platform: value,
                        }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select platform" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="twitch">Twitch</SelectItem>
                        <SelectItem value="youtube">YouTube</SelectItem>
                        <SelectItem value="kick">Kick</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="twitch_username"
                      className="flex items-center gap-2"
                    >
                      <Twitch className="w-4 h-4 text-purple-500" />
                      Twitch Username
                    </Label>
                    <Input
                      id="twitch_username"
                      placeholder="your_twitch_handle"
                      value={formData.twitch_username}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          twitch_username: e.target.value,
                        }))
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="youtube_channel"
                      className="flex items-center gap-2"
                    >
                      <Youtube className="w-4 h-4 text-red-500" />
                      YouTube Channel
                    </Label>
                    <Input
                      id="youtube_channel"
                      placeholder="@yourchannel or channel URL"
                      value={formData.youtube_channel}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          youtube_channel: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setStep(1)}>
                    Back
                  </Button>
                  <Button
                    onClick={() => setStep(3)}
                    disabled={!formData.streaming_platform}
                    className="bg-gradient-to-r from-secondary to-accent"
                  >
                    Next
                  </Button>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="twitter"
                      className="flex items-center gap-2"
                    >
                      <Twitter className="w-4 h-4 text-blue-500" />
                      Twitter Username
                    </Label>
                    <Input
                      id="twitter"
                      placeholder="@yourhandle"
                      value={formData.twitter_username}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          twitter_username: e.target.value,
                        }))
                      }
                    />
                    <p className="text-xs text-muted-foreground">
                      Key for token launches
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="wallet" className="flex items-center gap-2">
                      <Wallet className="w-4 h-4 text-orange-500" />
                      Wallet Address (Optional)
                    </Label>
                    <Input
                      id="wallet"
                      placeholder="Your Solana wallet address"
                      value={formData.wallet_address}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          wallet_address: e.target.value,
                        }))
                      }
                    />
                    <p className="text-xs text-muted-foreground">
                      For token launches on pump.fun
                    </p>
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setStep(2)}>
                    Back
                  </Button>
                  <Button
                    onClick={handleComplete}
                    disabled={loading}
                    className="bg-gradient-to-r from-secondary to-accent"
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
