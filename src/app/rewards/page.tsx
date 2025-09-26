"use client";

import { CampaignCreator } from "@/components/campaign/CampaignCreator";
import { MainLayout } from "@/components/layout/MainLayout";
import { CampaignCard } from "@/components/rewards/CampaignCard";
import { CampaignDetail } from "@/components/rewards/CampaignDetails";
import { CreatorFeeLoop } from "@/components/rewards/CreatorFeeLoop";
import { HowToParticipate } from "@/components/rewards/HowToParticipate";
import { RewardsHub } from "@/components/rewards/RewardsHub";
import { SubmissionModal } from "@/components/rewards/SubmissionModal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/useToast";
import { databases } from "@/lib/appwrite";
import { RewardsCampaign } from "@/lib/launchSchema";
import { Query } from "appwrite";
import {
  Award,
  Clock,
  Plus,
  RefreshCw,
  Star,
  Target,
  Trophy,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";

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
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const { toast } = useToast();

  // Load campaigns from Appwrite
  useEffect(() => {
    loadCampaigns();
  }, []);

  const loadCampaigns = async () => {
    try {
      setLoading(true);
      setError(null);

      const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
      const collectionId =
        process.env.NEXT_PUBLIC_APPWRITE_CAMPAIGNS_COLLECTION_ID;

      if (!databaseId || !collectionId) {
        console.warn("Database or collection ID not configured");
        setError("Database configuration missing");
        setLoading(false);
        return;
      }

      const response = await databases.listDocuments(databaseId, collectionId, [
        Query.orderDesc("$createdAt"),
        Query.limit(100),
      ]);

      setCampaigns(response.documents as unknown as RewardsCampaign[]);
    } catch (error) {
      console.error("Error loading campaigns:", error);
      setError("Failed to load campaigns");
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
    loadCampaigns();
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

              {/* Error State */}
              {error && (
                <Card className="bg-red-500/10 border-red-500/20">
                  <CardContent className="p-6 text-center">
                    <div className="text-red-400 mb-2">⚠️ Error</div>
                    <p className="text-red-300">{error}</p>
                    <Button
                      onClick={loadCampaigns}
                      className="mt-4 bg-red-500 hover:bg-red-600 text-white"
                    >
                      Try Again
                    </Button>
                  </CardContent>
                </Card>
              )}

              {/* Rewards Hub Intro */}
              <RewardsHub campaigns={campaigns} />

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
              <CreatorFeeLoop />

              {/* How to Participate */}
              <HowToParticipate />

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
