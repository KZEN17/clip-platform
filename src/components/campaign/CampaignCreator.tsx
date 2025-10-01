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
    const trimmedInput = socialMediaInput.trim();
    if (!trimmedInput) {
      toast({
        title: "Empty Link",
        description: "Please enter a social media link",
        variant: "destructive",
      });
      return;
    }

    // Check if it's a valid URL
    try {
      // Add https:// if no protocol is specified
      const urlToTest = trimmedInput.startsWith("http")
        ? trimmedInput
        : `https://${trimmedInput}`;
      new URL(urlToTest);

      const currentLinks = formData.socialMediaLinks || [];
      if (!currentLinks.includes(urlToTest)) {
        setFormData((prev) => ({
          ...prev,
          socialMediaLinks: [...currentLinks, urlToTest],
        }));
        setSocialMediaInput("");
        toast({
          title: "Link Added",
          description: "Social media link has been added successfully",
        });
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
        description:
          "Please enter a valid URL (e.g., https://twitter.com/yourhandle)",
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

  // PROPER FIX for src/components/campaign/CampaignCreator.tsx
  // The issue is the validation checking happens on every render, causing re-renders
  // We need to ONLY validate on submit, not continuously

  // REPLACE the entire validation section with this:

  const validateForm = () => {
    const errors: string[] = [];

    // Required text fields
    if (!formData.campaignTitle?.trim()) {
      errors.push("Campaign title is required");
    }

    // Image validation - check if file OR existing URL exists
    const hasImage = !!(imageFile || imagePreview || formData.campaignImage);
    if (!hasImage) {
      errors.push("Campaign image is required");
    }

    // Prize pool validation
    if (!formData.prizePool || formData.prizePool <= 0) {
      errors.push("Prize pool must be greater than 0");
    }

    // Payout validation
    if (!formData.payoutPer1kViews || formData.payoutPer1kViews <= 0) {
      errors.push("Payout per 1K views must be greater than 0");
    }

    // End date validation
    if (!formData.campaignEndDate?.trim()) {
      errors.push("Campaign end date is required");
    } else {
      const date = new Date(formData.campaignEndDate);
      if (isNaN(date.getTime())) {
        errors.push("Invalid end date format");
      } else if (date < new Date()) {
        errors.push("End date must be in the future");
      }
    }

    // Google Drive link validation
    if (!formData.googleDriveLink?.trim()) {
      errors.push("Google Drive link is required");
    } else {
      try {
        const url = new URL(formData.googleDriveLink);
        if (
          !url.hostname.includes("drive.google.com") &&
          !url.hostname.includes("docs.google.com")
        ) {
          errors.push("Google Drive link must be a valid Google Drive URL");
        }
      } catch {
        errors.push("Google Drive link is not a valid URL");
      }
    }

    // Social media links validation
    if (!formData.socialMediaLinks || formData.socialMediaLinks.length === 0) {
      errors.push("At least one social media link is required");
    }

    return errors;
  };

  // UPDATE the isFormValid function to be simpler:
  const isFormValid = () => {
    // Only check core required fields
    return !!(
      formData.campaignTitle?.trim() &&
      formData.prizePool! > 0 &&
      formData.payoutPer1kViews! > 0 &&
      formData.campaignEndDate?.trim()
    );
  };

  // UPDATE handleSubmit to remove image requirement temporarily:
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setErrors([]);

    try {
      let imageUrl = formData.campaignImage;

      // Upload image if provided (now optional)
      if (imageFile) {
        const uploadedUrl = await uploadImage();
        if (uploadedUrl) {
          imageUrl = uploadedUrl;
        }
      }

      // Prepare campaign data
      const campaignData: Partial<RewardsCampaign> = {
        ...formData,
        campaignImage: imageUrl || "", // Allow empty string
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
        socialMediaLinks: formData.socialMediaLinks || [], // Allow empty array
        googleDriveLink: formData.googleDriveLink || "", // Allow empty
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
      <Card className="w-full max-w-4xl bg-black border-gray-800 shadow-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-gray-700">
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-teal-300 via-emerald-400 to-cyan-300 bg-clip-text text-transparent">
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
                  <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center hover:border-teal-500/50 transition-colors">
                    <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <p className="text-sm text-gray-400 mb-2">
                      Upload campaign banner
                    </p>
                    <p className="text-xs text-gray-500 mb-4">
                      PNG, JPG up to 5MB (Recommended: 1200x630px)
                    </p>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <Label
                      htmlFor="image-upload"
                      className="cursor-pointer bg-teal-500 text-white hover:bg-teal-600 px-4 py-2 rounded-md text-sm font-medium inline-block"
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
                    <Trophy className="w-4 h-4 text-teal-400" />
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
                    <DollarSign className="w-4 h-4 text-emerald-400" />
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
                  <Calendar className="w-4 h-4 text-cyan-400" />
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
                  <Globe className="w-4 h-4 text-teal-400" />
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
                  Link to Google Drive folder with campaign assets
                </p>
              </div>

              {/* Social Media Links */}
              <div className="space-y-4">
                <Label className="text-white flex items-center gap-2">
                  <Link className="w-4 h-4 text-emerald-400" />
                  Social Media Links * (At least one required)
                </Label>

                {/* Input to add new social media link */}
                <div className="flex gap-2">
                  <Input
                    placeholder="Add social media or website link (https://...)"
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
                    disabled={!socialMediaInput.trim()}
                    className="bg-emerald-500 hover:bg-emerald-600 text-white disabled:opacity-50"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>

                {/* Display added social media links */}
                {formData.socialMediaLinks &&
                  formData.socialMediaLinks.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-sm text-gray-400">
                        Added links ({formData.socialMediaLinks.length}):
                      </p>
                      {formData.socialMediaLinks.map((link, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between bg-gray-700 p-3 rounded-md border border-gray-600"
                        >
                          <div className="flex items-center gap-2 flex-1">
                            <Globe className="w-4 h-4 text-teal-400 flex-shrink-0" />
                            <span className="text-white text-sm truncate">
                              {link}
                            </span>
                          </div>
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            onClick={() => removeSocialMediaLink(index)}
                            className="ml-2 flex-shrink-0"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}

                {/* Show current status */}
                <div className="text-xs text-gray-500">
                  {formData.socialMediaLinks &&
                  formData.socialMediaLinks.length > 0 ? (
                    <span className="text-emerald-400">
                      ✓ {formData.socialMediaLinks.length} social media link(s)
                      added
                    </span>
                  ) : (
                    <span className="text-red-400">
                      ⚠ At least one social media link is required
                    </span>
                  )}
                </div>

                <p className="text-xs text-gray-500">
                  Add relevant social media profiles, websites, or other links.
                  Examples: Twitter, Instagram, TikTok, YouTube, Discord, etc.
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
                      ? "bg-emerald-500 hover:bg-emerald-600"
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
                disabled={loading || !isFormValid()}
                className="flex-1 bg-gradient-to-r from-teal-400 to-emerald-400 hover:from-teal-300 hover:to-emerald-300 text-black"
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
