"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RewardsCampaign } from "@/lib/launchSchema";
import { Eye, Heart, Music, Share2, TrendingUp } from "lucide-react";

// Social media icon components
const YoutubeIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const TwitterIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

interface CampaignCardProps {
  campaign: RewardsCampaign;
  onJoin: (campaignId: string) => void;
  onView: (campaignId: string) => void;
}

export const CampaignCard = ({
  campaign,
  onJoin,
  onView,
}: CampaignCardProps) => {
  const isActive = campaign.status === "active";
  const progressPercentage =
    campaign.prizePool > 0
      ? (campaign.totalPaidOut / campaign.prizePool) * 100
      : 0;

  return (
    <Card className="bg-gray-900 border-gray-800 hover:border-gray-700 transition-all duration-300">
      <CardContent className="p-6">
        {/* Header Row */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-lg">
                {campaign.campaignTitle.slice(0, 1).toUpperCase()}
              </span>
            </div>

            {/* Title and Creator */}
            <div className="flex-1 min-w-0">
              <h3 className="text-white font-semibold truncate">
                {campaign.campaignTitle}
              </h3>
              <p className="text-gray-400 text-sm">
                {campaign.campaignTitle} (Earn ${campaign.payoutPer1kViews} per
                1,000 Views)
              </p>
            </div>
          </div>

          {/* Prize Pool Badge */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-400 hover:text-white"
            >
              <Share2 className="w-4 h-4" />
            </Button>
            <Badge className="bg-blue-500 text-white px-3 py-1">
              ${campaign.payoutPer1kViews} / 1000
            </Badge>
          </div>
        </div>

        {/* Progress Section */}
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-400">
              ${campaign.totalPaidOut} of ${campaign.prizePool} paid out
            </span>
            <span className="text-white font-medium">
              {Math.round(progressPercentage)}%
            </span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>

        {/* Meta Information Row */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4 text-sm">
            <span className="text-gray-400">Type: Clipping</span>

            {/* Social Icons */}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="w-6 h-6 p-0 text-gray-400 hover:text-white"
              >
                <Heart className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="w-6 h-6 p-0 text-gray-400 hover:text-white"
              >
                <Music className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="w-6 h-6 p-0 bg-red-500/20 text-red-500 hover:bg-red-500/30 rounded"
              >
                <YoutubeIcon className="w-3 h-3" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="w-6 h-6 p-0 bg-blue-500/20 text-blue-500 hover:bg-blue-500/30 rounded"
              >
                <TwitterIcon className="w-3 h-3" />
              </Button>
            </div>
          </div>

          {/* Views Count */}
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <span>Views: {campaign.totalViews.toLocaleString()}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => onView(campaign.$id)}
            className="flex-1 border-gray-700 bg-gray-800 text-pink-400 hover:bg-gray-700 hover:text-pink-300"
          >
            <Eye className="w-4 h-4 mr-2" />
            View
          </Button>
          {isActive && (
            <Button
              onClick={() => onJoin(campaign.$id)}
              className="flex-1 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white"
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              Join
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
