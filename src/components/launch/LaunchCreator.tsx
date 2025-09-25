// src/components/launch/LaunchCreator.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/useToast";
import { databases, storage } from "@/lib/appwrite";
import {
  createEmptyLaunchEvent,
  LaunchEvent,
  prepareLaunchEventForDatabase,
  validateLaunchEvent,
} from "@/lib/launchSchema";
import { ID } from "appwrite";
import {
  Calendar,
  Clock,
  Gamepad2,
  Instagram,
  Target,
  Twitch,
  Upload,
  Users,
  X,
  Youtube,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface LaunchCreatorProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const LaunchCreator = ({
  isOpen,
  onClose,
  onSuccess,
}: LaunchCreatorProps) => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const { user } = useAuth();
  const { toast } = useToast();

  const [formData, setFormData] = useState(() =>
    createEmptyLaunchEvent(user?.$id)
  );

  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string>("");

  if (!isOpen) return null;

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
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

      // Validate file type
      if (!file.type.startsWith("image/")) {
        toast({
          title: "Invalid file type",
          description: "Please select an image file",
          variant: "destructive",
        });
        return;
      }

      setLogoFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setLogoPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadLogo = async (): Promise<string | null> => {
    if (!logoFile || !user) return null;

    try {
      const timestamp = Date.now().toString();
      const userIdShort = user.$id.slice(-8);
      const fileId = `token_logo_${userIdShort}_${timestamp}`;

      const bucketId = process.env.NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_ID;

      if (!bucketId) {
        console.warn("Storage bucket ID not configured");
        return null;
      }

      const response = await storage.createFile(bucketId, fileId, logoFile);
      const fileUrl = storage.getFileView(bucketId, response.$id);
      return fileUrl.toString();
    } catch (error) {
      console.error("Logo upload error:", error);
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors([]);

    try {
      // Validate form data
      const validationErrors = validateLaunchEvent(formData);
      if (validationErrors.length > 0) {
        setErrors(validationErrors);
        setLoading(false);
        return;
      }

      let logoUrl = formData.tokenLogo;

      // Upload logo if provided
      if (logoFile) {
        const uploadedUrl = await uploadLogo();
        if (uploadedUrl) {
          logoUrl = uploadedUrl;
        } else {
          toast({
            title: "Upload Failed",
            description: "Failed to upload token logo. Please try again.",
            variant: "destructive",
          });
          setLoading(false);
          return;
        }
      }

      // Prepare launch event data
      const launchEventData: Partial<LaunchEvent> = {
        ...formData,
        tokenLogo: logoUrl,
        userId: user?.$id,
        status: "scheduled",
        currentParticipants: 0,
        totalViews: 0,
        totalClips: 0,
        isVerified: false,
        isFeatured: false,
      };

      // Save to database
      const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
      const launchCollectionId =
        process.env.NEXT_PUBLIC_APPWRITE_LAUNCH_EVENTS_COLLECTION_ID;

      if (databaseId && launchCollectionId) {
        const preparedData = prepareLaunchEventForDatabase(launchEventData);
        await databases.createDocument(
          databaseId,
          launchCollectionId,
          ID.unique(),
          preparedData
        );
      }

      toast({
        title: "Launch Event Created!",
        description: "Your token launch event has been scheduled successfully.",
      });

      onSuccess?.();
      onClose();
    } catch (error) {
      console.error("Launch creation error:", error);
      toast({
        title: "Creation Failed",
        description:
          "There was an error creating your launch event. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const timezones = [
    { value: "UTC", label: "UTC" },
    { value: "America/New_York", label: "EST" },
    { value: "America/Chicago", label: "CST" },
    { value: "America/Denver", label: "MST" },
    { value: "America/Los_Angeles", label: "PST" },
    { value: "Europe/London", label: "GMT" },
    { value: "Europe/Paris", label: "CET" },
    { value: "Asia/Tokyo", label: "JST" },
  ];

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-3xl bg-gray-800 border-gray-700 shadow-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-gray-700">
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
            Create Launch Event
          </CardTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            <X className="h-5 w-5" />
          </Button>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6 py-6">
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

            {/* Required Fields Section */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-white border-b border-gray-600 pb-2">
                Required Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Streamer Name */}
                <div className="space-y-2">
                  <Label htmlFor="streamerName" className="text-white">
                    Streamer Name *
                  </Label>
                  <Input
                    id="streamerName"
                    placeholder="Your streaming name"
                    value={formData.streamerName || ""}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        streamerName: e.target.value,
                      }))
                    }
                    className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                    required
                  />
                </div>

                {/* Launch Title */}
                <div className="space-y-2">
                  <Label htmlFor="launchTitle" className="text-white">
                    Launch Title *
                  </Label>
                  <Input
                    id="launchTitle"
                    placeholder="e.g., $MOON Token Launch Stream"
                    value={formData.launchTitle || ""}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        launchTitle: e.target.value,
                      }))
                    }
                    className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                    required
                  />
                </div>
              </div>

              {/* Token Logo */}
              <div className="space-y-2">
                <Label className="text-white">Token Logo *</Label>
                {logoPreview ? (
                  <div className="relative w-32 h-32">
                    <Image
                      src={logoPreview}
                      alt="Token logo preview"
                      width={128}
                      height={128}
                      className="w-32 h-32 object-cover rounded-lg border border-gray-600"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => {
                        setLogoPreview("");
                        setLogoFile(null);
                        setFormData((prev) => ({ ...prev, tokenLogo: "" }));
                      }}
                      className="absolute -top-2 -right-2"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center hover:border-pink-500/50 transition-colors">
                    <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <p className="text-sm text-gray-400 mb-2">
                      Upload your token logo
                    </p>
                    <p className="text-xs text-gray-500 mb-4">
                      PNG, JPG up to 5MB (Recommended: 200x200px)
                    </p>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="hidden"
                      id="logo-upload"
                      required={!logoPreview}
                    />
                    <Label
                      htmlFor="logo-upload"
                      className="cursor-pointer bg-pink-500 text-white hover:bg-pink-600 px-4 py-2 rounded-md text-sm font-medium inline-block"
                    >
                      Choose File
                    </Label>
                  </div>
                )}
              </div>

              {/* Scheduled Date */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor="scheduledDate" className="text-white">
                    Scheduled Date & Time *
                  </Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="scheduledDate"
                      type="datetime-local"
                      value={formData.scheduledDate || ""}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          scheduledDate: e.target.value,
                        }))
                      }
                      className="pl-10 bg-gray-700 border-gray-600 text-white"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-white">Timezone</Label>
                  <Select
                    value={formData.timezone || "UTC"}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, timezone: value }))
                    }
                  >
                    <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                      <SelectValue />
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
            </div>

            {/* Optional Fields Section */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-white border-b border-gray-600 pb-2">
                Optional Information
              </h3>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description" className="text-white">
                  Description
                </Label>
                <Textarea
                  id="description"
                  placeholder="Describe your token launch event..."
                  value={formData.description || ""}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  rows={3}
                  className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                />
              </div>

              {/* Social Media Links */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="twitchUsername"
                    className="text-white flex items-center gap-2"
                  >
                    <Twitch className="w-4 h-4 text-purple-500" />
                    Twitch Username
                  </Label>
                  <Input
                    id="twitchUsername"
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
                    htmlFor="youtubeChannel"
                    className="text-white flex items-center gap-2"
                  >
                    <Youtube className="w-4 h-4 text-red-500" />
                    YouTube Channel
                  </Label>
                  <Input
                    id="youtubeChannel"
                    placeholder="@yourchannel"
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

                <div className="space-y-2">
                  <Label
                    htmlFor="tiktokUsername"
                    className="text-white flex items-center gap-2"
                  >
                    <Target className="w-4 h-4 text-black bg-white rounded" />
                    TikTok Username
                  </Label>
                  <Input
                    id="tiktokUsername"
                    placeholder="@your_tiktok"
                    value={formData.tiktokUsername || ""}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        tiktokUsername: e.target.value,
                      }))
                    }
                    className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="instagramUsername"
                    className="text-white flex items-center gap-2"
                  >
                    <Instagram className="w-4 h-4 text-pink-500" />
                    Instagram Username
                  </Label>
                  <Input
                    id="instagramUsername"
                    placeholder="@your_instagram"
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

              {/* Additional Settings */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="streamPlatform" className="text-white">
                    Primary Platform
                  </Label>
                  <Select
                    value={formData.streamPlatform || "twitch"}
                    onValueChange={(
                      value: "twitch" | "youtube" | "kick" | "multiple"
                    ) =>
                      setFormData((prev) => ({
                        ...prev,
                        streamPlatform: value,
                      }))
                    }
                  >
                    <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="twitch">Twitch</SelectItem>
                      <SelectItem value="youtube">YouTube</SelectItem>
                      <SelectItem value="kick">Kick</SelectItem>
                      <SelectItem value="multiple">
                        Multiple Platforms
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maxParticipants" className="text-white">
                    Max Participants
                  </Label>
                  <div className="relative">
                    <Users className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="maxParticipants"
                      type="number"
                      min="1"
                      max="10000"
                      value={formData.maxParticipants || 100}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          maxParticipants: parseInt(e.target.value) || 100,
                        }))
                      }
                      className="pl-10 bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="estimatedDuration" className="text-white">
                    Duration (minutes)
                  </Label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="estimatedDuration"
                      type="number"
                      min="30"
                      max="480"
                      value={formData.estimatedDuration || 120}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          estimatedDuration: parseInt(e.target.value) || 120,
                        }))
                      }
                      className="pl-10 bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Game Category and Token Symbol */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="gameCategory"
                    className="text-white flex items-center gap-2"
                  >
                    <Gamepad2 className="w-4 h-4 text-blue-400" />
                    Game Category
                  </Label>
                  <Input
                    id="gameCategory"
                    placeholder="e.g., Just Chatting, Gaming"
                    value={formData.gameCategory || ""}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        gameCategory: e.target.value,
                      }))
                    }
                    className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tokenSymbol" className="text-white">
                    Token Symbol
                  </Label>
                  <Input
                    id="tokenSymbol"
                    placeholder="e.g., MOON, PUMP"
                    value={formData.tokenSymbol || ""}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        tokenSymbol: e.target.value.toUpperCase(),
                      }))
                    }
                    className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                  />
                </div>
              </div>

              {/* Discord Server */}
              <div className="space-y-2">
                <Label htmlFor="discordServer" className="text-white">
                  Discord Server Invite
                </Label>
                <Input
                  id="discordServer"
                  placeholder="https://discord.gg/yourinvite"
                  value={formData.discordServer || ""}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      discordServer: e.target.value,
                    }))
                  }
                  className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                />
              </div>

              {/* Expected Views */}
              <div className="space-y-2">
                <Label htmlFor="expectedViews" className="text-white">
                  Expected Views
                </Label>
                <Input
                  id="expectedViews"
                  type="number"
                  min="0"
                  placeholder="Estimated number of viewers"
                  value={formData.expectedViews || ""}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      expectedViews: parseInt(e.target.value) || 0,
                    }))
                  }
                  className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-6 border-t border-gray-700">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={
                  loading ||
                  !formData.streamerName ||
                  !formData.launchTitle ||
                  (!logoFile && !logoPreview && !formData.tokenLogo) ||
                  !formData.scheduledDate
                }
                className="flex-1 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white"
              >
                {loading ? "Creating..." : "Create Launch Event"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
