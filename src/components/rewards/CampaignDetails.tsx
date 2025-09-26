"use client";

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

interface CampaignDetailProps {
  campaign: RewardsCampaign;
  onBack: () => void;
  onJoin: (campaignId: string) => void;
}

export const CampaignDetail = ({
  campaign,
  onBack,
  onJoin,
}: CampaignDetailProps) => {
  return (
    <div className="space-y-6">
      <Button
        onClick={onBack}
        variant="outline"
        className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
      >
        ← Back to Campaigns
      </Button>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-2xl text-white">
            {campaign.campaignTitle}
          </CardTitle>
          <CardDescription className="text-gray-400">
            {campaign.description}
          </CardDescription>
          {campaign.campaignImage && (
            <div className="w-full h-48 bg-gray-700 rounded-lg overflow-hidden mt-4">
              <Image
                src={campaign.campaignImage}
                alt={campaign.campaignTitle}
                width={800}
                height={192}
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-pink-500">
                ${campaign.prizePool}
              </div>
              <div className="text-sm text-gray-400">Total Prize Pool</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400">
                {campaign.currentParticipants}
              </div>
              <div className="text-sm text-gray-400">Participants</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-400">
                ${campaign.payoutPer1kViews}
              </div>
              <div className="text-sm text-gray-400">Per 1K Views</div>
            </div>
          </div>

          {campaign.campaignConditions && (
            <div className="space-y-2">
              <h3 className="font-semibold text-white">Campaign Conditions</h3>
              <p className="text-gray-400 whitespace-pre-wrap">
                {campaign.campaignConditions}
              </p>
            </div>
          )}

          {campaign.socialMediaLinks &&
            campaign.socialMediaLinks.length > 0 && (
              <div className="space-y-2">
                <h3 className="font-semibold text-white">Social Media</h3>
                <div className="flex flex-wrap gap-2">
                  {campaign.socialMediaLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-400 hover:text-cyan-300 underline text-sm"
                    >
                      {new URL(link).hostname}
                    </a>
                  ))}
                </div>
              </div>
            )}

          {campaign.status === "active" && (
            <div className="text-center">
              <Button
                size="lg"
                onClick={() => onJoin(campaign.$id)}
                className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3"
              >
                Join This Campaign
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
