"use client";

import { MainLayout } from "@/components/layout/MainLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Clock,
  Crown,
  DollarSign,
  ExternalLink,
  Gift,
  Heart,
  Play,
  PlayCircle,
  Plus,
  Share2,
  Target,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { useState } from "react";

const mockRaids = [
  {
    id: "fake-1",
    title: "MEGA PUMP RAID",
    description: "Coordinated support for the biggest token launch of the year",
    target_url: "https://twitch.tv/cryptoking",
    mission_type: "takeover" as const,
    status: "live",
    current_participants: 234,
    max_participants: 500,
    goal_amount: 5000,
    total_raised: 2450,
    goal_description: "Token launch support",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    leader_id: "fake-leader-1",
    scheduled_time: new Date().toISOString(),
    twitch_stream_url: "https://twitch.tv/cryptoking",
    // USDC Bounty
    usdcBounty: 1000, // $1000 USDC total
    bountyWallet: "7xKXtg2C...H6vJ", // Shortened wallet address
    bountyDistribution: "milestone-based" as const,
    bountyPerAction: 5, // $5 USDC per valid action
    minActionsForBounty: 1,
  },
  {
    id: "fake-2",
    title: "Holiday Support Mission",
    description:
      "Supporting our community streamer during the holiday celebration stream",
    target_url: "https://youtube.com/watch?v=holidaystream",
    mission_type: "support" as const,
    status: "scheduled",
    current_participants: 0,
    max_participants: 200,
    goal_amount: 1500,
    total_raised: 0,
    goal_description: "Holiday gift fund",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    leader_id: "fake-leader-2",
    scheduled_time: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
    twitch_stream_url: "https://youtube.com/watch?v=holidaystream",
    // USDC Bounty
    usdcBounty: 500,
    bountyWallet: "9yMNrf3D...K8pL",
    bountyDistribution: "split-equally" as const,
    minActionsForBounty: 3,
  },
  {
    id: "fake-3",
    title: "New Year Launch Mission",
    description:
      "Coordinated launch support to kick off the new year with massive momentum",
    target_url: "https://twitch.tv/newyeartoken",
    mission_type: "mission" as const,
    status: "scheduled",
    current_participants: 12,
    max_participants: 300,
    goal_amount: 3000,
    total_raised: 150,
    goal_description: "Launch milestone fund",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    leader_id: "fake-leader-3",
    scheduled_time: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    twitch_stream_url: "https://twitch.tv/newyeartoken",
    // USDC Bounty
    usdcBounty: 2000,
    bountyWallet: "3wQRst5F...M9nP",
    bountyDistribution: "winner-take-all" as const,
    minActionsForBounty: 5,
  },
];
// Simple Progress component
const Progress = ({
  value,
  className = "",
  animated = false,
}: {
  value: number;
  className?: string;
  animated?: boolean;
}) => (
  <div className={`w-full bg-gray-700 rounded-full h-2 ${className}`}>
    <div
      className={`h-2 rounded-full bg-gradient-to-r from-teal-400 to-emerald-400 transition-all duration-300 ${
        animated ? "animate-pulse" : ""
      }`}
      style={{ width: `${Math.min(Math.max(value, 0), 100)}%` }}
    />
  </div>
);

// Raid Card Component

type Raid = {
  id: string;
  title: string;
  description: string;
  target_url: string;
  mission_type: "mission" | "takeover" | "support";
  status: string;
  current_participants: number;
  max_participants: number;
  goal_amount: number;
  total_raised: number;
  goal_description: string;
  created_at: string;
  updated_at: string;
  leader_id: string;
  scheduled_time: string;
  twitch_stream_url: string;

  // NEW: USDC Bounty System
  usdcBounty?: number; // Total USDC bounty pool
  bountyWallet?: string; // Wallet address for bounty
  bountyDistribution?: "winner-take-all" | "split-equally" | "milestone-based"; // How bounty is distributed
  bountyPerAction?: number; // USDC per action (donation/sub/token buy)
  minActionsForBounty?: number; // Minimum actions to qualify
};

type RaidCardProps = {
  raid: Raid;
  onJoin: (raidId: string) => void;
};

const RaidCard = ({ raid, onJoin }: RaidCardProps) => {
  const getMissionConfig = (type: string) => {
    switch (type) {
      case "mission":
        return {
          label: "Mission",
          icon: Target,
          color: "text-teal-400",
          bgColor: "bg-teal-400/10",
          badgeClass: "bg-teal-400 text-black",
        };
      case "takeover":
        return {
          label: "Take Over",
          icon: Crown,
          color: "text-cyan-400",
          bgColor: "bg-cyan-400/10",
          badgeClass: "bg-cyan-400 text-black",
        };
      case "support":
        return {
          label: "Support",
          icon: Heart,
          color: "text-emerald-400",
          bgColor: "bg-emerald-400/10",
          badgeClass: "bg-emerald-400 text-black",
        };
      default:
        return {
          label: "Mission",
          icon: Target,
          color: "text-teal-400",
          bgColor: "bg-teal-400/10",
          badgeClass: "bg-teal-400 text-black",
        };
    }
  };

  const config = getMissionConfig(raid.mission_type);
  const Icon = config.icon;
  const isLive = raid.status === "live";
  const progressPercentage =
    raid.goal_amount > 0 ? (raid.total_raised / raid.goal_amount) * 100 : 0;

  const formatTime = (isoString: string) => {
    return new Date(isoString).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      timeZoneName: "short",
    });
  };

  const getTimeUntilStart = (startTime: string) => {
    const now = new Date().getTime();
    const start = new Date(startTime).getTime();
    const diff = start - now;

    if (diff <= 0) return "Live Now";

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  return (
    <Card
      className={`bg-black border-gray-800 hover:border-gray-600 transition-all duration-300 ${
        isLive ? "border-teal-400/50 shadow-lg shadow-teal-400/25" : ""
      }`}
    >
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4 flex-1">
            <div className="flex-shrink-0">
              <div
                className={`w-12 h-12 rounded-lg bg-gradient-to-r from-teal-400 to-emerald-400 flex items-center justify-center border-2 border-teal-400/20`}
              >
                <Icon className="w-6 h-6 text-black" />
              </div>
            </div>

            <div className="space-y-3 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                {isLive && (
                  <Badge className="bg-red-500 text-white animate-pulse">
                    LIVE
                  </Badge>
                )}
                {!isLive && (
                  <Badge className="bg-gray-600 text-white">
                    <Clock className="w-3 h-3 mr-1" />
                    {getTimeUntilStart(raid.scheduled_time)}
                  </Badge>
                )}
                <Badge className={config.badgeClass}>
                  <Icon className="w-3 h-3 mr-1" />
                  {config.label}
                </Badge>
              </div>

              <div>
                <CardTitle className="text-lg mb-1 text-white">
                  {raid.title}
                </CardTitle>
                {raid.description && (
                  <p className="text-sm text-gray-400 line-clamp-2">
                    {raid.description}
                  </p>
                )}
              </div>

              {raid.target_url && (
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <ExternalLink className="w-3 h-3" />
                  <span className="truncate">
                    Target: {new URL(raid.target_url).hostname}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {raid.goal_description && (
          <div className="space-y-2">
            <Progress
              value={progressPercentage}
              className="h-3"
              animated={isLive}
            />
            <div className="flex justify-between text-xs text-gray-400">
              <span>{Math.round(progressPercentage)}% complete</span>
              <span>{raid.goal_description}</span>
            </div>
          </div>
        )}
        {raid.usdcBounty && (
          <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-lg p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">USDC Bounty Pool</span>
              <Badge className="bg-green-500 text-white font-bold">
                ${raid.usdcBounty} USDC
              </Badge>
            </div>

            {raid.bountyPerAction && (
              <div className="text-xs text-gray-400">
                💰 ${raid.bountyPerAction} USDC per qualifying action
              </div>
            )}

            {raid.bountyDistribution && (
              <div className="text-xs text-gray-400">
                📊 Distribution: {raid.bountyDistribution.replace(/-/g, " ")}
              </div>
            )}

            {raid.minActionsForBounty && (
              <div className="text-xs text-gray-400">
                ✅ Min actions to qualify: {raid.minActionsForBounty}
              </div>
            )}

            {raid.bountyWallet && (
              <div className="text-xs text-gray-500 font-mono">
                Wallet: {raid.bountyWallet}
              </div>
            )}
          </div>
        )}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm text-gray-400">
            {raid.scheduled_time && !isLive && (
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{formatTime(raid.scheduled_time)}</span>
              </div>
            )}
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>{raid.current_participants}</span>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="gap-1 border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              <Share2 className="w-3 h-3" />
              Share
            </Button>

            <Button
              size="sm"
              onClick={() => onJoin(raid.id)}
              className="gap-1 bg-teal-400 hover:bg-teal-300 text-black"
            >
              <Play className="w-3 h-3" />
              Join Raid
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

type RaidCreatorProps = {
  isOpen: boolean;
  onClose: () => void;
};

const RaidCreator = ({ isOpen, onClose }: RaidCreatorProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl bg-black border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Create New RAID</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-400">
            RAID creation functionality will be implemented soon!
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
              onClick={onClose}
              className="flex-1 bg-teal-400 hover:bg-teal-300 text-black"
            >
              Create RAID
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default function RaidChatPage() {
  const [showCreator, setShowCreator] = useState(false);

  const liveRaids = mockRaids.filter((raid) => raid.status === "live");
  const scheduledRaids = mockRaids.filter(
    (raid) => raid.status === "scheduled"
  );
  const currentRaid = liveRaids[0];

  const handleJoinRaid = (raidId: string) => {
    const raid = mockRaids.find((r) => r.id === raidId);
    if (raid?.target_url) {
      window.open(raid.target_url, "_blank", "noopener,noreferrer");
    }
  };

  const recentActions = [
    {
      id: 1,
      time: "2 min ago",
      actionType: "donate" as const,
      amount: 25,
      targetChannel: "@cryptoking",
      proofUrl: "https://twitch.tv/cryptoking/clip/abc123",
      user: "@raidmaster",
    },
    {
      id: 2,
      time: "5 min ago",
      actionType: "subs" as const,
      amount: 50,
      targetChannel: "@cryptoking",
      proofUrl: "https://twitch.tv/cryptoking/clip/def456",
      user: "@subsquad",
    },
    {
      id: 3,
      time: "8 min ago",
      actionType: "token" as const,
      amount: 100,
      targetChannel: "@cryptoking",
      proofUrl: "https://pump.fun/tx/ghi789",
      user: "@tokenbuyer",
    },
    {
      id: 4,
      time: "12 min ago",
      actionType: "donate" as const,
      amount: 15,
      targetChannel: "@cryptoking",
      proofUrl: "https://twitch.tv/cryptoking/clip/jkl012",
      user: "@donationking",
    },
    {
      id: 5,
      time: "15 min ago",
      actionType: "subs" as const,
      amount: 25,
      targetChannel: "@cryptoking",
      proofUrl: "https://twitch.tv/cryptoking/clip/mno345",
      user: "@subgifter",
    },
  ];

  const getActionIcon = (actionType: string) => {
    switch (actionType) {
      case "donate":
        return <DollarSign className="w-4 h-4 text-cyan-400" />;
      case "subs":
        return <Gift className="w-4 h-4 text-emerald-400" />;
      case "token":
        return <TrendingUp className="w-4 h-4 text-teal-400" />;
      default:
        return <Zap className="w-4 h-4" />;
    }
  };

  const getActionColor = (actionType: string) => {
    switch (actionType) {
      case "donate":
        return "text-cyan-400";
      case "subs":
        return "text-emerald-400";
      case "token":
        return "text-teal-400";
      default:
        return "text-gray-400";
    }
  };

  return (
    <MainLayout>
      <div className="min-h-screen bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="space-y-8">
            {/* Header */}
            <div className="text-center space-y-4">
              <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-teal-300 via-emerald-400 to-cyan-300 bg-clip-text text-transparent">
                Raid Chat
              </h1>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                We raid, we donate, we buy subs, we buy tokens. Trade attention
                for growth.
              </p>
              <div className="pt-4">
                <Button
                  onClick={() => setShowCreator(true)}
                  size="lg"
                  className="gap-2 text-lg px-8 py-3 bg-gradient-to-r from-teal-400 to-emerald-400 hover:from-teal-300 hover:to-emerald-300 text-black"
                >
                  <Plus className="w-5 h-5" />
                  Create New RAID
                </Button>
              </div>
            </div>

            {/* Explainer */}
            <Card className="bg-gradient-to-r from-teal-400/10 via-emerald-400/10 to-cyan-400/10 border-teal-400/20">
              <CardContent className="p-8">
                <div className="text-center space-y-4">
                  <h2 className="text-2xl font-bold text-white">
                    How RAIDCHAT Works
                  </h2>
                  <p className="text-lg text-gray-400 max-w-3xl mx-auto">
                    Trade attention for growth. We coordinate community raids to
                    support streamers, fund subscriber gifts, and buy tokens
                    during launches. Everyone benefits when we move together.
                  </p>
                  <div className="grid md:grid-cols-3 gap-6 mt-8">
                    <div className="text-center space-y-2">
                      <div className="w-12 h-12 bg-gradient-to-r from-teal-400 to-teal-500 rounded-xl flex items-center justify-center mx-auto">
                        <DollarSign className="w-6 h-6 text-black" />
                      </div>
                      <h3 className="font-semibold text-white">Donations</h3>
                      <p className="text-sm text-gray-400">
                        Pool funds for impactful donations
                      </p>
                    </div>
                    <div className="text-center space-y-2">
                      <div className="w-12 h-12 bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-xl flex items-center justify-center mx-auto">
                        <Gift className="w-6 h-6 text-black" />
                      </div>
                      <h3 className="font-semibold text-white">
                        Subscriber Gifts
                      </h3>
                      <p className="text-sm text-gray-400">
                        Mass gift subs to grow communities
                      </p>
                    </div>
                    <div className="text-center space-y-2">
                      <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-cyan-500 rounded-xl flex items-center justify-center mx-auto">
                        <TrendingUp className="w-6 h-6 text-black" />
                      </div>
                      <h3 className="font-semibold text-white">
                        Token Purchases
                      </h3>
                      <p className="text-sm text-gray-400">
                        Coordinate buys during launches
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Live RAID Section */}
            <section className="space-y-6">
              <div className="text-center">
                <h2 className="text-3xl font-bold flex items-center justify-center space-x-2 mb-2 text-white">
                  <PlayCircle className="w-8 h-8 text-teal-400" />
                  <span>Live RAID Session</span>
                </h2>
                <p className="text-gray-400">
                  Join the active community raid and contribute to the mission
                </p>
              </div>

              {currentRaid ? (
                <RaidCard raid={currentRaid} onJoin={handleJoinRaid} />
              ) : (
                <Card className="border-dashed border-2 border-gray-600 bg-black">
                  <CardContent className="p-12 text-center space-y-6">
                    <div className="text-gray-400">
                      <PlayCircle className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <h3 className="text-xl font-semibold mb-3 text-white">
                        No Active RAIDs
                      </h3>
                      <p className="text-lg">
                        Be the first to create a raid and rally the community!
                      </p>
                    </div>
                    <Button
                      onClick={() => setShowCreator(true)}
                      size="lg"
                      className="gap-2 text-lg px-8 bg-gradient-to-r from-teal-400 to-emerald-400 hover:from-teal-300 hover:to-emerald-300 text-black"
                    >
                      <Plus className="w-5 h-5" />
                      Launch First RAID
                    </Button>
                  </CardContent>
                </Card>
              )}
            </section>

            {/* Upcoming Raids */}
            {scheduledRaids.length > 0 && (
              <section className="space-y-6">
                <div className="text-center">
                  <h2 className="text-3xl font-bold flex items-center justify-center space-x-2 mb-2 text-white">
                    <Clock className="w-8 h-8 text-emerald-400" />
                    <span>Upcoming Raids</span>
                  </h2>
                  <p className="text-gray-400">
                    Scheduled community raids - set reminders and be ready
                  </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-6">
                  {scheduledRaids.map((raid) => (
                    <RaidCard
                      key={raid.id}
                      raid={raid}
                      onJoin={handleJoinRaid}
                    />
                  ))}
                </div>

                <div className="text-center pt-4">
                  <Button
                    onClick={() => setShowCreator(true)}
                    variant="outline"
                    className="gap-2 border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    <Plus className="w-4 h-4" />
                    Schedule Another RAID
                  </Button>
                </div>
              </section>
            )}

            {/* Action Log */}
            <section className="space-y-6">
              <h2 className="text-3xl font-bold flex items-center space-x-2 text-white">
                <Zap className="w-8 h-8 text-cyan-400" />
                <span>Live Action Log</span>
              </h2>

              <Card className="bg-black border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentActions.map((action) => (
                      <div
                        key={action.id}
                        className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-700/50 transition-colors"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-700">
                            {getActionIcon(action.actionType)}
                          </div>
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2">
                              <span className="font-medium text-white">
                                {action.user}
                              </span>
                              <span className="text-sm text-gray-400">
                                {action.actionType === "donate" && "donated"}
                                {action.actionType === "subs" && "gifted subs"}
                                {action.actionType === "token" &&
                                  "bought tokens"}
                              </span>
                              <span
                                className={`font-bold ${getActionColor(
                                  action.actionType
                                )}`}
                              >
                                ${action.amount}
                              </span>
                            </div>
                            <div className="flex items-center space-x-2 text-xs text-gray-400">
                              <span>{action.time}</span>
                              <span>•</span>
                              <span>{action.targetChannel}</span>
                            </div>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-gray-400 hover:text-white"
                          onClick={() => window.open(action.proofUrl, "_blank")}
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* CTA Section */}
            <section className="bg-gradient-to-r from-teal-400/10 via-emerald-400/10 to-cyan-400/10 rounded-xl p-8 border border-teal-400/20">
              <div className="text-center space-y-6">
                <h2 className="text-3xl font-bold text-white">
                  Ready to Join the Movement?
                </h2>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                  Connect with our community and be part of coordinated raids
                  that drive real impact.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-teal-400 to-emerald-400 hover:from-teal-300 hover:to-emerald-300 text-black px-8 py-3"
                    onClick={() =>
                      window.open("https://discord.gg/clip", "_blank")
                    }
                  >
                    <ExternalLink className="w-5 h-5 mr-2" />
                    Join Discord
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-teal-400 text-teal-400 hover:bg-teal-400/10 px-8 py-3"
                  >
                    Sign Up for Raids
                  </Button>
                </div>
              </div>
            </section>
          </div>

          {/* RAID Creator Modal */}
          <RaidCreator
            isOpen={showCreator}
            onClose={() => setShowCreator(false)}
          />
        </div>
      </div>
    </MainLayout>
  );
}
