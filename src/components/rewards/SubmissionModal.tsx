"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  campaignTitle: string;
  campaignId?: string;
}

export const SubmissionModal = ({
  isOpen,
  onClose,
  campaignTitle,
}: SubmissionModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">
            Submit to {campaignTitle}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-400">
            Submission functionality will be implemented soon! Join our Discord
            to submit clips manually for now.
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                window.open("https://discord.gg/clip", "_blank");
                onClose();
              }}
              className="flex-1 bg-pink-500 hover:bg-pink-600 text-white"
            >
              Join Discord
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
