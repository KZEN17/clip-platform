// Create new file: src/components/shared/ShareCard.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LaunchEvent, RewardsCampaign } from "@/lib/launchSchema";
import { Download, Share2, Twitter } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

interface ShareCardProps {
  type: "launch" | "campaign" | "raid";
  data: LaunchEvent | RewardsCampaign;
}

export const ShareCard = ({ type, data }: ShareCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    // In production, you'd use html2canvas or similar to capture the card
    alert("Download functionality coming soon!");
  };

  const handleTwitterShare = () => {
    let text = "";
    const url = window.location.href;

    if (type === "launch") {
      const launch = data as LaunchEvent;
      text = `🚀 ${launch.launchTitle} by ${launch.streamerName}\n\n${
        launch.tokenSymbol ? `$${launch.tokenSymbol}` : ""
      } launching soon!\n\nJoin the stream: `;
    } else if (type === "campaign") {
      const campaign = data as RewardsCampaign;
      text = `💰 ${campaign.campaignTitle}\n\n$${campaign.prizePool} Prize Pool\n$${campaign.payoutPer1kViews}/1K views\n\nJoin now: `;
    }

    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      text
    )}&url=${encodeURIComponent(url)}`;
    window.open(twitterUrl, "_blank", "width=600,height=400");
  };

  const renderLaunchCard = (launch: LaunchEvent) => (
    <Card
      ref={cardRef}
      className="w-full max-w-2xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-teal-400/30 overflow-hidden"
    >
      <div className="relative h-64 bg-gradient-to-r from-teal-400 via-emerald-400 to-cyan-400">
        {launch.tokenLogo && (
          <Image
            src={launch.tokenLogo}
            alt={launch.launchTitle}
            fill
            className="object-cover opacity-20"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

        <div className="absolute bottom-4 left-4 right-4">
          <h2 className="text-3xl font-bold text-white mb-2">
            {launch.launchTitle}
          </h2>
          <p className="text-lg text-gray-200">by {launch.streamerName}</p>
        </div>

        {launch.tokenSymbol && (
          <div className="absolute top-4 right-4 bg-teal-400 px-4 py-2 rounded-full">
            <span className="text-black font-bold text-xl">
              ${launch.tokenSymbol}
            </span>
          </div>
        )}
      </div>

      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm">Launch Date</p>
            <p className="text-white font-semibold">
              {new Date(launch.scheduledDate).toLocaleDateString()} at{" "}
              {new Date(launch.scheduledDate).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
          {launch.expectedViews && (
            <div className="text-right">
              <p className="text-gray-400 text-sm">Expected</p>
              <p className="text-teal-400 font-bold">
                {launch.expectedViews.toLocaleString()} viewers
              </p>
            </div>
          )}
        </div>

        <div className="border-t border-gray-700 pt-4">
          <p className="text-gray-400 text-sm text-center">
            Join us on CLIP - From Twitch to Rich
          </p>
        </div>
      </div>
    </Card>
  );

  const renderCampaignCard = (campaign: RewardsCampaign) => (
    <Card
      ref={cardRef}
      className="w-full max-w-2xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-pink-400/30 overflow-hidden"
    >
      <div className="relative h-64">
        {campaign.campaignImage && (
          <Image
            src={campaign.campaignImage}
            alt={campaign.campaignTitle}
            fill
            className="object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center gap-2 mb-2">
            <Badge className="bg-pink-500 text-white">Campaign</Badge>
          </div>
          <h2 className="text-3xl font-bold text-white">
            {campaign.campaignTitle}
          </h2>
        </div>
      </div>

      <div className="p-6 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-pink-500/10 rounded-lg border border-pink-500/30">
            <p className="text-gray-400 text-sm mb-1">Prize Pool</p>
            <p className="text-pink-400 font-bold text-2xl">
              ${campaign.prizePool}
            </p>
          </div>
          <div className="text-center p-4 bg-purple-500/10 rounded-lg border border-purple-500/30">
            <p className="text-gray-400 text-sm mb-1">Per 1K Views</p>
            <p className="text-purple-400 font-bold text-2xl">
              ${campaign.payoutPer1kViews}
            </p>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-4">
          <p className="text-gray-400 text-sm text-center">
            Join the campaign on CLIP and start earning
          </p>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="space-y-4">
      {type === "launch" && renderLaunchCard(data as LaunchEvent)}
      {type === "campaign" && renderCampaignCard(data as RewardsCampaign)}

      <div className="flex gap-2 justify-center">
        <Button
          onClick={handleTwitterShare}
          className="bg-blue-500 hover:bg-blue-600 text-white"
        >
          <Twitter className="w-4 h-4 mr-2" />
          Share on Twitter
        </Button>
        <Button
          onClick={handleDownload}
          variant="outline"
          className="border-gray-600 text-gray-300"
        >
          <Download className="w-4 h-4 mr-2" />
          Download Card
        </Button>
        <Button variant="outline" className="border-gray-600 text-gray-300">
          <Share2 className="w-4 h-4 mr-2" />
          More Options
        </Button>
      </div>
    </div>
  );
};

// Helper Badge component if not imported
const Badge = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <span
    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${className}`}
  >
    {children}
  </span>
);
