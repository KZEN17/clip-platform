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
import { ID } from "appwrite";
import { Building2, Check, Mail, Phone, Upload, Users } from "lucide-react";
import { useState } from "react";

interface AgencyOnboardingProps {
  onComplete: () => void;
}

export const AgencyOnboarding = ({ onComplete }: AgencyOnboardingProps) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    agency_name: "",
    display_name: "",
    avatar_url: "",
    bio: "",
    contact_email: "",
    contact_phone: "",
    managed_streamers: [] as string[],
  });

  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>("");

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
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
      const fileId = `agency_logo_${user.$id}_${Date.now()}`;
      const bucketId = process.env.NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_ID!;

      const response = await storage.createFile(bucketId, fileId, avatarFile);
      const fileUrl = storage.getFileView(bucketId, response.$id);

      return fileUrl.toString();
    } catch (error) {
      console.error("Avatar upload error:", error);
      return null;
    }
  };

  const handleComplete = async () => {
    if (!user) return;

    setLoading(true);
    try {
      let avatarUrl = formData.avatar_url;

      if (avatarFile) {
        const uploadedUrl = await uploadAvatar();
        if (uploadedUrl) avatarUrl = uploadedUrl;
      }

      const teamContactInfo = {
        email: formData.contact_email,
        phone: formData.contact_phone,
      };

      // Update user preferences
      await account.updatePrefs({
        ...user.prefs,
        onboardingCompleted: true,
        userType: "agency",
        displayName: formData.display_name,
        agencyName: formData.agency_name,
        avatarUrl: avatarUrl,
        bio: formData.bio,
        teamContactInfo: teamContactInfo,
        managedStreamers: formData.managed_streamers,
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
        agencyName: formData.agency_name,
        avatarUrl: avatarUrl,
        bio: formData.bio,
        contactEmail: formData.contact_email,
        contactPhone: formData.contact_phone,
        managedStreamers: formData.managed_streamers,
        userType: "agency",
        onboardingCompleted: true,
        createdAt: new Date().toISOString(),
      });

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
    { title: "Contact Info", description: "Team contact details" },
  ];

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-2xl w-full space-y-8">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-accent to-primary flex items-center justify-center">
            <Building2 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold">Agency Setup</h1>
          <p className="text-muted-foreground">
            Step {step} of {steps.length}: {steps[step - 1].description}
          </p>

          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-gradient-to-r from-accent to-primary h-2 rounded-full transition-all duration-300"
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
                {/* Logo Upload */}
                <div className="text-center space-y-4">
                  <div className="relative inline-block">
                    <Avatar className="w-24 h-24">
                      <AvatarImage src={avatarPreview || formData.avatar_url} />
                      <AvatarFallback className="text-2xl">
                        {formData.agency_name.slice(0, 2).toUpperCase() || "AG"}
                      </AvatarFallback>
                    </Avatar>
                    <label className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center cursor-pointer hover:bg-primary/80 transition-colors">
                      <Upload className="w-4 h-4 text-white" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Upload agency logo
                  </p>
                </div>

                {/* Agency Name */}
                <div className="space-y-2">
                  <Label htmlFor="agency_name">Agency Name *</Label>
                  <Input
                    id="agency_name"
                    placeholder="Your agency name"
                    value={formData.agency_name}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        agency_name: e.target.value,
                      }))
                    }
                  />
                </div>

                {/* Display Name */}
                <div className="space-y-2">
                  <Label htmlFor="display_name">Your Name *</Label>
                  <Input
                    id="display_name"
                    placeholder="Your full name"
                    value={formData.display_name}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        display_name: e.target.value,
                      }))
                    }
                  />
                </div>

                {/* Bio */}
                <div className="space-y-2">
                  <Label htmlFor="bio">Agency Description</Label>
                  <Textarea
                    id="bio"
                    placeholder="Tell us about your agency, services, and expertise..."
                    value={formData.bio}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, bio: e.target.value }))
                    }
                    rows={3}
                  />
                </div>

                <div className="flex justify-end">
                  <Button
                    onClick={() => setStep(2)}
                    disabled={
                      !formData.agency_name.trim() ||
                      !formData.display_name.trim()
                    }
                    className="bg-gradient-to-r from-accent to-primary"
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
                      className="flex items-center gap-2"
                    >
                      <Mail className="w-4 h-4" />
                      Contact Email *
                    </Label>
                    <Input
                      id="contact_email"
                      type="email"
                      placeholder="agency@example.com"
                      value={formData.contact_email}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          contact_email: e.target.value,
                        }))
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="contact_phone"
                      className="flex items-center gap-2"
                    >
                      <Phone className="w-4 h-4" />
                      Phone Number (Optional)
                    </Label>
                    <Input
                      id="contact_phone"
                      placeholder="+1 (555) 123-4567"
                      value={formData.contact_phone}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          contact_phone: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>

                {/* Info Card */}
                <Card className="bg-gradient-to-r from-accent/5 to-primary/5 border-accent/20">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <Users className="w-6 h-6 text-accent" />
                      <div>
                        <h4 className="font-semibold">Ready to Scale</h4>
                        <p className="text-sm text-muted-foreground">
                          After setup, you&apos;ll be able to recruit clippers,
                          manage streamers, and run large-scale campaigns.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setStep(1)}>
                    Back
                  </Button>
                  <Button
                    onClick={handleComplete}
                    disabled={loading || !formData.contact_email.trim()}
                    className="bg-gradient-to-r from-accent to-primary"
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
