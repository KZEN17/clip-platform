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

  // Mock current user - remove this when you have real auth
  const currentUser = {
    name: "zack.kargeen",
  };

  const stats = [
    { label: "Total Users", value: "45,678" },
    { label: "Earnings Paid", value: "$125,340" },
    { label: "Active Clips", value: "3,456" },
    { label: "Views", value: "2.1M" },
  ];

  const features = [
    {
      icon: Play,
      title: "Stream • Clip • Earn $",
      description:
        "Create viral clips from live streams and monetize based on views and engagement",
    },
    {
      icon: TrendingUp,
      title: "Loop Rewards & Grow",
      description:
        "Recycle hype, multiply rewards and grow your creator network",
    },
    {
      icon: DollarSign,
      title: "Entertainment Finance",
      description: "Turn entertainment into sustainable revenue for creators",
    },
  ];

  return (
    <MainLayout currentUser={currentUser}>
      <div className="min-h-screen">
        {/* Hero Section - Full Screen */}
        <section className="min-h-screen flex items-center justify-center px-6">
          <div className="text-center space-y-8 max-w-4xl mx-auto">
            <h1 className="text-6xl md:text-8xl font-bold leading-tight tracking-tight">
              <span className="text-gradient-rainbow">FROM TWITCH</span>
              <br />
              <span className="text-gradient-rainbow">TO RICH</span>
            </h1>

            {/* Decorative line with controller icon */}
            <div className="flex items-center justify-center gap-4 py-6">
              <div className="w-16 h-0.5 bg-gradient-to-r from-transparent to-primary"></div>
              <div className="w-8 h-8 bg-muted-foreground/20 rounded flex items-center justify-center">
                <span className="text-xs">🎮</span>
              </div>
              <div className="w-16 h-0.5 bg-gradient-to-r from-primary to-transparent"></div>
            </div>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Turn{" "}
              <span className="text-primary font-medium">entertainment</span>{" "}
              into finance. Connect{" "}
              <span className="text-success font-medium">streamers</span>,
              clippers, and agencies.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button
                onClick={() => setIsAuthModalOpen(true)}
                size="xl"
                className="rounded-full px-12 py-4 min-w-[280px] font-semibold text-lg bg-gradient-to-r from-primary to-pink-600 hover:from-primary/90 hover:to-pink-600/90 text-white shadow-2xl hover:shadow-primary/25 transition-all duration-300"
              >
                ▶ START CLIPPING NOW
              </Button>
              <Button
                onClick={() => setIsAuthModalOpen(true)}
                size="xl"
                className="rounded-full px-12 py-4 min-w-[280px] font-semibold text-lg bg-gradient-to-r from-secondary to-purple-600 hover:from-secondary/90 hover:to-purple-600/90 text-white shadow-2xl hover:shadow-secondary/25 transition-all duration-300"
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
              <h2 className="text-4xl font-bold mb-4">Platform Growth</h2>
              <p className="text-muted-foreground text-lg">
                Real numbers from our thriving creator economy
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center mb-20">
              {[
                {
                  label: "Clips Created",
                  value: "45,678",
                  color: "text-purple-400",
                },
                {
                  label: "Rewards Paid",
                  value: "$125,340",
                  color: "text-white",
                },
                {
                  label: "Active Creators",
                  value: "3,456",
                  color: "text-white",
                },
                { label: "Total Views", value: "2.1M", color: "text-white" },
              ].map((stat, index) => (
                <div key={index}>
                  <div className={`text-4xl font-bold ${stat.color} mb-2`}>
                    {stat.value}
                  </div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Feature Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-20">
              <Card className="bg-gradient-to-br from-pink-600/10 to-purple-600/10 border-pink-600/20 hover:border-pink-600/40 transition-all duration-300">
                <CardContent className="p-8 text-center space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center">
                    <Play className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    Stream • Clip • Earn $
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Create viral clips from live streams and earn rewards based
                    on views and engagement
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-cyan-600/10 to-green-600/10 border-cyan-600/20 hover:border-cyan-600/40 transition-all duration-300">
                <CardContent className="p-8 text-center space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-cyan-500 to-green-500 flex items-center justify-center">
                    <TrendingUp className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-cyan-400">
                    Loop Rewards & Grow
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Recycle hype, multiply rewards
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-600/10 to-purple-600/10 border-green-600/20 hover:border-green-600/40 transition-all duration-300">
                <CardContent className="p-8 text-center space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-green-500 to-purple-500 flex items-center justify-center">
                    <DollarSign className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-green-400">
                    Entertainment Finance
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Turn entertainment into sustainable income as innovative
                    creator
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-5xl font-bold mb-4 text-gradient-rainbow">
              HOW IT WORKS
            </h2>
            <p className="text-muted-foreground text-lg mb-16">
              Three paths to dominate the battlefield
            </p>

            <div className="grid md:grid-cols-3 gap-12">
              {/* For Clippers */}
              <div className="text-left space-y-6">
                <h3 className="text-2xl font-bold text-primary">
                  FOR CLIPPERS
                </h3>
                <div className="space-y-4">
                  {[
                    "Find trending streamer and missions",
                    "Create and submit viral clips",
                    "Earn rewards",
                  ].map((step, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                      <span className="text-muted-foreground">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* For Streamers */}
              <div className="text-left space-y-6">
                <h3 className="text-2xl font-bold text-secondary">
                  FOR STREAMERS
                </h3>
                <div className="space-y-4">
                  {[
                    "Connect your channels to Pumpfun and create missions",
                    "Stream and engage with your audience",
                    "Watch your content spread and earn fees",
                  ].map((step, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-secondary text-white flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                      <span className="text-muted-foreground">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Platform */}
              <div className="text-left space-y-6">
                <h3 className="text-2xl font-bold text-success">PLATFORM</h3>
                <div className="space-y-4">
                  {[
                    "Token buys fuel reach and visibility.",
                    "Bigger community support = stronger launch outcome.",
                    "Every contribution amplifies streams to new audiences.",
                  ].map((step, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-success text-success-foreground flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                      <span className="text-muted-foreground">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Creator Fee Loop */}
        <section className="py-20 px-6 bg-card/20">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">$CLIP Creator Fee Loop</h2>
            <p className="text-muted-foreground mb-12">
              Every fee compounds into more reach, more clips, more value.
            </p>

            <div className="flex justify-center items-center gap-8 mb-8 flex-wrap">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">
                  $12,500
                </div>
                <div className="text-sm text-muted-foreground">Total Fees</div>
              </div>
              <ArrowRight className="text-muted-foreground" />
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary mb-1">
                  $6,250
                </div>
                <div className="text-sm text-muted-foreground">
                  To Streamers
                </div>
              </div>
              <ArrowRight className="text-muted-foreground" />
              <div className="text-center">
                <div className="text-3xl font-bold text-success mb-1">
                  $3,750
                </div>
                <div className="text-sm text-muted-foreground">To Clipper</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent mb-1"></div>
                <div className="text-sm text-muted-foreground">To Mission</div>
              </div>
            </div>

            <p className="text-sm text-muted-foreground">
              We take 0% Fees 0% allocation except running infra cost
            </p>
          </div>
        </section>

        {/* Live Leaderboards */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-3xl font-bold">Live Leaderboards</h2>
              <Button variant="outline" className="rounded-full">
                View All →
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              {/* Top Clippers */}
              <div>
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <Scissors className="w-5 h-5 text-cyan-400" />
                  Top Clippers
                </h3>
                <div className="space-y-4">
                  {[
                    { name: "@clipmaster", earnings: "$1,225" },
                    { name: "@viralking", earnings: "$1,065" },
                    { name: "@contentcreator", earnings: "$945" },
                  ].map((clipper, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center">
                          <span className="text-white text-sm">●</span>
                        </div>
                        <span className="text-white">{clipper.name}</span>
                      </div>
                      <span className="font-bold">{clipper.earnings}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top Streamers */}
              <div>
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-success" />
                  Top Streamers
                </h3>
                <div className="space-y-4">
                  {[
                    { name: "@pumpstreamer", earnings: "$1,250" },
                    { name: "@cryptoking", earnings: "$980" },
                    { name: "@tokenmaster", earnings: "$750" },
                  ].map((streamer, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center">
                          <span className="text-white text-sm">●</span>
                        </div>
                        <span className="text-white">{streamer.name}</span>
                      </div>
                      <span className="font-bold">{streamer.earnings}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Success Stories */}
        <section className="py-20 px-6 bg-card/20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Success Stories</h2>
              <p className="text-muted-foreground">
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
                },
                {
                  name: "CryptoQueen",
                  period: "Last 30 days",
                  earnings: "$1,800",
                  story:
                    "Grew from 100 to 10K followers through strategic clip distribution and community building.",
                },
                {
                  name: "PumpMaster",
                  period: "Last 30 days",
                  earnings: "$3,200",
                  story:
                    "Multiple viral clips led to massive token launches and sustainable creator economy.",
                },
              ].map((story, index) => (
                <Card key={index} className="bg-card/30 border-border/50">
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                        <Star className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white">{story.name}</h4>
                        <p className="text-xs text-muted-foreground">
                          {story.period}
                        </p>
                      </div>
                    </div>

                    <div className="text-center py-4">
                      <div className="text-2xl font-bold text-primary mb-1">
                        {story.earnings}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Fees Earned
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground leading-relaxed">
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
                className="rounded-full border-primary text-primary hover:bg-primary/10"
              >
                View Calendar →
              </Button>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="bg-card/30 border-border/50 hover:border-border transition-all duration-300">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-2 text-primary">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm font-medium">Dec 20, 2024</span>
                  </div>

                  <h3 className="text-lg font-bold text-white">
                    $MOON Token Launch
                  </h3>

                  <div className="space-y-2">
                    <p className="text-sm text-white">2:00 PM EST</p>
                    <p className="text-sm text-muted-foreground">@moonmaster</p>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button
                      size="sm"
                      className="bg-primary hover:bg-primary/90 text-white rounded-full px-4"
                    >
                      👥 Follow
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-primary text-primary hover:bg-primary/10 rounded-full px-4"
                    >
                      Set Reminder
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/30 border-border/50 hover:border-border transition-all duration-300">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-2 text-primary">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm font-medium">Dec 22, 2024</span>
                  </div>

                  <h3 className="text-lg font-bold text-white">
                    $ROCKET Stream Event
                  </h3>

                  <div className="space-y-2">
                    <p className="text-sm text-white">6:00 PM EST</p>
                    <p className="text-sm text-muted-foreground">@rocketman</p>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button
                      size="sm"
                      className="bg-primary hover:bg-primary/90 text-white rounded-full px-4"
                    >
                      👥 Follow
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-primary text-primary hover:bg-primary/10 rounded-full px-4"
                    >
                      Set Reminder
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/30 border-border/50 hover:border-border transition-all duration-300">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-2 text-primary">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm font-medium">Dec 25, 2024</span>
                  </div>

                  <h3 className="text-lg font-bold text-white">
                    $DIAMOND Launch Party
                  </h3>

                  <div className="space-y-2">
                    <p className="text-sm text-white">8:00 PM EST</p>
                    <p className="text-sm text-muted-foreground">
                      @cryptoqueen
                    </p>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button
                      size="sm"
                      className="bg-primary hover:bg-primary/90 text-white rounded-full px-4"
                    >
                      👥 Follow
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-primary text-primary hover:bg-primary/10 rounded-full px-4"
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
        <section className="py-20 px-6 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 rounded-t-3xl">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-4xl font-bold text-white">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join the revolution where entertainment becomes finance. Choose
              your path and start earning today.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => setIsAuthModalOpen(true)}
                size="xl"
                className="rounded-full px-12 py-4 min-w-[220px] font-semibold text-lg bg-gradient-to-r from-primary to-pink-600 hover:from-primary/90 hover:to-pink-600/90 text-white shadow-2xl hover:shadow-primary/25 transition-all duration-300"
              >
                ▶ Start Clipping Now
              </Button>
              <Button
                onClick={() => setIsAuthModalOpen(true)}
                size="xl"
                className="rounded-full px-12 py-4 min-w-[220px] font-semibold text-lg bg-gradient-to-r from-secondary to-purple-600 hover:from-secondary/90 hover:to-purple-600/90 text-white shadow-2xl hover:shadow-secondary/25 transition-all duration-300"
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
          // TODO: Navigate to role selection or dashboard
        }}
      />
    </MainLayout>
  );
}
