"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar, Gamepad2, Upload, Users, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Textarea } from "../ui/textarea";

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
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    game: "",
    platform: "twitch",
    scheduled_date: "",
    max_participants: 50,
  });

  const [thumbnailPreview, setThumbnailPreview] = useState<string>("");

  if (!isOpen) return null;

  const handleThumbnailUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setThumbnailPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setLoading(false);
    onSuccess?.();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl bg-gray-800 border-gray-700 shadow-2xl">
        <CardHeader className="flex flex-row items-center justify-between pb-4">
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
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title" className="text-white">
                Event Title *
              </Label>
              <Input
                id="title"
                placeholder="e.g., $MOON Token Launch Stream"
                value={formData.title}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, title: e.target.value }))
                }
                className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                required
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description" className="text-white">
                Description
              </Label>
              <Textarea
                id="description"
                placeholder="Describe your token launch event..."
                value={formData.description}
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

            {/* Game & Platform */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="game" className="text-white">
                  Game
                </Label>
                <div className="relative">
                  <Gamepad2 className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="game"
                    placeholder="e.g., Just Chatting"
                    value={formData.game}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, game: e.target.value }))
                    }
                    className="pl-10 bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-white">Platform</Label>
                <select
                  value={formData.platform}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      platform: e.target.value,
                    }))
                  }
                  className="w-full h-9 px-3 py-1 bg-gray-700 border border-gray-600 rounded-md text-sm text-white"
                >
                  <option value="twitch">Twitch</option>
                  <option value="youtube">YouTube</option>
                  <option value="kick">Kick</option>
                </select>
              </div>
            </div>

            {/* Date & Participants */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="scheduled_date" className="text-white">
                  Scheduled Date & Time *
                </Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="scheduled_date"
                    type="datetime-local"
                    value={formData.scheduled_date}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        scheduled_date: e.target.value,
                      }))
                    }
                    className="pl-10 bg-gray-700 border-gray-600 text-white"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="max_participants" className="text-white">
                  Max Participants
                </Label>
                <div className="relative">
                  <Users className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="max_participants"
                    type="number"
                    min="1"
                    max="1000"
                    value={formData.max_participants}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        max_participants: parseInt(e.target.value) || 50,
                      }))
                    }
                    className="pl-10 bg-gray-700 border-gray-600 text-white"
                  />
                </div>
              </div>
            </div>

            {/* Thumbnail Upload */}
            <div className="space-y-2">
              <Label className="text-white">Event Thumbnail</Label>
              {thumbnailPreview ? (
                <div className="relative">
                  <Image
                    src={thumbnailPreview}
                    alt="Thumbnail preview"
                    height={48}
                    width={200}
                    className="w-full h-48 object-cover rounded-lg border border-gray-600"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => setThumbnailPreview("")}
                    className="absolute top-2 right-2"
                  >
                    Remove
                  </Button>
                </div>
              ) : (
                <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center hover:border-pink-500/50 transition-colors">
                  <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <p className="text-sm text-gray-400 mb-2">
                    Upload a thumbnail for your event
                  </p>
                  <p className="text-xs text-gray-500 mb-4">
                    PNG, JPG up to 5MB
                  </p>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleThumbnailUpload}
                    className="hidden"
                    id="thumbnail-upload"
                  />
                  <Label
                    htmlFor="thumbnail-upload"
                    className="cursor-pointer bg-pink-500 text-white hover:bg-pink-600 px-4 py-2 rounded-md text-sm font-medium inline-block"
                  >
                    Choose File
                  </Label>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={
                  loading || !formData.title || !formData.scheduled_date
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
