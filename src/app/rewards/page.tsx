"use client";

import { MainLayout } from "@/components/layout/MainLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Award,
  Clock,
  Filter,
  Gift,
  Plus,
  RefreshCw,
  Star,
  Target,
  TrendingUp,
  Trophy,
  Zap,
} from "lucide-react";
import { useState } from "react";

// Mock data for campaigns
const mockCampaigns = [
  {
    id: "1",
    title: "Viral Gaming Clips Challenge",
    description:
      "Create the most viral gaming clips and earn rewards based on views",
    prize_pool: 5000,
    participants_count: 127,
    end_date: "2024-12-31",
    status: "active",
    tags: ["gaming", "viral"],
    total_submissions: 45,
    payout_per_1000_views: 2,
    max_payout_per_clip: 50,
  },
  {
    id: "2",
    title: "Best Reaction Clips",
    description: "Capture the best reaction moments from streamers",
    prize_pool: 3000,
    participants_count: 89,
    end_date: "2025-01-15",
    status: "active",
    tags: ["reactions", "funny"],
    total_submissions: 32,
    payout_per_1000_views: 1.5,
    max_payout_per_clip: 40,
  },
  {
    id: "3",
    title: "Holiday Special Campaign",
    description: "Holiday-themed clips with special bonuses",
    prize_pool: 7500,
    participants_count: 0,
    end_date: "2025-01-05",
    status: "upcoming",
    tags: ["holiday", "special"],
    total_submissions: 0,
    payout_per_1000_views: 3,
    max_payout_per_clip: 75,
  },
];

// Types for campaign and CampaignCard props
interface Campaign {
  id: string;
  title: string;
  description: string;
  prize_pool: number;
  participants_count: number;
  end_date: string;
  status: string;
  tags: string[];
  total_submissions: number;
  payout_per_1000_views: number;
  max_payout_per_clip: number;
}

interface CampaignCardProps {
  campaign: Campaign;
  onJoin: (campaignId: string) => void;
  onView: (campaignId: string) => void;
}

// Campaign Card with explicit colors
const CampaignCard = ({ campaign, onJoin, onView }: CampaignCardProps) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-green-500 text-white hover:bg-green-600">
            {status}
          </Badge>
        );
      case "upcoming":
        return (
          <Badge className="bg-blue-500 text-white hover:bg-blue-600">
            {status}
          </Badge>
        );
      case "ended":
        return (
          <Badge className="bg-gray-500 text-white hover:bg-gray-600">
            {status}
          </Badge>
        );
      default:
        return <Badge className="bg-gray-500 text-white">{status}</Badge>;
    }
  };

  return (
    <Card className="bg-gray-800 border-gray-700 hover:border-gray-600 transition-all duration-300">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <CardTitle className="text-lg text-white">
              {campaign.title}
            </CardTitle>
            <CardDescription className="text-sm text-gray-400">
              {campaign.description}
            </CardDescription>
          </div>
          {getStatusBadge(campaign.status)}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-pink-500">
              ${campaign.prize_pool}
            </div>
            <div className="text-xs text-gray-400">Prize Pool</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-400">
              {campaign.participants_count}
            </div>
            <div className="text-xs text-gray-400">Participants</div>
          </div>
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
            onClick={() => onView(campaign.id)}
            className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
          >
            View Details
          </Button>
          {campaign.status === "active" && (
            <Button
              size="sm"
              onClick={() => onJoin(campaign.id)}
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

// Campaign Detail with explicit colors
interface CampaignDetailProps {
  campaignId: string;
  onBack: () => void;
  onJoin: (campaignId: string) => void;
}

const CampaignDetail = ({
  campaignId,
  onBack,
  onJoin,
}: CampaignDetailProps) => {
  const campaign = mockCampaigns.find((c) => c.id === campaignId);

  if (!campaign) {
    return (
      <div className="text-center py-8">
        <p className="text-white">Campaign not found</p>
        <Button
          onClick={onBack}
          className="mt-4 bg-pink-500 hover:bg-pink-600 text-white"
        >
          Back to Campaigns
        </Button>
      </div>
    );
  }

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
            {campaign.title}
          </CardTitle>
          <CardDescription className="text-gray-400">
            {campaign.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-pink-500">
                ${campaign.prize_pool}
              </div>
              <div className="text-sm text-gray-400">Total Prize Pool</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400">
                {campaign.participants_count}
              </div>
              <div className="text-sm text-gray-400">Participants</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-400">
                ${campaign.payout_per_1000_views}
              </div>
              <div className="text-sm text-gray-400">Per 1K Views</div>
            </div>
          </div>

          {campaign.status === "active" && (
            <div className="text-center">
              <Button
                size="lg"
                onClick={() => onJoin(campaign.id)}
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

// Submission Modal with explicit colors
interface SubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  campaignTitle: string;
  campaignId?: string;
}

const SubmissionModal = ({
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
            Submission functionality will be implemented soon!
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
              className="flex-1 bg-pink-500 hover:bg-pink-600 text-white"
            >
              Submit
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default function RewardsPage() {
  const [selectedCampaign, setSelectedCampaign] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("active");
  const [isSubmissionModalOpen, setIsSubmissionModalOpen] = useState(false);
  const [submissionCampaignId, setSubmissionCampaignId] = useState<string>("");
  const [submissionCampaignTitle, setSubmissionCampaignTitle] =
    useState<string>("");

  // Categorize campaigns by status
  const categorizedCampaigns = {
    active: mockCampaigns.filter((c) => c.status === "active"),
    upcoming: mockCampaigns.filter((c) => c.status === "upcoming"),
    ended: mockCampaigns.filter(
      (c) => c.status === "ended" || c.status === "completed"
    ),
  };

  const handleJoinCampaign = (campaignId: string) => {
    const campaign = mockCampaigns.find((c) => c.id === campaignId);
    if (campaign) {
      setSubmissionCampaignId(campaignId);
      setSubmissionCampaignTitle(campaign.title);
      setIsSubmissionModalOpen(true);
    }
  };

  const handleViewCampaign = (campaignId: string) => {
    setSelectedCampaign(campaignId);
  };

  const handleBackToCampaigns = () => {
    setSelectedCampaign(null);
  };

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <SubmissionModal
            isOpen={isSubmissionModalOpen}
            onClose={() => setIsSubmissionModalOpen(false)}
            campaignTitle={submissionCampaignTitle}
            campaignId={submissionCampaignId}
          />

          {/* If viewing campaign detail */}
          {selectedCampaign ? (
            <CampaignDetail
              campaignId={selectedCampaign}
              onBack={handleBackToCampaigns}
              onJoin={handleJoinCampaign}
            />
          ) : (
            <div className="space-y-8">
              {/* Header */}
              <div className="text-center space-y-4">
                <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
                  Rewards
                </h1>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                  Clipping rewards hosted on Whop. Earn more for creating viral
                  content.
                </p>
              </div>

              {/* Rewards Hub Intro */}
              <Card className="bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-cyan-400/10 border-pink-500/20">
                <CardContent className="p-8">
                  <div className="text-center space-y-6">
                    <div className="flex items-center justify-center space-x-2">
                      <Trophy className="w-8 h-8 text-pink-500" />
                      <h2 className="text-3xl font-bold text-white">
                        CLIP Rewards Hub
                      </h2>
                    </div>
                    <p className="text-lg text-gray-400 max-w-3xl mx-auto">
                      Earn rewards for creating viral clips. Join campaigns,
                      compete with other clippers, and get paid for your best
                      content. The more viral your clips, the more you earn.
                    </p>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="text-center space-y-2">
                        <div className="text-2xl font-bold text-pink-500">
                          $22K+
                        </div>
                        <div className="text-sm text-gray-400">
                          Total Rewards Pool
                        </div>
                      </div>
                      <div className="text-center space-y-2">
                        <div className="text-2xl font-bold text-purple-400">
                          479+
                        </div>
                        <div className="text-sm text-gray-400">
                          Active Creators
                        </div>
                      </div>
                      <div className="text-center space-y-2">
                        <div className="text-2xl font-bold text-cyan-400">
                          12
                        </div>
                        <div className="text-sm text-gray-400">
                          Live Campaigns
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Campaign Tabs */}
              <section className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-3xl font-bold flex items-center space-x-2 text-white">
                    <Target className="w-8 h-8 text-pink-500" />
                    <span>Campaigns</span>
                  </h2>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
                    >
                      <Filter className="w-4 h-4 mr-2" />
                      Filter
                    </Button>
                    <Button
                      size="sm"
                      className="bg-pink-500 hover:bg-pink-600 text-white"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Create Campaign
                    </Button>
                  </div>
                </div>

                <Tabs
                  value={activeTab}
                  onValueChange={setActiveTab}
                  className="w-full"
                >
                  <TabsList className="grid w-full grid-cols-3 bg-gray-800">
                    <TabsTrigger
                      value="active"
                      className="flex items-center space-x-2 data-[state=active]:bg-gray-900 data-[state=active]:text-white"
                    >
                      <Zap className="w-4 h-4" />
                      <span>Active ({categorizedCampaigns.active.length})</span>
                    </TabsTrigger>
                    <TabsTrigger
                      value="upcoming"
                      className="flex items-center space-x-2 data-[state=active]:bg-gray-900 data-[state=active]:text-white"
                    >
                      <Clock className="w-4 h-4" />
                      <span>
                        Upcoming ({categorizedCampaigns.upcoming.length})
                      </span>
                    </TabsTrigger>
                    <TabsTrigger
                      value="ended"
                      className="flex items-center space-x-2 data-[state=active]:bg-gray-900 data-[state=active]:text-white"
                    >
                      <Award className="w-4 h-4" />
                      <span>Ended ({categorizedCampaigns.ended.length})</span>
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="active" className="space-y-6">
                    <Card className="bg-gray-800 border-gray-700">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="flex items-center gap-2 text-white">
                            <Trophy className="w-5 h-5 text-cyan-400" />
                            Active Campaigns
                          </CardTitle>
                          <Badge className="bg-purple-500 text-white">
                            {categorizedCampaigns.active.length} Active
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        {categorizedCampaigns.active.length === 0 ? (
                          <div className="text-center py-8">
                            <Trophy className="w-12 h-12 mx-auto text-gray-500 mb-4" />
                            <p className="text-gray-400">
                              No active campaigns at the moment
                            </p>
                          </div>
                        ) : (
                          <div className="grid gap-6 md:grid-cols-2">
                            {categorizedCampaigns.active.map((campaign) => (
                              <CampaignCard
                                key={campaign.id}
                                campaign={campaign}
                                onJoin={handleJoinCampaign}
                                onView={handleViewCampaign}
                              />
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="upcoming" className="space-y-6">
                    <Card className="bg-gray-800 border-gray-700">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="flex items-center gap-2 text-white">
                            <Clock className="w-5 h-5 text-pink-500" />
                            Upcoming Campaigns
                          </CardTitle>
                          <Badge className="bg-gray-600 text-white border-gray-500">
                            {categorizedCampaigns.upcoming.length} Coming Soon
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        {categorizedCampaigns.upcoming.length === 0 ? (
                          <div className="text-center py-8">
                            <Clock className="w-12 h-12 mx-auto text-gray-500 mb-4" />
                            <p className="text-gray-400">
                              No upcoming campaigns scheduled
                            </p>
                          </div>
                        ) : (
                          <div className="grid gap-6 md:grid-cols-2">
                            {categorizedCampaigns.upcoming.map((campaign) => (
                              <CampaignCard
                                key={campaign.id}
                                campaign={campaign}
                                onJoin={handleJoinCampaign}
                                onView={handleViewCampaign}
                              />
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="ended" className="space-y-6">
                    <Card className="bg-gray-800 border-gray-700">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="flex items-center gap-2 text-white">
                            <Star className="w-5 h-5 text-gray-400" />
                            Past Campaigns
                          </CardTitle>
                          <Badge className="bg-purple-500 text-white">
                            {categorizedCampaigns.ended.length} Completed
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="text-center py-8">
                          <Star className="w-12 h-12 mx-auto text-gray-500 mb-4" />
                          <p className="text-gray-400">
                            No completed campaigns yet
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </section>

              {/* Fee Recycling Explanation */}
              <Card className="border-cyan-400/20 bg-gradient-to-r from-cyan-400/5 to-cyan-400/10">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-2xl text-white">
                    <RefreshCw className="w-6 h-6 text-cyan-400" />
                    <span>Creator Fee Loop</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-lg text-gray-400">
                    Creator fees are recycled into new clipping campaigns,
                    creating a sustainable economy where successful content
                    generates more opportunities for creators.
                  </p>

                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center space-y-2">
                      <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-pink-600 rounded-xl flex items-center justify-center mx-auto">
                        <TrendingUp className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="font-semibold text-white">
                        Fees Generated
                      </h3>
                      <p className="text-sm text-gray-400">
                        Streamers earn from viral clips
                      </p>
                    </div>
                    <div className="text-center space-y-2">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto">
                        <RefreshCw className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="font-semibold text-white">
                        Fees Recycled
                      </h3>
                      <p className="text-sm text-gray-400">
                        Portion funds new campaigns
                      </p>
                    </div>
                    <div className="text-center space-y-2">
                      <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-cyan-500 rounded-xl flex items-center justify-center mx-auto">
                        <Gift className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="font-semibold text-white">More Rewards</h3>
                      <p className="text-sm text-gray-400">
                        Increased incentives for clippers
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* How to Participate */}
              <section className="space-y-6">
                <h2 className="text-3xl font-bold text-white">
                  How to Participate
                </h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    {
                      step: 1,
                      title: "Browse Campaigns",
                      description:
                        "Check active campaigns on Whop and choose ones that match your interests.",
                    },
                    {
                      step: 2,
                      title: "Create Clips",
                      description:
                        "Make high-quality clips following campaign guidelines and requirements.",
                    },
                    {
                      step: 3,
                      title: "Submit & Track",
                      description:
                        "Submit your clips through CLIP platform and track performance in real-time.",
                    },
                    {
                      step: 4,
                      title: "Earn Rewards",
                      description:
                        "Get paid through Whop based on views, engagement, and campaign goals.",
                    },
                  ].map((step) => (
                    <Card
                      key={step.step}
                      className="text-center hover:shadow-lg transition-all duration-300 bg-gray-800 border-gray-700"
                    >
                      <CardHeader>
                        <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                          <span className="text-white font-bold text-lg">
                            {step.step}
                          </span>
                        </div>
                        <CardTitle className="text-lg text-white">
                          {step.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-400 text-sm">
                          {step.description}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>

              {/* CTA Section */}
              <section className="bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-cyan-400/10 rounded-xl p-8">
                <div className="text-center space-y-6">
                  <h2 className="text-3xl font-bold text-white">
                    Ready to Start Earning?
                  </h2>
                  <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                    Join active campaigns and turn your clipping skills into
                    real rewards. The more viral your clips, the more you earn.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      size="lg"
                      onClick={() => setActiveTab("active")}
                      className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-8 py-3"
                    >
                      <Trophy className="w-5 h-5 mr-2" />
                      Start Clipping
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white px-8 py-3"
                    >
                      Learn How to Clip
                    </Button>
                  </div>
                </div>
              </section>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
