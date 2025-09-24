// src/components/onboarding/AgencyOnboarding.tsx
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
  stringToArray,
  UserProfile,
  validateProfileByType,
} from "@/lib/profileSchema";
import { ID } from "appwrite";
import {
  Briefcase,
  Building2,
  Check,
  Globe,
  Languages,
  Mail,
  MapPin,
  Phone,
  Target,
  Upload,
  Users,
} from "lucide-react";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface AgencyOnboardingProps {
  onComplete: () => void;
}

export const AgencyOnboarding = ({ onComplete }: AgencyOnboardingProps) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const { user, refreshUser } = useAuth();
  const { toast } = useToast();

  const [formData, setFormData] = useState(() => {
    if (user) {
      return {
        ...createEmptyProfile(user.$id, user.email, "agency"),
        name: user.name || "",
        displayName: user.name || "",
      } as Partial<UserProfile>;
    }
    return {
      name: "",
      displayName: "",
      agencyName: "",
      contactEmail: "",
      contactPhone: "",
      bio: "",
      location: "",
      website: "",
      teamSize: 1,
      specializations: "",
      languages: "",
    } as unknown as Partial<UserProfile>;
  });

  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>("");
  const [errors, setErrors] = useState<string[]>([]);

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      // Generate a valid file ID (max 36 chars, alphanumeric + . - _)
      const timestamp = Date.now().toString();
      const userIdShort = user.$id.slice(-8); // Last 8 chars of user ID
      const fileId = `logo_${userIdShort}_${timestamp}`;

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
        const errors = [];
        if (!formData.agencyName?.trim())
          errors.push("Agency name is required");
        if (!formData.displayName?.trim()) errors.push("Your name is required");
        return errors;
      case 2:
        return formData.contactEmail?.trim()
          ? []
          : ["Contact email is required"];
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
        if (uploadedUrl) avatarUrl = uploadedUrl;
      }

      // Ensure arrays are properly formatted
      const specializationsArray = Array.isArray(formData.specializations)
        ? formData.specializations
        : stringToArray(formData.specializations as unknown as string);

      const languagesArray = Array.isArray(formData.languages)
        ? formData.languages
        : stringToArray(formData.languages as unknown as string);

      const completeProfile: Partial<UserProfile> = {
        ...formData,
        userId: user.$id,
        email: user.email,
        avatarUrl,
        specializations: specializationsArray,
        languages: languagesArray,
        userType: "agency",
        onboardingCompleted: true,
        joinedAt: new Date().toISOString(),
        lastActive: new Date().toISOString(),
      };

      await account.updatePrefs({
        ...user.prefs,
        onboardingCompleted: true,
        userType: "agency",
        displayName: formData.displayName,
        agencyName: formData.agencyName,
        avatarUrl,
        bio: formData.bio,
        contactEmail: formData.contactEmail,
        contactPhone: formData.contactPhone,
        teamSize: formData.teamSize,
        website: formData.website,
        languages: languagesArray.join(", "), // Store as string in prefs
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
          "Your agency profile is ready. Start recruiting and managing creators!",
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
    { title: "Agency Details", description: "Basic agency information" },
    { title: "Contact & Services", description: "How clients can reach you" },
    { title: "Team & Specialization", description: "Your expertise areas" },
  ];

  const specializationOptions = [
    "Content Creation",
    "Social Media Management",
    "Influencer Marketing",
    "Brand Partnerships",
    "Video Editing",
    "Live Streaming",
    "Community Management",
    "Analytics & Reporting",
    "Campaign Management",
    "Talent Management",
  ];

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full space-y-8">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center">
            <Building2 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white">Agency Setup</h1>
          <p className="text-gray-400">
            Step {step} of {steps.length}: {steps[step - 1].description}
          </p>

          <div className="w-full bg-gray-700 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-cyan-400 to-purple-500 h-2 rounded-full transition-all duration-300"
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
                {/* Logo Upload */}
                <div className="text-center space-y-4">
                  <div className="relative inline-block">
                    <Avatar className="w-24 h-24">
                      <AvatarImage src={avatarPreview || formData.avatarUrl} />
                      <AvatarFallback className="text-2xl bg-gray-600 text-white">
                        {formData.agencyName?.slice(0, 2).toUpperCase() || "AG"}
                      </AvatarFallback>
                    </Avatar>
                    <label className="absolute -bottom-2 -right-2 w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-cyan-600 transition-colors">
                      <Upload className="w-4 h-4 text-white" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                  <p className="text-sm text-gray-400">Upload agency logo</p>
                </div>

                {/* Agency Name */}
                <div className="space-y-2">
                  <Label htmlFor="agency_name" className="text-white">
                    Agency Name *
                  </Label>
                  <Input
                    id="agency_name"
                    placeholder="Your agency name"
                    value={formData.agencyName || ""}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        agencyName: e.target.value,
                      }))
                    }
                    className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                  />
                </div>

                {/* Display Name */}
                <div className="space-y-2">
                  <Label htmlFor="display_name" className="text-white">
                    Your Name *
                  </Label>
                  <Input
                    id="display_name"
                    placeholder="Your full name"
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

                {/* Bio */}
                <div className="space-y-2">
                  <Label htmlFor="bio" className="text-white">
                    Agency Description
                  </Label>
                  <Textarea
                    id="bio"
                    placeholder="Tell us about your agency, services, and expertise..."
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
                    className="bg-gradient-to-r from-cyan-400 to-purple-500 hover:from-cyan-500 hover:to-purple-600 text-white"
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
                    <Label
                      htmlFor="contact_email"
                      className="flex items-center gap-2 text-white"
                    >
                      <Mail className="w-4 h-4" />
                      Contact Email *
                    </Label>
                    <Input
                      id="contact_email"
                      type="email"
                      placeholder="agency@example.com"
                      value={formData.contactEmail || ""}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          contactEmail: e.target.value,
                        }))
                      }
                      className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="contact_phone"
                        className="flex items-center gap-2 text-white"
                      >
                        <Phone className="w-4 h-4" />
                        Phone Number
                      </Label>
                      <Input
                        id="contact_phone"
                        placeholder="+1 (555) 123-4567"
                        value={formData.contactPhone || ""}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            contactPhone: e.target.value,
                          }))
                        }
                        className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="website"
                        className="flex items-center gap-2 text-white"
                      >
                        <Globe className="w-4 h-4" />
                        Website
                      </Label>
                      <Input
                        id="website"
                        placeholder="https://youragency.com"
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
                    className="bg-gradient-to-r from-cyan-400 to-purple-500 hover:from-cyan-500 hover:to-purple-600 text-white"
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
                        htmlFor="team_size"
                        className="flex items-center gap-2 text-white"
                      >
                        <Users className="w-4 h-4" />
                        Team Size
                      </Label>
                      <Select
                        value={formData.teamSize?.toString() || "1"}
                        onValueChange={(value) =>
                          setFormData((prev) => ({
                            ...prev,
                            teamSize: parseInt(value),
                          }))
                        }
                      >
                        <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                          <SelectValue placeholder="Select team size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 (Solo)</SelectItem>
                          <SelectItem value="2">2-5 people</SelectItem>
                          <SelectItem value="6">6-10 people</SelectItem>
                          <SelectItem value="11">11-25 people</SelectItem>
                          <SelectItem value="26">26-50 people</SelectItem>
                          <SelectItem value="51">50+ people</SelectItem>
                        </SelectContent>
                      </Select>
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
                        placeholder="English, Spanish, Japanese"
                        value={
                          Array.isArray(formData.languages)
                            ? formData.languages.join(", ")
                            : formData.languages || ""
                        }
                        onChange={(e) => {
                          const languagesArray = stringToArray(e.target.value);
                          setFormData((prev) => ({
                            ...prev,
                            languages: languagesArray,
                          }));
                        }}
                        className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                      />
                      <p className="text-xs text-gray-500">
                        Separate multiple languages with commas
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="flex items-center gap-2 text-white">
                      <Target className="w-4 h-4" />
                      Specializations
                    </Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {specializationOptions.map((spec) => {
                        const currentSpecs = Array.isArray(
                          formData.specializations
                        )
                          ? formData.specializations
                          : stringToArray(
                              formData.specializations as unknown as string
                            );
                        const isSelected = currentSpecs.includes(spec);
                        return (
                          <Button
                            key={spec}
                            type="button"
                            variant={isSelected ? "default" : "outline"}
                            size="sm"
                            className={`text-xs ${
                              isSelected
                                ? "bg-cyan-500 text-white hover:bg-cyan-600"
                                : "border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
                            }`}
                            onClick={() => {
                              const currentSpecs = Array.isArray(
                                formData.specializations
                              )
                                ? formData.specializations
                                : stringToArray(
                                    formData.specializations as unknown as string
                                  );

                              let newSpecs: string[];
                              if (isSelected) {
                                newSpecs = currentSpecs.filter(
                                  (s) => s !== spec
                                );
                              } else {
                                newSpecs = [...currentSpecs, spec];
                              }

                              setFormData((prev) => ({
                                ...prev,
                                specializations: newSpecs,
                              }));
                            }}
                          >
                            {spec}
                          </Button>
                        );
                      })}
                    </div>
                    <p className="text-xs text-gray-500">
                      Select all that apply to your agency
                    </p>
                  </div>

                  {/* Info Card */}
                  <Card className="bg-gradient-to-r from-cyan-400/5 to-purple-500/5 border-cyan-400/20">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <Briefcase className="w-6 h-6 text-cyan-400" />
                        <div>
                          <h4 className="font-semibold text-white">
                            Ready to Scale
                          </h4>
                          <p className="text-sm text-gray-400">
                            After setup, you&apos;ll be able to recruit
                            clippers, manage streamers, and run large-scale
                            campaigns across the CLIP ecosystem.
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
                    className="bg-gradient-to-r from-cyan-400 to-purple-500 hover:from-cyan-500 hover:to-purple-600 text-white"
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
