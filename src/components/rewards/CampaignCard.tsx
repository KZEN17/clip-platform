"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RewardsCampaign } from "@/lib/launchSchema";
import Image from "next/image";

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
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-green-500 text-white hover:bg-green-600">
            Active
          </Badge>
        );
      case "draft":
        return (
          <Badge className="bg-gray-500 text-white hover:bg-gray-600">
            Draft
          </Badge>
        );
      case "paused":
        return (
          <Badge className="bg-yellow-500 text-white hover:bg-yellow-600">
            Paused
          </Badge>
        );
      case "completed":
        return (
          <Badge className="bg-purple-500 text-white hover:bg-purple-600">
            Completed
          </Badge>
        );
      case "cancelled":
        return (
          <Badge className="bg-red-500 text-white hover:bg-red-600">
            Cancelled
          </Badge>
        );
      default:
        return <Badge className="bg-gray-500 text-white">{status}</Badge>;
    }
  };

  const isActive = campaign.status === "active";
  const endDate = new Date(campaign.campaignEndDate);
  const timeLeft = endDate.getTime() - new Date().getTime();
  const daysLeft = Math.ceil(timeLeft / (1000 * 60 * 60 * 24));

  return (
    <Card className="bg-gray-800 border-gray-700 hover:border-gray-600 transition-all duration-300">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <CardTitle className="text-lg text-white">
              {campaign.campaignTitle}
            </CardTitle>
            <CardDescription className="text-sm text-gray-400">
              {campaign.description}
            </CardDescription>
          </div>
          {getStatusBadge(campaign.status)}
        </div>
        {campaign.campaignImage && (
          <div className="w-full h-32 bg-gray-700 rounded-lg overflow-hidden">
            <Image
              src={campaign.campaignImage}
              alt={campaign.campaignTitle}
              width={400}
              height={128}
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-pink-500">
              ${campaign.prizePool}
            </div>
            <div className="text-xs text-gray-400">Prize Pool</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-400">
              {campaign.currentParticipants}
            </div>
            <div className="text-xs text-gray-400">Participants</div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Payout Rate</span>
            <span className="text-white font-semibold">
              ${campaign.payoutPer1kViews}/1K views
            </span>
          </div>
          {isActive && daysLeft > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Time Left</span>
              <span className="text-cyan-400 font-semibold">
                {daysLeft} day{daysLeft !== 1 ? "s" : ""}
              </span>
            </div>
          )}
        </div>

        <div className="flex gap-2 flex-wrap">
          {campaign.tags?.map((tag: string) => (
            <Badge
              key={tag}
              className="bg-gray-700 text-gray-300 text-xs border-gray-600"
            >
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onView(campaign.$id)}
            className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
          >
            View Details
          </Button>
          {isActive && (
            <Button
              size="sm"
              onClick={() => onJoin(campaign.$id)}
              className="flex-1 bg-pink-500 hover:bg-pink-600 text-white"
            >
              Join Campaign
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
