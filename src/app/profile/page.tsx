"use client";

import { LaunchCreator } from "@/components/launch/LaunchCreator";
import { MainLayout } from "@/components/layout/MainLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Crown,
  DollarSign,
  Edit,
  ExternalLink,
  Plus,
  Settings,
  Star,
  Target,
  TrendingUp,
  Trophy,
  User,
  Zap,
} from "lucide-react";
import { useState } from "react";

export default function ProfilePage() {
  const [isLaunchCreatorOpen, setIsLaunchCreatorOpen] = useState(false);

  const stats = [
    {
      label: "Total Earnings",
      value: "$847.50",
      icon: DollarSign,
      color: "text-green-400",
      change: "+12.5%",
    },
    {
      label: "Clips Created",
      value: "23",
      icon: Trophy,
      color: "text-pink-500",
      change: "+4",
    },
    {
      label: "Total Views",
      value: "156.2K",
      icon: TrendingUp,
      color: "text-cyan-400",
      change: "+8.9%",
    },
    {
      label: "Rank",
      value: "#47",
      icon: Crown,
      color: "text-yellow-400",
      change: "+5",
    },
  ];

  const recentActivity = [
    {
      id: 1,
      type: "clip",
      title: "Epic Token Launch Moment",
      earnings: "+$45.20",
      views: "12.5K",
      date: "2 hours ago",
      status: "viral",
    },
    {
      id: 2,
      type: "launch",
      title: "$MOON Launch Event",
      earnings: "+$120.00",
      views: "8.2K",
      date: "1 day ago",
      status: "successful",
    },
    {
      id: 3,
      type: "clip",
      title: "Pump Reaction Compilation",
      earnings: "+$28.75",
      views: "6.1K",
      date: "3 days ago",
      status: "trending",
    },
    {
      id: 4,
      type: "clip",
      title: "Trading Psychology Breakdown",
      earnings: "+$35.90",
      views: "9.8K",
      date: "5 days ago",
      status: "popular",
    },
  ];

  const achievements = [
    {
      title: "First Clip",
      description: "Created your first viral clip",
      icon: Trophy,
      color: "text-pink-500",
      earned: true,
    },
    {
      title: "Rising Star",
      description: "Earned $500+ in a single month",
      icon: Star,
      color: "text-yellow-400",
      earned: true,
    },
    {
      title: "Viral Master",
      description: "Created a clip with 50K+ views",
      icon: Zap,
      color: "text-cyan-400",
      earned: false,
    },
    {
      title: "Launch Expert",
      description: "Successfully launched 5 tokens",
      icon: Target,
      color: "text-purple-400",
      earned: false,
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "viral":
        return <Badge className="bg-red-500 text-white">Viral</Badge>;
      case "successful":
        return <Badge className="bg-green-500 text-white">Success</Badge>;
      case "trending":
        return <Badge className="bg-yellow-500 text-black">Trending</Badge>;
      case "popular":
        return <Badge className="bg-blue-500 text-white">Popular</Badge>;
      default:
        return <Badge className="bg-gray-500 text-white">Active</Badge>;
    }
  };

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <User className="w-8 h-8 text-green-400" />
                <h1 className="text-3xl font-bold text-white">Profile</h1>
              </div>
              <Button
                variant="outline"
                className="gap-2 border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                <Edit className="w-4 h-4" />
                Edit Profile
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Profile Card */}
              <div className="lg:col-span-1">
                <Card className="bg-gray-800 border-gray-700">
                  <CardContent className="p-6 text-center">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center mx-auto mb-4">
                      <span className="text-white font-bold text-2xl"></span>
                    </div>
                    <h2 className="text-xl font-bold text-white mb-2"></h2>
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <div className="w-2 h-2 rounded-full bg-green-400"></div>
                      <span className="text-sm text-gray-400">Online</span>
                    </div>
                    <Badge className="mb-4 bg-purple-500 text-white">
                      Pro Clipper
                    </Badge>
                    <p className="text-gray-400 text-sm mb-6">
                      Creator focused on viral token launch content and
                      community building.
                    </p>

                    <div className="space-y-3">
                      <Button
                        className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white"
                        onClick={() => setIsLaunchCreatorOpen(true)}
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Create Launch
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full gap-2 border-gray-600 text-gray-300 hover:bg-gray-700"
                      >
                        <Settings className="w-4 h-4" />
                        Account Settings
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Stats */}
                <Card className="bg-gray-800 border-gray-700 mt-6">
                  <CardHeader>
                    <CardTitle className="text-white text-lg">
                      Quick Stats
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Join Date</span>
                      <span className="text-white">Dec 2024</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Success Rate</span>
                      <span className="text-green-400">87%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Avg. Views</span>
                      <span className="text-cyan-400">6.8K</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Best Clip</span>
                      <span className="text-yellow-400">45K views</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Stats and Info */}
              <div className="lg:col-span-2 space-y-6">
                {/* Performance Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                      <Card key={index} className="bg-gray-800 border-gray-700">
                        <CardContent className="p-4 text-center">
                          <Icon
                            className={`w-8 h-8 mx-auto mb-2 ${stat.color}`}
                          />
                          <p className="text-2xl font-bold text-white mb-1">
                            {stat.value}
                          </p>
                          <p className="text-sm text-gray-400 mb-1">
                            {stat.label}
                          </p>
                          <p className={`text-xs ${stat.color}`}>
                            {stat.change}
                          </p>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>

                {/* Recent Activity */}
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white">
                      Recent Activity
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentActivity.map((activity) => (
                        <div
                          key={activity.id}
                          className="flex items-center justify-between p-4 rounded-lg bg-gray-700/50 hover:bg-gray-700 transition-colors"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 flex items-center justify-center">
                              {activity.type === "clip" ? (
                                <Trophy className="w-5 h-5 text-white" />
                              ) : (
                                <Target className="w-5 h-5 text-white" />
                              )}
                            </div>
                            <div>
                              <h4 className="font-medium text-white">
                                {activity.title}
                              </h4>
                              <div className="flex items-center gap-2 text-sm text-gray-400">
                                <span>{activity.views} views</span>
                                <span>•</span>
                                <span>{activity.date}</span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-green-400 mb-1">
                              {activity.earnings}
                            </div>
                            {getStatusBadge(activity.status)}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="text-center pt-4">
                      <Button
                        variant="outline"
                        className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
                      >
                        View All Activity
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Achievements */}
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white">Achievements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {achievements.map((achievement, index) => {
                        const Icon = achievement.icon;
                        return (
                          <div
                            key={index}
                            className={`p-4 rounded-lg border transition-colors ${
                              achievement.earned
                                ? "bg-gray-700/50 border-gray-600"
                                : "bg-gray-800/50 border-gray-700 opacity-50"
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <div
                                className={`p-2 rounded-lg ${
                                  achievement.earned
                                    ? "bg-gray-700"
                                    : "bg-gray-800"
                                }`}
                              >
                                <Icon
                                  className={`w-5 h-5 ${achievement.color}`}
                                />
                              </div>
                              <div className="flex-1">
                                <h4
                                  className={`font-medium mb-1 ${
                                    achievement.earned
                                      ? "text-white"
                                      : "text-gray-500"
                                  }`}
                                >
                                  {achievement.title}
                                </h4>
                                <p
                                  className={`text-sm ${
                                    achievement.earned
                                      ? "text-gray-400"
                                      : "text-gray-600"
                                  }`}
                                >
                                  {achievement.description}
                                </p>
                              </div>
                              {achievement.earned && (
                                <Badge className="bg-green-500 text-white text-xs">
                                  Earned
                                </Badge>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>

                {/* Social Links */}
                <Card className="bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-cyan-400/10 border-pink-500/20">
                  <CardContent className="p-6">
                    <div className="text-center space-y-4">
                      <h3 className="text-xl font-bold text-white">
                        Connect & Share
                      </h3>
                      <p className="text-gray-400">
                        Share your profile and connect with other creators in
                        the CLIP ecosystem.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Button
                          variant="outline"
                          className="gap-2 border-pink-500 text-pink-500 hover:bg-pink-500/10"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Share Profile
                        </Button>
                        <Button
                          className="gap-2 bg-gradient-to-r from-cyan-400 to-purple-500 hover:from-cyan-500 hover:to-purple-600 text-white"
                          onClick={() => (window.location.href = "/chat")}
                        >
                          Join Community
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Launch Creator Modal */}
          <LaunchCreator
            isOpen={isLaunchCreatorOpen}
            onClose={() => setIsLaunchCreatorOpen(false)}
            onSuccess={() => {
              console.log("Launch created successfully");
            }}
          />
        </div>
      </div>
    </MainLayout>
  );
}
