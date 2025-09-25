// src/components/campaign/CampaignCreator.tsx
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
  RewardsCampaign,
  createEmptyRewardsCampaign,
  prepareRewardsCampaignForDatabase,
  validateRewardsCampaign,
} from "@/lib/launchSchema";

import { ID } from "appwrite";
import {
  Calendar,
  DollarSign,
  Globe,
  Link,
  Plus,
  Trash2,
  Trophy,
  Upload,
  Users,
  X,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface CampaignCreatorProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const CampaignCreator = ({
  isOpen,
  onClose,
  onSuccess,
}: CampaignCreatorProps) => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const { user } = useAuth();
  const { toast } = useToast();

  const [formData, setFormData] = useState(() =>
    createEmptyRewardsCampaign(user?.$id)
  );

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [socialMediaInput, setSocialMediaInput] = useState("");

  if (!isOpen) return null;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
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

      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async (): Promise<string | null> => {
    if (!imageFile || !user) return null;

    try {
      const timestamp = Date.now().toString();
      const userIdShort = user.$id.slice(-8);
      const fileId = `campaign_${userIdShort}_${timestamp}`;

      const bucketId = process.env.NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_ID;

      if (!bucketId) {
        console.warn("Storage bucket ID not configured");
        return null;
      }

      const response = await storage.createFile(bucketId, fileId, imageFile);
      const fileUrl = storage.getFileView(bucketId, response.$id);
      return fileUrl.toString();
    } catch (error) {
      console.error("Image upload error:", error);
      return null;
    }
  };

  const addSocialMediaLink = () => {
    if (!socialMediaInput.trim()) return;

    try {
      new URL(socialMediaInput);
      const currentLinks = formData.socialMediaLinks || [];
      if (!currentLinks.includes(socialMediaInput)) {
        setFormData((prev) => ({
          ...prev,
          socialMediaLinks: [...currentLinks, socialMediaInput],
        }));
        setSocialMediaInput("");
      } else {
        toast({
          title: "Duplicate Link",
          description: "This social media link has already been added",
          variant: "destructive",
        });
      }
    } catch {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid URL",
        variant: "destructive",
      });
    }
  };

  const removeSocialMediaLink = (index: number) => {
    const currentLinks = formData.socialMediaLinks || [];
    setFormData((prev) => ({
      ...prev,
      socialMediaLinks: currentLinks.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors([]);

    try {
      // Validate form data
      const validationErrors = validateRewardsCampaign(formData);
      if (validationErrors.length > 0) {
        setErrors(validationErrors);
        setLoading(false);
        return;
      }

      let imageUrl = formData.campaignImage;

      // Upload image if provided
      if (imageFile) {
        const uploadedUrl = await uploadImage();
        if (uploadedUrl) {
          imageUrl = uploadedUrl;
        } else {
          toast({
            title: "Upload Failed",
            description: "Failed to upload campaign image. Please try again.",
            variant: "destructive",
          });
          setLoading(false);
          return;
        }
      }

      // Prepare campaign data
      const campaignData: Partial<RewardsCampaign> = {
        ...formData,
        campaignImage: imageUrl,
        creatorId: user?.$id,
        status: "draft",
        currentParticipants: 0,
        totalSubmissions: 0,
        approvedSubmissions: 0,
        totalPaidOut: 0,
        remainingBudget: formData.prizePool || 0,
        totalViews: 0,
        avgViewsPerClip: 0,
        conversionRate: 0,
      };

      // Save to database
      const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
      const campaignCollectionId =
        process.env.NEXT_PUBLIC_APPWRITE_CAMPAIGNS_COLLECTION_ID;

      if (databaseId && campaignCollectionId) {
        const preparedData = prepareRewardsCampaignForDatabase(campaignData);
        await databases.createDocument(
          databaseId,
          campaignCollectionId,
          ID.unique(),
          preparedData
        );
      }

      toast({
        title: "Campaign Created!",
        description: "Your rewards campaign has been created successfully.",
      });

      onSuccess?.();
      onClose();
    } catch (error) {
      console.error("Campaign creation error:", error);
      toast({
        title: "Creation Failed",
        description:
          "There was an error creating your campaign. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl bg-gray-800 border-gray-700 shadow-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-gray-700">
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Create New Campaign
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

              {/* Campaign Title */}
              <div className="space-y-2">
                <Label htmlFor="campaignTitle" className="text-white">
                  Campaign Title *
                </Label>
                <Input
                  id="campaignTitle"
                  placeholder="Enter your campaign title"
                  value={formData.campaignTitle || ""}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      campaignTitle: e.target.value,
                    }))
                  }
                  className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                  required
                />
              </div>

              {/* Campaign Image */}
              <div className="space-y-2">
                <Label className="text-white">Campaign Image *</Label>
                {imagePreview ? (
                  <div className="relative w-full max-w-md">
                    <Image
                      src={imagePreview}
                      alt="Campaign image preview"
                      width={400}
                      height={200}
                      className="w-full h-48 object-cover rounded-lg border border-gray-600"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => {
                        setImagePreview("");
                        setImageFile(null);
                        setFormData((prev) => ({ ...prev, campaignImage: "" }));
                      }}
                      className="absolute -top-2 -right-2"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center hover:border-cyan-500/50 transition-colors">
                    <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <p className="text-sm text-gray-400 mb-2">
                      Upload campaign banner
                    </p>
                    <p className="text-xs text-gray-500 mb-4">
                      PNG, JPG up to 5MB (Recommended: 1200x630px, Max: 5MB)
                    </p>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                      required={!imagePreview}
                    />
                    <Label
                      htmlFor="image-upload"
                      className="cursor-pointer bg-cyan-500 text-white hover:bg-cyan-600 px-4 py-2 rounded-md text-sm font-medium inline-block"
                    >
                      Choose File
                    </Label>
                  </div>
                )}
              </div>

              {/* Prize Pool and Payout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="prizePool"
                    className="text-white flex items-center gap-2"
                  >
                    <Trophy className="w-4 h-4 text-yellow-500" />
                    Prize Pool ($) *
                  </Label>
                  <Input
                    id="prizePool"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                    value={formData.prizePool || ""}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        prizePool: parseFloat(e.target.value) || 0,
                      }))
                    }
                    className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="payoutPer1kViews"
                    className="text-white flex items-center gap-2"
                  >
                    <DollarSign className="w-4 h-4 text-green-400" />
                    Payout per 1k Views ($) *
                  </Label>
                  <Input
                    id="payoutPer1kViews"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                    value={formData.payoutPer1kViews || ""}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        payoutPer1kViews: parseFloat(e.target.value) || 0,
                      }))
                    }
                    className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                    required
                  />
                </div>
              </div>

              {/* Campaign End Date */}
              <div className="space-y-2">
                <Label
                  htmlFor="campaignEndDate"
                  className="text-white flex items-center gap-2"
                >
                  <Calendar className="w-4 h-4 text-blue-400" />
                  Campaign End Date *
                </Label>
                <Input
                  id="campaignEndDate"
                  type="datetime-local"
                  value={formData.campaignEndDate || ""}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      campaignEndDate: e.target.value,
                    }))
                  }
                  className="bg-gray-700 border-gray-600 text-white"
                  required
                />
              </div>

              {/* Google Drive Link */}
              <div className="space-y-2">
                <Label
                  htmlFor="googleDriveLink"
                  className="text-white flex items-center gap-2"
                >
                  <Globe className="w-4 h-4 text-blue-500" />
                  Google Drive Link *
                </Label>
                <Input
                  id="googleDriveLink"
                  placeholder="https://drive.google.com/drive/folders/..."
                  value={formData.googleDriveLink || ""}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      googleDriveLink: e.target.value,
                    }))
                  }
                  className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                  required
                />
                <p className="text-xs text-gray-500">
                  Optional: Link to Google Drive folder with campaign assets
                </p>
              </div>

              {/* Social Media Links */}
              <div className="space-y-4">
                <Label className="text-white flex items-center gap-2">
                  <Link className="w-4 h-4 text-purple-400" />
                  Social Media Links *
                </Label>

                <div className="flex gap-2">
                  <Input
                    placeholder="Add social media or website link"
                    value={socialMediaInput}
                    onChange={(e) => setSocialMediaInput(e.target.value)}
                    className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addSocialMediaLink();
                      }
                    }}
                  />
                  <Button
                    type="button"
                    onClick={addSocialMediaLink}
                    className="bg-purple-500 hover:bg-purple-600 text-white"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>

                {formData.socialMediaLinks &&
                  formData.socialMediaLinks.length > 0 && (
                    <div className="space-y-2">
                      {formData.socialMediaLinks.map((link, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between bg-gray-700 p-2 rounded-md"
                        >
                          <span className="text-white text-sm truncate">
                            {link}
                          </span>
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            onClick={() => removeSocialMediaLink(index)}
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                <p className="text-xs text-gray-500">
                  Add relevant social media profiles, websites, or other links
                </p>
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
                  placeholder="Describe your campaign goals, target audience, and content requirements..."
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

              {/* Campaign Conditions */}
              <div className="space-y-2">
                <Label htmlFor="campaignConditions" className="text-white">
                  Campaign Conditions
                </Label>
                <Textarea
                  id="campaignConditions"
                  placeholder="List all requirements and conditions for this campaign..."
                  value={formData.campaignConditions || ""}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      campaignConditions: e.target.value,
                    }))
                  }
                  rows={4}
                  className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                />
              </div>

              {/* Advanced Settings */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="maxPayoutPerClip" className="text-white">
                    Max Payout per Clip ($)
                  </Label>
                  <Input
                    id="maxPayoutPerClip"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="100.00"
                    value={formData.maxPayoutPerClip || ""}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        maxPayoutPerClip: parseFloat(e.target.value) || 0,
                      }))
                    }
                    className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="minViews" className="text-white">
                    Minimum Views Required
                  </Label>
                  <Input
                    id="minViews"
                    type="number"
                    min="0"
                    placeholder="1000"
                    value={formData.minViews || ""}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        minViews: parseInt(e.target.value) || 0,
                      }))
                    }
                    className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="maxParticipants"
                    className="text-white flex items-center gap-2"
                  >
                    <Users className="w-4 h-4" />
                    Max Participants
                  </Label>
                  <Input
                    id="maxParticipants"
                    type="number"
                    min="1"
                    placeholder="500"
                    value={formData.maxParticipants || ""}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        maxParticipants: parseInt(e.target.value) || 0,
                      }))
                    }
                    className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category" className="text-white">
                    Category
                  </Label>
                  <Select
                    value={formData.category || ""}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, category: value }))
                    }
                  >
                    <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gaming">Gaming</SelectItem>
                      <SelectItem value="lifestyle">Lifestyle</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="entertainment">
                        Entertainment
                      </SelectItem>
                      <SelectItem value="music">Music</SelectItem>
                      <SelectItem value="art">Art & Creative</SelectItem>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="fitness">Fitness & Health</SelectItem>
                      <SelectItem value="food">Food & Cooking</SelectItem>
                      <SelectItem value="travel">Travel</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Auto-approve Toggle */}
              <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                <div className="space-y-1">
                  <Label className="text-white font-medium">
                    Auto-approve Submissions
                  </Label>
                  <p className="text-sm text-gray-400">
                    Automatically approve all submissions without manual review.
                    Recommended for trusted creators only.
                  </p>
                </div>
                <Button
                  type="button"
                  variant={
                    formData.autoApproveSubmissions ? "default" : "outline"
                  }
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      autoApproveSubmissions: !prev.autoApproveSubmissions,
                      requiresApproval: !prev.autoApproveSubmissions
                        ? false
                        : prev.requiresApproval,
                    }))
                  }
                  className={
                    formData.autoApproveSubmissions
                      ? "bg-green-500 hover:bg-green-600"
                      : "border-gray-600 text-gray-300"
                  }
                >
                  {formData.autoApproveSubmissions ? "ON" : "OFF"}
                </Button>
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
                disabled={false}
                className="flex-1 bg-gradient-to-r from-cyan-400 to-purple-500 hover:from-cyan-500 hover:to-purple-600 text-white"
              >
                {loading ? "Creating..." : "Create Campaign"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
