"use client";

import { MainLayout } from "@/components/layout/MainLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Calendar,
  Crown,
  Medal,
  Scissors,
  Star,
  TrendingUp,
  Trophy,
  Zap,
} from "lucide-react";
import { useState } from "react";

export default function LeaderboardsPage() {
  const currentUser = {
    name: "zack.kargeen",
  };

  const [activeTab, setActiveTab] = useState("all-time");

  const topClippers = [
    {
      rank: 1,
      username: "@clipmaster",
      earnings: "$2,450",
      clips: 127,
      views: "1.2M",
      avatar: "CM",
      trend: "+15%",
      color: "from-yellow-400 to-yellow-600",
    },
    {
      rank: 2,
      username: "@viralking",
      earnings: "$1,890",
      clips: 89,
      views: "890K",
      avatar: "VK",
      trend: "+12%",
      color: "from-gray-300 to-gray-500",
    },
    {
      rank: 3,
      username: "@contentcreator",
      earnings: "$1,625",
      clips: 156,
      views: "750K",
      avatar: "CC",
      trend: "+8%",
      color: "from-amber-600 to-amber-800",
    },
    {
      rank: 4,
      username: "@clipsquad",
      earnings: "$1,340",
      clips: 94,
      views: "640K",
      avatar: "CS",
      trend: "+5%",
      color: "from-pink-500 to-purple-500",
    },
    {
      rank: 5,
      username: "@editmaster",
      earnings: "$1,120",
      clips: 78,
      views: "520K",
      avatar: "EM",
      trend: "+3%",
      color: "from-blue-500 to-cyan-500",
    },
  ];

  const topStreamers = [
    {
      rank: 1,
      username: "@pumpmaster",
      earnings: "$3,250",
      launches: 8,
      totalViews: "2.1M",
      avatar: "PM",
      trend: "+22%",
      color: "from-yellow-400 to-yellow-600",
    },
    {
      rank: 2,
      username: "@cryptoking",
      earnings: "$2,890",
      launches: 12,
      totalViews: "1.8M",
      avatar: "CK",
      trend: "+18%",
      color: "from-gray-300 to-gray-500",
    },
    {
      rank: 3,
      username: "@tokenqueen",
      earnings: "$2,450",
      launches: 6,
      totalViews: "1.5M",
      avatar: "TQ",
      trend: "+14%",
      color: "from-amber-600 to-amber-800",
    },
    {
      rank: 4,
      username: "@launchpad",
      earnings: "$1,980",
      launches: 10,
      totalViews: "1.2M",
      avatar: "LP",
      trend: "+11%",
      color: "from-pink-500 to-purple-500",
    },
    {
      rank: 5,
      username: "@streamlord",
      earnings: "$1,750",
      launches: 7,
      totalViews: "980K",
      avatar: "SL",
      trend: "+9%",
      color: "from-blue-500 to-cyan-500",
    },
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-5 h-5 text-yellow-400" />;
      case 2:
        return <Medal className="w-5 h-5 text-gray-400" />;
      case 3:
        return <Trophy className="w-5 h-5 text-amber-600" />;
      default:
        return (
          <span className="w-5 h-5 flex items-center justify-center text-gray-400 font-bold">
            #{rank}
          </span>
        );
    }
  };

  return (
    <MainLayout currentUser={currentUser}>
      <div className="min-h-screen bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="space-y-8">
            {/* Header */}
            <div className="text-center space-y-4">
              <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
                Leaderboards
              </h1>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Top performers in the CLIP ecosystem earning real rewards
              </p>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6 text-center">
                  <Crown className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-white mb-2">
                    Your Rank
                  </h3>
                  <p className="text-2xl font-bold text-gray-400">Not Ranked</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Start clipping to rank!
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6 text-center">
                  <Trophy className="w-12 h-12 text-pink-500 mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-white mb-2">
                    Top Clipper
                  </h3>
                  <p className="text-lg font-bold text-pink-500">@clipmaster</p>
                  <p className="text-xs text-gray-400 mt-1">$2,450 earned</p>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6 text-center">
                  <Medal className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-white mb-2">
                    Top Streamer
                  </h3>
                  <p className="text-lg font-bold text-purple-400">
                    @pumpmaster
                  </p>
                  <p className="text-xs text-gray-400 mt-1">$3,250 earned</p>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6 text-center">
                  <TrendingUp className="w-12 h-12 text-green-400 mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-white mb-2">
                    Total Users
                  </h3>
                  <p className="text-2xl font-bold text-green-400">1,247+</p>
                  <p className="text-xs text-gray-400 mt-1">Active creators</p>
                </CardContent>
              </Card>
            </div>

            {/* Time Period Tabs */}
            <div className="flex justify-center">
              <div className="bg-gray-800 rounded-full p-1 flex">
                {[
                  { id: "all-time", label: "All Time" },
                  { id: "monthly", label: "This Month" },
                  { id: "weekly", label: "This Week" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-6 py-3 rounded-full text-sm font-medium transition-all ${
                      activeTab === tab.id
                        ? "bg-pink-500 text-white shadow-lg"
                        : "text-gray-400 hover:text-white hover:bg-gray-700"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Leaderboards */}
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Top Clippers */}
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2 text-xl">
                    <Scissors className="w-6 h-6 text-cyan-400" />
                    Top Clippers
                    <Badge className="bg-cyan-400/20 text-cyan-400 ml-auto">
                      {topClippers.length} Active
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {topClippers.map((clipper) => (
                    <div
                      key={clipper.rank}
                      className="flex items-center justify-between p-4 rounded-lg bg-gray-700/50 hover:bg-gray-700 transition-all duration-300"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          {getRankIcon(clipper.rank)}
                        </div>

                        <div
                          className={`w-10 h-10 rounded-full bg-gradient-to-r ${clipper.color} flex items-center justify-center`}
                        >
                          <span className="text-white font-bold text-sm">
                            {clipper.avatar}
                          </span>
                        </div>

                        <div>
                          <div className="font-semibold text-white">
                            {clipper.username}
                          </div>
                          <div className="text-sm text-gray-400">
                            {clipper.clips} clips • {clipper.views} views
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="font-bold text-green-400 text-lg">
                          {clipper.earnings}
                        </div>
                        <div className="text-xs text-green-400">
                          {clipper.trend}
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="text-center pt-4">
                    <Button
                      variant="outline"
                      className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
                    >
                      View Full Leaderboard
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Top Streamers */}
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2 text-xl">
                    <Star className="w-6 h-6 text-pink-500" />
                    Top Streamers
                    <Badge className="bg-pink-500/20 text-pink-500 ml-auto">
                      {topStreamers.length} Active
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {topStreamers.map((streamer) => (
                    <div
                      key={streamer.rank}
                      className="flex items-center justify-between p-4 rounded-lg bg-gray-700/50 hover:bg-gray-700 transition-all duration-300"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          {getRankIcon(streamer.rank)}
                        </div>

                        <div
                          className={`w-10 h-10 rounded-full bg-gradient-to-r ${streamer.color} flex items-center justify-center`}
                        >
                          <span className="text-white font-bold text-sm">
                            {streamer.avatar}
                          </span>
                        </div>

                        <div>
                          <div className="font-semibold text-white">
                            {streamer.username}
                          </div>
                          <div className="text-sm text-gray-400">
                            {streamer.launches} launches • {streamer.totalViews}{" "}
                            views
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="font-bold text-green-400 text-lg">
                          {streamer.earnings}
                        </div>
                        <div className="text-xs text-green-400">
                          {streamer.trend}
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="text-center pt-4">
                    <Button
                      variant="outline"
                      className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
                    >
                      View Full Leaderboard
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Achievement Section */}
            <Card className="bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-cyan-400/10 border-pink-500/20">
              <CardContent className="p-8">
                <div className="text-center space-y-6">
                  <div className="flex items-center justify-center space-x-2">
                    <Trophy className="w-8 h-8 text-yellow-400" />
                    <h2 className="text-3xl font-bold text-white">
                      Join the Elite
                    </h2>
                  </div>
                  <p className="text-lg text-gray-400 max-w-3xl mx-auto">
                    Climb the ranks and earn your place among CLIP&apos;s top
                    performers. Start creating viral content today and see your
                    name on the leaderboard.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-8 py-3"
                      onClick={() => (window.location.href = "/rewards")}
                    >
                      <Zap className="w-5 h-5 mr-2" />
                      Start Clipping
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-cyan-400 text-cyan-400 hover:bg-cyan-400/10 px-8 py-3"
                      onClick={() => (window.location.href = "/calendar")}
                    >
                      <Calendar className="w-5 h-5 mr-2" />
                      Launch Token
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
