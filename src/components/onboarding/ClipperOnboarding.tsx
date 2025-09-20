import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/useToast";
import { account, databases, storage } from "@/lib/appwrite";
import { ID } from "appwrite";
import { Check, Twitter, Upload, Video } from "lucide-react";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface ClipperOnboardingProps {
  onComplete: () => void;
}

export const ClipperOnboarding = ({ onComplete }: ClipperOnboardingProps) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    display_name: "",
    avatar_url: "",
    twitter_username: "",
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
      const fileId = ID.unique();
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
        if (uploadedUrl) {
          avatarUrl = uploadedUrl;
        }
      }

      // Update user preferences to mark onboarding as complete
      await account.updatePrefs({
        ...user.prefs,
        onboardingCompleted: true,
        userType: "clipper",
        displayName: formData.display_name,
        avatarUrl: avatarUrl,
        twitterUsername: formData.twitter_username,
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
        twitterUsername: formData.twitter_username,
        userType: "clipper",
        onboardingCompleted: true,
        createdAt: new Date().toISOString(),
      });

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
    {
      title: "Basic Info",
      description: "Tell us a bit about yourself",
    },
    {
      title: "Social Links",
      description: "Connect your social accounts (optional)",
    },
  ];

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-2xl w-full space-y-8">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <Video className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold">Clipper Setup</h1>
          <p className="text-muted-foreground">
            Step {step} of {steps.length}: {steps[step - 1].description}
          </p>

          {/* Progress Bar */}
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-300"
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
                {/* Avatar Upload */}
                <div className="text-center space-y-4">
                  <div className="relative inline-block">
                    <Avatar className="w-24 h-24">
                      <AvatarImage src={avatarPreview || formData.avatar_url} />
                      <AvatarFallback className="text-2xl">
                        {formData.display_name.slice(0, 2).toUpperCase() ||
                          "CL"}
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
                    Upload your avatar
                  </p>
                </div>

                {/* Display Name */}
                <div className="space-y-2">
                  <Label htmlFor="display_name">Display Name *</Label>
                  <Input
                    id="display_name"
                    placeholder="Your display name"
                    value={formData.display_name}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        display_name: e.target.value,
                      }))
                    }
                  />
                </div>

                <div className="flex justify-end">
                  <Button
                    onClick={() => setStep(2)}
                    disabled={!formData.display_name.trim()}
                    className="bg-gradient-to-r from-primary to-secondary"
                  >
                    Next
                  </Button>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                {/* Social Links */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="twitter"
                      className="flex items-center gap-2"
                    >
                      <Twitter className="w-4 h-4" />
                      Twitter Username (Optional)
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
                      Connect your Twitter to showcase your clips
                    </p>
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setStep(1)}>
                    Back
                  </Button>
                  <Button
                    onClick={handleComplete}
                    disabled={loading}
                    className="bg-gradient-to-r from-primary to-secondary"
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
