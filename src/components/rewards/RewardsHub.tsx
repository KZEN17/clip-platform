"use client";

import { Card, CardContent } from "@/components/ui/card";
import { RewardsCampaign } from "@/lib/launchSchema";
import { Trophy } from "lucide-react";

interface RewardsHubProps {
  campaigns: RewardsCampaign[];
}

export const RewardsHub = ({ campaigns }: RewardsHubProps) => {
  const totalRewards = campaigns.reduce((sum, c) => sum + c.prizePool, 0);
  const totalParticipants = campaigns.reduce(
    (sum, c) => sum + c.currentParticipants,
    0
  );

  return (
    <Card className="bg-gradient-to-r from-teal-400/10 via-emerald-400/10 to-cyan-400/10 border-teal-400/30">
      <CardContent className="p-8">
        <div className="text-center space-y-6">
          <div className="flex items-center justify-center space-x-2">
            <Trophy className="w-8 h-8 text-teal-400" />
            <h2 className="text-3xl font-bold text-white">CLIP Rewards Hub</h2>
          </div>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            Earn rewards for creating viral clips. Join campaigns, compete with
            other clippers, and get paid for your best content. The more viral
            your clips, the more you earn.
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center space-y-2">
              <div className="text-2xl font-bold text-teal-400">
                ${totalRewards.toLocaleString()}
              </div>
              <div className="text-sm text-gray-400">Total Rewards Pool</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-2xl font-bold text-emerald-400">
                {totalParticipants}+
              </div>
              <div className="text-sm text-gray-400">Active Creators</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-2xl font-bold text-cyan-400">
                {campaigns.length}
              </div>
              <div className="text-sm text-gray-400">Total Campaigns</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
