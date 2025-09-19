"use client";

import { AuthModal } from "@/components/auth/AuthModal";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  Calendar,
  DollarSign,
  Play,
  Scissors,
  Star,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const currentUser = {
    name: "zack.kargeen",
  };

  const stats = [
    { label: "Total Users", value: "45,678", color: "text-pink-500" },
    { label: "Earnings Paid", value: "$125,340", color: "text-green-400" },
    { label: "Active Clips", value: "3,456", color: "text-purple-400" },
    { label: "Views", value: "2.1M", color: "text-cyan-400" },
  ];

  const features = [
    {
      icon: Play,
      title: "Stream • Clip • Earn $",
      description:
        "Create viral clips from live streams and monetize based on views and engagement",
      color: "text-pink-500",
      bgColor: "from-pink-500/10 to-pink-600/10",
      borderColor: "border-pink-500/20",
    },
    {
      icon: TrendingUp,
      title: "Loop Rewards & Grow",
      description:
        "Recycle hype, multiply rewards and grow your creator network",
      color: "text-cyan-400",
      bgColor: "from-cyan-400/10 to-green-500/10",
      borderColor: "border-cyan-400/20",
    },
    {
      icon: DollarSign,
      title: "Entertainment Finance",
      description: "Turn entertainment into sustainable revenue for creators",
      color: "text-green-400",
      bgColor: "from-green-400/10 to-purple-500/10",
      borderColor: "border-green-400/20",
    },
  ];

  return (
    <MainLayout currentUser={currentUser}>
      <div className="min-h-screen bg-gray-900">
        {/* Hero Section - Full Screen */}
        <section className="min-h-screen flex items-center justify-center px-6">
          <div className="text-center space-y-8 max-w-4xl mx-auto">
            <h1 className="text-6xl md:text-8xl font-bold leading-tight tracking-tight">
              <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
                FROM TWITCH
              </span>
              <br />
              <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
                TO RICH
              </span>
            </h1>

            {/* Decorative line with controller icon */}
            <div className="flex items-center justify-center gap-4 py-6">
              <div className="w-16 h-0.5 bg-gradient-to-r from-transparent to-pink-500"></div>
              <div className="w-8 h-8 bg-gray-700 rounded flex items-center justify-center">
                <span className="text-xs">🎮</span>
              </div>
              <div className="w-16 h-0.5 bg-gradient-to-r from-pink-500 to-transparent"></div>
            </div>

            <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Turn{" "}
              <span className="text-pink-500 font-medium">entertainment</span>{" "}
              into finance. Connect{" "}
              <span className="text-green-400 font-medium">streamers</span>,
              clippers, and agencies.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button
                onClick={() => setIsAuthModalOpen(true)}
                size="lg"
                className="rounded-full px-12 py-4 min-w-[280px] font-semibold text-lg bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-400 hover:to-pink-500 text-white shadow-2xl hover:shadow-pink-500/25 transition-all duration-300"
              >
                ▶ START CLIPPING NOW
              </Button>
              <Button
                onClick={() => setIsAuthModalOpen(true)}
                size="lg"
                className="rounded-full px-12 py-4 min-w-[280px] font-semibold text-lg bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-400 hover:to-purple-500 text-white shadow-2xl hover:shadow-purple-500/25 transition-all duration-300"
              >
                👥 START STREAMING NOW
              </Button>
            </div>
          </div>
        </section>

        {/* Platform Growth Stats */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4 text-white">
                Platform Growth
              </h2>
              <p className="text-gray-400 text-lg">
                Real numbers from our thriving creator economy
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center mb-20">
              {stats.map((stat, index) => (
                <div key={index}>
                  <div className={`text-4xl font-bold ${stat.color} mb-2`}>
                    {stat.value}
                  </div>
                  <div className="text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Feature Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-20">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Card
                    key={index}
                    className={`bg-gradient-to-br ${feature.bgColor} ${
                      feature.borderColor
                    } hover:${feature.borderColor.replace(
                      "/20",
                      "/40"
                    )} transition-all duration-300 border bg-gray-800`}
                  >
                    <CardContent className="p-8 text-center space-y-4">
                      <div
                        className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${feature.bgColor} flex items-center justify-center`}
                      >
                        <Icon className={`w-8 h-8 ${feature.color}`} />
                      </div>
                      <h3 className={`text-xl font-bold ${feature.color}`}>
                        {feature.title}
                      </h3>
                      <p className="text-gray-400 leading-relaxed">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 px-6 bg-gray-800/50">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
              HOW IT WORKS
            </h2>
            <p className="text-gray-400 text-lg mb-16">
              Three paths to dominate the battlefield
            </p>

            <div className="grid md:grid-cols-3 gap-12">
              {/* For Clippers */}
              <div className="text-left space-y-6">
                <h3 className="text-2xl font-bold text-pink-500">
                  FOR CLIPPERS
                </h3>
                <div className="space-y-4">
                  {[
                    "Find trending streamer and missions",
                    "Create and submit viral clips",
                    "Earn rewards",
                  ].map((step, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-pink-500 text-white flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                      <span className="text-gray-400">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* For Streamers */}
              <div className="text-left space-y-6">
                <h3 className="text-2xl font-bold text-purple-400">
                  FOR STREAMERS
                </h3>
                <div className="space-y-4">
                  {[
                    "Connect your channels to Pumpfun and create missions",
                    "Stream and engage with your audience",
                    "Watch your content spread and earn fees",
                  ].map((step, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-purple-400 text-white flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                      <span className="text-gray-400">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Platform */}
              <div className="text-left space-y-6">
                <h3 className="text-2xl font-bold text-green-400">PLATFORM</h3>
                <div className="space-y-4">
                  {[
                    "Token buys fuel reach and visibility.",
                    "Bigger community support = stronger launch outcome.",
                    "Every contribution amplifies streams to new audiences.",
                  ].map((step, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-green-400 text-black flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                      <span className="text-gray-400">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Creator Fee Loop */}
        <section className="py-20 px-6 bg-gray-800/20">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4 text-white">
              $CLIP Creator Fee Loop
            </h2>
            <p className="text-gray-400 mb-12">
              Every fee compounds into more reach, more clips, more value.
            </p>

            <div className="flex justify-center items-center gap-8 mb-8 flex-wrap">
              <div className="text-center">
                <div className="text-3xl font-bold text-pink-500 mb-1">
                  $12,500
                </div>
                <div className="text-sm text-gray-400">Total Fees</div>
              </div>
              <ArrowRight className="text-gray-400" />
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-1">
                  $6,250
                </div>
                <div className="text-sm text-gray-400">To Streamers</div>
              </div>
              <ArrowRight className="text-gray-400" />
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-1">
                  $3,750
                </div>
                <div className="text-sm text-gray-400">To Clipper</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-400 mb-1"></div>
                <div className="text-sm text-gray-400">To Mission</div>
              </div>
            </div>

            <p className="text-sm text-gray-400">
              We take 0% Fees 0% allocation except running infra cost
            </p>
          </div>
        </section>

        {/* Live Leaderboards */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-3xl font-bold text-white">
                Live Leaderboards
              </h2>
              <Button
                variant="outline"
                className="rounded-full border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                View All →
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              {/* Top Clippers */}
              <div>
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-white">
                  <Scissors className="w-5 h-5 text-cyan-400" />
                  Top Clippers
                </h3>
                <div className="space-y-4">
                  {[
                    {
                      name: "@clipmaster",
                      earnings: "$1,225",
                      color: "text-pink-500",
                    },
                    {
                      name: "@viralking",
                      earnings: "$1,065",
                      color: "text-purple-400",
                    },
                    {
                      name: "@contentcreator",
                      earnings: "$945",
                      color: "text-cyan-400",
                    },
                  ].map((clipper, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center">
                          <span className="text-white text-sm">●</span>
                        </div>
                        <span className="text-white">{clipper.name}</span>
                      </div>
                      <span className={`font-bold ${clipper.color}`}>
                        {clipper.earnings}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top Streamers */}
              <div>
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-white">
                  <DollarSign className="w-5 h-5 text-green-400" />
                  Top Streamers
                </h3>
                <div className="space-y-4">
                  {[
                    {
                      name: "@pumpstreamer",
                      earnings: "$1,250",
                      color: "text-green-400",
                    },
                    {
                      name: "@cryptoking",
                      earnings: "$980",
                      color: "text-pink-500",
                    },
                    {
                      name: "@tokenmaster",
                      earnings: "$750",
                      color: "text-purple-400",
                    },
                  ].map((streamer, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-400 to-cyan-400 flex items-center justify-center">
                          <span className="text-white text-sm">●</span>
                        </div>
                        <span className="text-white">{streamer.name}</span>
                      </div>
                      <span className={`font-bold ${streamer.color}`}>
                        {streamer.earnings}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Success Stories */}
        <section className="py-20 px-6 bg-gray-800/20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4 text-white">
                Success Stories
              </h2>
              <p className="text-gray-400">
                Onboarded pump.fun streamers crushing it
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: "TokenKing",
                  period: "Last 30 days",
                  earnings: "$2,500",
                  story:
                    "Launched on pump.fun and immediately connected with CLIP. Now earning consistent fees from viral clips.",
                  color: "from-pink-500 to-purple-500",
                },
                {
                  name: "CryptoQueen",
                  period: "Last 30 days",
                  earnings: "$1,800",
                  story:
                    "Grew from 100 to 10K followers through strategic clip distribution and community building.",
                  color: "from-purple-500 to-cyan-400",
                },
                {
                  name: "PumpMaster",
                  period: "Last 30 days",
                  earnings: "$3,200",
                  story:
                    "Multiple viral clips led to massive token launches and sustainable creator economy.",
                  color: "from-cyan-400 to-green-400",
                },
              ].map((story, index) => (
                <Card
                  key={index}
                  className="bg-gray-800 border-gray-700 hover:border-gray-600 transition-colors"
                >
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-12 h-12 rounded-full bg-gradient-to-r ${story.color} flex items-center justify-center`}
                      >
                        <Star className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white">{story.name}</h4>
                        <p className="text-xs text-gray-400">{story.period}</p>
                      </div>
                    </div>

                    <div className="text-center py-4">
                      <div className="text-2xl font-bold text-pink-500 mb-1">
                        {story.earnings}
                      </div>
                      <div className="text-xs text-gray-400">Fees Earned</div>
                    </div>

                    <p className="text-sm text-gray-400 leading-relaxed">
                      {story.story}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Upcoming Launches */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-3xl font-bold text-white">
                Upcoming Launches
              </h2>
              <Button
                variant="outline"
                className="rounded-full border-pink-500 text-pink-500 hover:bg-pink-500/10"
              >
                View Calendar →
              </Button>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="bg-gray-800 border-gray-700 hover:border-gray-600 transition-all duration-300">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-2 text-pink-500">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm font-medium">Dec 20, 2024</span>
                  </div>

                  <h3 className="text-lg font-bold text-white">
                    $MOON Token Launch
                  </h3>

                  <div className="space-y-2">
                    <p className="text-sm text-white">2:00 PM EST</p>
                    <p className="text-sm text-gray-400">@moonmaster</p>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button
                      size="sm"
                      className="bg-pink-500 hover:bg-pink-600 text-white rounded-full px-4"
                    >
                      👥 Follow
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-pink-500 text-pink-500 hover:bg-pink-500/10 rounded-full px-4"
                    >
                      Set Reminder
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700 hover:border-gray-600 transition-all duration-300">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-2 text-purple-400">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm font-medium">Dec 22, 2024</span>
                  </div>

                  <h3 className="text-lg font-bold text-white">
                    $ROCKET Stream Event
                  </h3>

                  <div className="space-y-2">
                    <p className="text-sm text-white">6:00 PM EST</p>
                    <p className="text-sm text-gray-400">@rocketman</p>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button
                      size="sm"
                      className="bg-purple-500 hover:bg-purple-600 text-white rounded-full px-4"
                    >
                      👥 Follow
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-purple-500 text-purple-400 hover:bg-purple-500/10 rounded-full px-4"
                    >
                      Set Reminder
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700 hover:border-gray-600 transition-all duration-300">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-2 text-cyan-400">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm font-medium">Dec 25, 2024</span>
                  </div>

                  <h3 className="text-lg font-bold text-white">
                    $DIAMOND Launch Party
                  </h3>

                  <div className="space-y-2">
                    <p className="text-sm text-white">8:00 PM EST</p>
                    <p className="text-sm text-gray-400">@cryptoqueen</p>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button
                      size="sm"
                      className="bg-cyan-500 hover:bg-cyan-600 text-white rounded-full px-4"
                    >
                      👥 Follow
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-cyan-500 text-cyan-400 hover:bg-cyan-500/10 rounded-full px-4"
                    >
                      Set Reminder
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-20 px-6 bg-gradient-to-br from-pink-500/10 via-purple-500/10 to-cyan-400/10 rounded-t-3xl">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-4xl font-bold text-white">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Join the revolution where entertainment becomes finance. Choose
              your path and start earning today.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => setIsAuthModalOpen(true)}
                size="lg"
                className="rounded-full px-12 py-4 min-w-[220px] font-semibold text-lg bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-400 hover:to-pink-500 text-white shadow-2xl hover:shadow-pink-500/25 transition-all duration-300"
              >
                ▶ Start Clipping Now
              </Button>
              <Button
                onClick={() => setIsAuthModalOpen(true)}
                size="lg"
                className="rounded-full px-12 py-4 min-w-[220px] font-semibold text-lg bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-400 hover:to-purple-500 text-white shadow-2xl hover:shadow-purple-500/25 transition-all duration-300"
              >
                👥 Start Streaming
              </Button>
            </div>
          </div>
        </section>
      </div>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={() => {
          setIsAuthModalOpen(false);
        }}
      />
    </MainLayout>
  );
}
