// src/components/onboarding/ClipperOnboarding.tsx
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
  Briefcase,
  Check,
  Instagram,
  Languages,
  MapPin,
  Scissors,
  Target,
  TrendingUp,
  Twitter,
  Upload,
  Video,
} from "lucide-react";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface ClipperOnboardingProps {
  onComplete: () => void;
}

export const ClipperOnboarding = ({ onComplete }: ClipperOnboardingProps) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const { user, refreshUser } = useAuth();
  const { toast } = useToast();

  const [formData, setFormData] = useState(() => {
    if (user) {
      return {
        ...createEmptyProfile(user.$id, user.email, "clipper"),
        name: user.name || "",
        displayName: user.name || "",
      } as Partial<UserProfile>;
    }
    return {
      name: "",
      displayName: "",
      bio: "",
      location: "",
      twitterUsername: "",
      instagramUsername: "",
      portfolioUrl: "",
      preferredGenres: "",
      editingSoftware: "",
      averageClipsPerWeek: 0,
      languages: "",
    } as Partial<UserProfile>;
  });

  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>("");
  const [errors, setErrors] = useState<string[]>([]);

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select a file smaller than 5MB",
          variant: "destructive",
        });
        return;
      }

      setAvatarFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadAvatar = async (): Promise<string | null> => {
    if (!avatarFile || !user) return null;

    try {
      const fileId = `clipper_avatar_${user.$id}_${Date.now()}`;
      const bucketId = process.env.NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_ID;

      if (!bucketId) {
        console.warn("Storage bucket ID not configured");
        return null;
      }

      const response = await storage.createFile(bucketId, fileId, avatarFile);
      const fileUrl = storage.getFileView(bucketId, response.$id);
      return fileUrl.toString();
    } catch (error) {
      console.error("Avatar upload error:", error);
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
        return formData.displayName?.trim() ? [] : ["Display name is required"];
      default:
        return [];
    }
  };

  const handleComplete = async () => {
    if (!user) return;

    const validationErrors = validateProfileByType(formData);
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      let avatarUrl = formData.avatarUrl;

      if (avatarFile) {
        const uploadedUrl = await uploadAvatar();
        if (uploadedUrl) {
          avatarUrl = uploadedUrl;
        }
      }

      const genresArray = formData.preferredGenres
        ? formData.preferredGenres
            .split(",")
            .map((g) => g.trim())
            .filter((g) => g)
        : [];

      const completeProfile: Partial<UserProfile> = {
        ...formData,
        userId: user.$id,
        email: user.email,
        avatarUrl,
        userType: "clipper",
        onboardingCompleted: true,
        joinedAt: new Date().toISOString(),
        lastActive: new Date().toISOString(),
        preferredGenres: JSON.stringify(genresArray),
      };

      await account.updatePrefs({
        ...user.prefs,
        onboardingCompleted: true,
        userType: "clipper",
        displayName: formData.displayName,
        avatarUrl,
        twitterUsername: formData.twitterUsername,
        bio: formData.bio,
        portfolioUrl: formData.portfolioUrl,
        editingSoftware: formData.editingSoftware,
      });

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
      }

      await refreshUser();

      toast({
        title: "Welcome to CLIP!",
        description:
          "Your clipper profile is ready. Start earning from viral clips!",
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
    { title: "Basic Info", description: "Tell us about yourself" },
    { title: "Skills & Experience", description: "Your editing expertise" },
    { title: "Social & Portfolio", description: "Showcase your work" },
  ];

  const contentGenres = [
    "Gaming",
    "Just Chatting",
    "IRL",
    "Music",
    "Art",
    "Sports",
    "Cooking",
    "Technology",
    "Educational",
    "Comedy",
    "Reaction",
    "ASMR",
    "Fitness",
    "Travel",
    "News",
    "Politics",
  ];

  const editingSoftwareOptions = [
    "Adobe Premiere Pro",
    "Final Cut Pro",
    "DaVinci Resolve",
    "Adobe After Effects",
    "Sony Vegas Pro",
    "Avid Media Composer",
    "Filmora",
    "Camtasia",
    "OBS Studio",
    "Other",
  ];

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full space-y-8">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center">
            <Video className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white">Clipper Setup</h1>
          <p className="text-gray-400">
            Step {step} of {steps.length}: {steps[step - 1].description}
          </p>

          <div className="w-full bg-gray-700 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-pink-500 to-purple-500 h-2 rounded-full transition-all duration-300"
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
                <div className="text-center space-y-4">
                  <div className="relative inline-block">
                    <Avatar className="w-24 h-24">
                      <AvatarImage src={avatarPreview || formData.avatarUrl} />
                      <AvatarFallback className="text-2xl bg-gray-600 text-white">
                        {formData.displayName?.slice(0, 2).toUpperCase() ||
                          "CL"}
                      </AvatarFallback>
                    </Avatar>
                    <label className="absolute -bottom-2 -right-2 w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-pink-600 transition-colors">
                      <Upload className="w-4 h-4 text-white" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                  <p className="text-sm text-gray-400">Upload your avatar</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="display_name" className="text-white">
                    Display Name *
                  </Label>
                  <Input
                    id="display_name"
                    placeholder="Your display name"
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

                <div className="space-y-2">
                  <Label htmlFor="bio" className="text-white">
                    Bio
                  </Label>
                  <Textarea
                    id="bio"
                    placeholder="Tell us about yourself and what kind of content you love creating..."
                    value={formData.bio || ""}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, bio: e.target.value }))
                    }
                    rows={3}
                    className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="location"
                      className="flex items-center gap-2 text-white"
                    >
                      <MapPin className="w-4 h-4" />
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
                    <Label
                      htmlFor="languages"
                      className="flex items-center gap-2 text-white"
                    >
                      <Languages className="w-4 h-4" />
                      Languages
                    </Label>
                    <Input
                      id="languages"
                      placeholder="English, Spanish, etc."
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

                <div className="flex justify-end">
                  <Button
                    onClick={handleNext}
                    className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white"
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
                    <Label className="flex items-center gap-2 text-white">
                      <Scissors className="w-4 h-4" />
                      Primary Editing Software
                    </Label>
                    <Select
                      value={formData.editingSoftware || ""}
                      onValueChange={(value) =>
                        setFormData((prev) => ({
                          ...prev,
                          editingSoftware: value,
                        }))
                      }
                    >
                      <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                        <SelectValue placeholder="Select your main editing tool" />
                      </SelectTrigger>
                      <SelectContent>
                        {editingSoftwareOptions.map((software) => (
                          <SelectItem key={software} value={software}>
                            {software}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="flex items-center gap-2 text-white">
                      <Target className="w-4 h-4" />
                      Preferred Content Types
                    </Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {contentGenres.map((genre) => {
                        const currentGenres =
                          formData.preferredGenres
                            ?.split(",")
                            .map((g) => g.trim()) || [];
                        const isSelected = currentGenres.includes(genre);

                        return (
                          <Button
                            key={genre}
                            type="button"
                            variant={isSelected ? "default" : "outline"}
                            size="sm"
                            className={`text-xs ${
                              isSelected
                                ? "bg-pink-500 text-white hover:bg-pink-600"
                                : "border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
                            }`}
                            onClick={() => {
                              const currentGenres =
                                formData.preferredGenres
                                  ?.split(",")
                                  .map((g) => g.trim())
                                  .filter((g) => g) || [];
                              let newGenres;

                              if (isSelected) {
                                newGenres = currentGenres.filter(
                                  (g) => g !== genre
                                );
                              } else {
                                newGenres = [...currentGenres, genre];
                              }

                              setFormData((prev) => ({
                                ...prev,
                                preferredGenres: newGenres.join(", "),
                              }));
                            }}
                          >
                            {genre}
                          </Button>
                        );
                      })}
                    </div>
                    <p className="text-xs text-gray-500">
                      Select content types you enjoy working with
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="clips_per_week"
                      className="flex items-center gap-2 text-white"
                    >
                      <TrendingUp className="w-4 h-4" />
                      Average Clips Per Week
                    </Label>
                    <Select
                      value={formData.averageClipsPerWeek?.toString() || "0"}
                      onValueChange={(value) =>
                        setFormData((prev) => ({
                          ...prev,
                          averageClipsPerWeek: parseInt(value),
                        }))
                      }
                    >
                      <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                        <SelectValue placeholder="How many clips do you typically create?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">Just getting started</SelectItem>
                        <SelectItem value="5">1-5 clips</SelectItem>
                        <SelectItem value="10">6-10 clips</SelectItem>
                        <SelectItem value="20">11-20 clips</SelectItem>
                        <SelectItem value="35">21-35 clips</SelectItem>
                        <SelectItem value="50">35+ clips</SelectItem>
                      </SelectContent>
                    </Select>
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
                    className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white"
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
                        <Twitter className="w-4 h-4" />
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
                        Connect your Twitter to showcase clips
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="instagram"
                        className="flex items-center gap-2 text-white"
                      >
                        <Instagram className="w-4 h-4" />
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

                  <div className="space-y-2">
                    <Label
                      htmlFor="portfolio"
                      className="flex items-center gap-2 text-white"
                    >
                      <Briefcase className="w-4 h-4" />
                      Portfolio URL
                    </Label>
                    <Input
                      id="portfolio"
                      placeholder="https://yourportfolio.com or YouTube channel"
                      value={formData.portfolioUrl || ""}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          portfolioUrl: e.target.value,
                        }))
                      }
                      className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                    />
                    <p className="text-xs text-gray-500">
                      Show off your best work to potential clients
                    </p>
                  </div>

                  <Card className="bg-gradient-to-r from-pink-500/5 to-purple-500/5 border-pink-500/20">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <Video className="w-6 h-6 text-pink-500" />
                        <div>
                          <h4 className="font-semibold text-white">
                            Ready to Clip
                          </h4>
                          <p className="text-sm text-gray-400">
                            You&apos;re all set! Start browsing available
                            clipping opportunities and earn rewards for creating
                            viral content.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
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
                    className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white"
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
