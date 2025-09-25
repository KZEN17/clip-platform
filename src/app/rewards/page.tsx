"use client";

import { CampaignCreator } from "@/components/campaign/CampaignCreator";
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
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/useToast";
import { databases } from "@/lib/appwrite";
import { RewardsCampaign } from "@/lib/launchSchema";
import { Query } from "appwrite";
import {
  Award,
  Clock,
  Gift,
  Plus,
  RefreshCw,
  Star,
  Target,
  TrendingUp,
  Trophy,
  Zap,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

// Types for campaign and CampaignCard props
interface CampaignCardProps {
  campaign: RewardsCampaign;
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

// Campaign Detail with explicit colors
interface CampaignDetailProps {
  campaign: RewardsCampaign;
  onBack: () => void;
  onJoin: (campaignId: string) => void;
}

const CampaignDetail = ({ campaign, onBack, onJoin }: CampaignDetailProps) => {
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

export default function RewardsPage() {
  const [selectedCampaign, setSelectedCampaign] =
    useState<RewardsCampaign | null>(null);
  const [activeTab, setActiveTab] = useState("active");
  const [isSubmissionModalOpen, setIsSubmissionModalOpen] = useState(false);
  const [submissionCampaignTitle, setSubmissionCampaignTitle] =
    useState<string>("");
  const [isCreatorOpen, setIsCreatorOpen] = useState(false);
  const [campaigns, setCampaigns] = useState<RewardsCampaign[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  // Load campaigns from Appwrite
  // useEffect(() => {
  //   loadCampaigns();
  // });

  const loadCampaigns = async () => {
    try {
      setLoading(true);
      const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
      const collectionId =
        process.env.NEXT_PUBLIC_APPWRITE_CAMPAIGNS_COLLECTION_ID;

      if (!databaseId || !collectionId) {
        console.warn("Database or collection ID not configured");
        setLoading(false);
        return;
      }

      const response = await databases.listDocuments(databaseId, collectionId, [
        Query.orderDesc("$createdAt"),
        Query.limit(50),
      ]);

      setCampaigns(response.documents as unknown as RewardsCampaign[]);
    } catch (error) {
      console.error("Error loading campaigns:", error);
      toast({
        title: "Error Loading Campaigns",
        description: "Could not load campaigns. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Categorize campaigns by status
  const categorizedCampaigns = {
    active: campaigns.filter((c) => c.status === "active"),
    upcoming: campaigns.filter(
      (c) => c.status === "draft" || c.status === "paused"
    ),
    ended: campaigns.filter(
      (c) => c.status === "completed" || c.status === "cancelled"
    ),
  };

  const handleJoinCampaign = (campaignId: string) => {
    const campaign = campaigns.find((c) => c.$id === campaignId);
    if (campaign) {
      setSubmissionCampaignTitle(campaign.campaignTitle);
      setIsSubmissionModalOpen(true);
    }
  };

  const handleViewCampaign = (campaignId: string) => {
    const campaign = campaigns.find((c) => c.$id === campaignId);
    if (campaign) {
      setSelectedCampaign(campaign);
    }
  };

  const handleBackToCampaigns = () => {
    setSelectedCampaign(null);
  };

  const handleCampaignCreated = () => {
    setIsCreatorOpen(false);
    loadCampaigns(); // Reload campaigns after creating new one
    toast({
      title: "Campaign Created!",
      description: "Your new campaign has been created successfully.",
    });
  };

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <SubmissionModal
            isOpen={isSubmissionModalOpen}
            onClose={() => setIsSubmissionModalOpen(false)}
            campaignTitle={submissionCampaignTitle}
          />

          <CampaignCreator
            isOpen={isCreatorOpen}
            onClose={() => setIsCreatorOpen(false)}
            onSuccess={handleCampaignCreated}
          />

          {/* If viewing campaign detail */}
          {selectedCampaign ? (
            <CampaignDetail
              campaign={selectedCampaign}
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
                  Join clipping campaigns and earn rewards based on views and
                  engagement.
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
                          $
                          {campaigns
                            .reduce((sum, c) => sum + c.prizePool, 0)
                            .toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-400">
                          Total Rewards Pool
                        </div>
                      </div>
                      <div className="text-center space-y-2">
                        <div className="text-2xl font-bold text-purple-400">
                          {campaigns.reduce(
                            (sum, c) => sum + c.currentParticipants,
                            0
                          )}
                          +
                        </div>
                        <div className="text-sm text-gray-400">
                          Active Creators
                        </div>
                      </div>
                      <div className="text-center space-y-2">
                        <div className="text-2xl font-bold text-cyan-400">
                          {campaigns.length}
                        </div>
                        <div className="text-sm text-gray-400">
                          Total Campaigns
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
                      onClick={loadCampaigns}
                      disabled={loading}
                    >
                      <RefreshCw
                        className={`w-4 h-4 mr-2 ${
                          loading ? "animate-spin" : ""
                        }`}
                      />
                      Refresh
                    </Button>
                    {user && (
                      <Button
                        size="sm"
                        className="bg-pink-500 hover:bg-pink-600 text-white"
                        onClick={() => setIsCreatorOpen(true)}
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Create Campaign
                      </Button>
                    )}
                  </div>
                </div>

                {loading ? (
                  <div className="flex items-center justify-center py-12">
                    <RefreshCw className="w-8 h-8 text-pink-500 animate-spin" />
                    <span className="ml-2 text-gray-400">
                      Loading campaigns...
                    </span>
                  </div>
                ) : (
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
                        <span>
                          Active ({categorizedCampaigns.active.length})
                        </span>
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
                              {user && (
                                <Button
                                  onClick={() => setIsCreatorOpen(true)}
                                  className="mt-4 bg-pink-500 hover:bg-pink-600 text-white"
                                >
                                  <Plus className="w-4 h-4 mr-2" />
                                  Create First Campaign
                                </Button>
                              )}
                            </div>
                          ) : (
                            <div className="grid gap-6 md:grid-cols-2">
                              {categorizedCampaigns.active.map((campaign) => (
                                <CampaignCard
                                  key={campaign.$id}
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
                              {user && (
                                <Button
                                  onClick={() => setIsCreatorOpen(true)}
                                  className="mt-4 bg-pink-500 hover:bg-pink-600 text-white"
                                >
                                  <Plus className="w-4 h-4 mr-2" />
                                  Create First Campaign
                                </Button>
                              )}
                            </div>
                          ) : (
                            <div className="grid gap-6 md:grid-cols-2">
                              {categorizedCampaigns.upcoming.map((campaign) => (
                                <CampaignCard
                                  key={campaign.$id}
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
                          {categorizedCampaigns.ended.length === 0 ? (
                            <div className="text-center py-8">
                              <Star className="w-12 h-12 mx-auto text-gray-500 mb-4" />
                              <p className="text-gray-400">
                                No completed campaigns yet
                              </p>
                            </div>
                          ) : (
                            <div className="grid gap-6 md:grid-cols-2">
                              {categorizedCampaigns.ended.map((campaign) => (
                                <CampaignCard
                                  key={campaign.$id}
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
                  </Tabs>
                )}
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
                        "Check active campaigns and choose ones that match your interests.",
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
                        "Submit your clips through our platform and track performance in real-time.",
                    },
                    {
                      step: 4,
                      title: "Earn Rewards",
                      description:
                        "Get paid based on views, engagement, and campaign goals achieved.",
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
                      Browse Campaigns
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white px-8 py-3"
                      onClick={() => (window.location.href = "/guide")}
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
