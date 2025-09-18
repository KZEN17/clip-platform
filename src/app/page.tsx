"use client";

import { AuthModal } from "@/components/auth/AuthModal";
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

  const stats = [
    { label: "Total Users", value: "45,678", color: "text-pink" },
    { label: "Earnings Paid", value: "$125,340", color: "text-green" },
    { label: "Active Clips", value: "3,456", color: "text-cyan" },
    { label: "Views", value: "2.1M", color: "text-purple" },
  ];

  const features = [
    {
      icon: Play,
      title: "Stream • Clip • Earn $",
      description:
        "Create viral clips from live streams and monetize based on views and engagement",
      color: "from-pink to-purple",
    },
    {
      icon: TrendingUp,
      title: "Loop Rewards & Grow",
      description:
        "Recycle hype, multiply rewards and grow your creator network",
      color: "from-cyan to-green",
    },
    {
      icon: DollarSign,
      title: "Entertainment Finance",
      description: "Turn entertainment into sustainable revenue for creators",
      color: "from-purple to-cyan",
    },
  ];

  const clipperSteps = [
    "Find trending streamers and highlights",
    "Create and submit viral clips",
    "Earn rewards",
  ];

  const streamerSteps = [
    "Connect your channels to platform and community",
    "Stream and engage with your audience",
    "Watch your content spread and earn",
  ];

  const platformSteps = [
    "Token hype fuel reach and visibility",
    "Bigger community support = stronger shared exposure",
    "Every contribution amplifies revenue to new audiences",
  ];

  const successStories = [
    {
      name: "TakeKing",
      role: "Top Clipper",
      earnings: "$2,500",
      period: "This Year",
      story:
        "Late hits of guys toe and immediately watched as they did the exact same thing from the exact same tier.",
    },
    {
      name: "CryptoQueen",
      role: "Top Streamer",
      earnings: "$1,800",
      period: "This Month",
      story:
        "Went from 150 to 3K followers through strategic clipper marketing building.",
    },
    {
      name: "PumpMaster",
      role: "Top Clipper",
      earnings: "$3,200",
      period: "Total Earned",
      story:
        "We asked clippers to help support their top clients and it's predictable double down-based.",
    },
  ];

  const upcomingLaunches = [
    {
      date: "Dec 20, 2024",
      title: "$MGON Token Launch",
      time: "3:00 PM EST",
      category: "STREAMING",
    },
    {
      date: "Jan 02, 2025",
      title: "$TOXNET Stream Event",
      time: "7:00 PM EST",
      category: "COMMUNITY",
    },
    {
      date: "Jan 25, 2025",
      title: "$DIAMOND Launch Party",
      time: "9:00 PM EST",
      category: "STREAMING",
    },
  ];

  const leaderboardData = {
    clippers: [
      { name: "@pumpistar", earnings: "$1,223" },
      { name: "@creftg", earnings: "$1,004" },
      { name: "@cryptomanbeaur", earnings: "$892" },
    ],
    streamers: [
      { name: "@pumpmykramp", earnings: "$3,265" },
      { name: "@kw", earnings: "$942" },
      { name: "@streamstein", earnings: "$759" },
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Scissors className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold text-gradient-rainbow">
              CLIP
            </span>
          </div>

          <Button
            onClick={() => setIsAuthModalOpen(true)}
            variant="gradient"
            size="lg"
            className="rounded-full px-6"
          >
            Sign In
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center space-y-8">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            <span className="text-gradient-rainbow">FROM TWITCH</span>
            <br />
            <span className="text-gradient-rainbow">TO RICH</span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Turn{" "}
            <span className="text-primary font-semibold">entertainment</span>{" "}
            into finance. Connect{" "}
            <span className="text-secondary font-semibold">streamers</span>,{" "}
            <span className="text-accent font-semibold">clippers</span>, and{" "}
            <span className="text-success font-semibold">agencies</span>.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => setIsAuthModalOpen(true)}
              variant="gradient"
              size="xl"
              className="rounded-full px-8 min-w-[200px] font-semibold"
            >
              START CLIPPING NOW
            </Button>
            <Button
              onClick={() => setIsAuthModalOpen(true)}
              variant="outline"
              size="xl"
              className="rounded-full px-8 min-w-[200px] border-secondary text-secondary hover:bg-secondary/10"
            >
              START STREAMING NOW
            </Button>
          </div>
        </div>
      </section>

      {/* Platform Growth Stats */}
      <section className="py-16 border-t border-border">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">
            Platform Growth
          </h2>
          <p className="text-muted-foreground text-center mb-12">
            Real numbers from our thriving creator economy
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className={`text-3xl font-bold ${stat.color} mb-2`}>
                  {stat.value}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={index}
                  className="bg-card/50 border-border hover:shadow-glow transition-all duration-300"
                >
                  <CardContent className="p-6 text-center space-y-4">
                    <div
                      className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center`}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold">{feature.title}</h3>
                    <p className="text-muted-foreground">
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
      <section className="py-16 bg-card/20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4 text-gradient-rainbow">
            HOW IT WORKS
          </h2>
          <p className="text-center text-muted-foreground mb-16">
            Three paths to dominate the battlefield
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {/* For Clippers */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-primary flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                  1
                </div>
                FOR CLIPPERS
              </h3>
              {clipperSteps.map((step, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mt-1">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </div>
                  <span className="text-muted-foreground">{step}</span>
                </div>
              ))}
            </div>

            {/* For Streamers */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-secondary flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center text-sm font-bold">
                  2
                </div>
                FOR STREAMERS
              </h3>
              {streamerSteps.map((step, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center mt-1">
                    <div className="w-2 h-2 rounded-full bg-secondary" />
                  </div>
                  <span className="text-muted-foreground">{step}</span>
                </div>
              ))}
            </div>

            {/* Platform */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-success flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-success text-success-foreground flex items-center justify-center text-sm font-bold">
                  3
                </div>
                PLATFORM
              </h3>
              {platformSteps.map((step, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-success/20 flex items-center justify-center mt-1">
                    <div className="w-2 h-2 rounded-full bg-success" />
                  </div>
                  <span className="text-muted-foreground">{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Creator Fee Loop */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">SCLIP Creator Fee Loop</h2>
          <p className="text-muted-foreground mb-8">
            Every fee rewarded, earn more reach, more ape, more value.
          </p>

          <div className="flex justify-center items-center gap-8 mb-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-1">
                $12,500
              </div>
              <div className="text-sm text-muted-foreground">Total Fees</div>
            </div>
            <ArrowRight className="text-muted-foreground" />
            <div className="text-center">
              <div className="text-2xl font-bold text-secondary mb-1">
                $6,250
              </div>
              <div className="text-sm text-muted-foreground">To Streamers</div>
            </div>
            <ArrowRight className="text-muted-foreground" />
            <div className="text-center">
              <div className="text-2xl font-bold text-success mb-1">$3,750</div>
              <div className="text-sm text-muted-foreground">To Clippers</div>
            </div>
            <ArrowRight className="text-muted-foreground" />
            <div className="text-center">
              <div className="text-2xl font-bold text-accent mb-1">$2,500</div>
              <div className="text-sm text-muted-foreground">To Platform</div>
            </div>
          </div>

          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            We take 0% upfront. 20% fees on clippable accepted content using a
            50% loop.
          </p>
        </div>
      </section>

      {/* Live Leaderboards */}
      <section className="py-16 bg-card/20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Live Leaderboards
          </h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Top Clippers */}
            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Scissors className="w-5 h-5 text-primary" />
                  Top Clippers
                </h3>
                <div className="space-y-3">
                  {leaderboardData.clippers.map((clipper, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between py-2"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-lg font-bold text-muted-foreground">
                          {index + 1}
                        </span>
                        <span className="font-medium">{clipper.name}</span>
                      </div>
                      <span className="font-bold text-success">
                        {clipper.earnings}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top Streamers */}
            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Play className="w-5 h-5 text-secondary" />
                  Top Streamers
                </h3>
                <div className="space-y-3">
                  {leaderboardData.streamers.map((streamer, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between py-2"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-lg font-bold text-muted-foreground">
                          {index + 1}
                        </span>
                        <span className="font-medium">{streamer.name}</span>
                      </div>
                      <span className="font-bold text-success">
                        {streamer.earnings}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">
            Success Stories
          </h2>
          <p className="text-center text-muted-foreground mb-12">
            Outstanding pump-fun streamers crushing it
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <Card key={index} className="bg-card border-border">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center">
                      <Star className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold">{story.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {story.role}
                      </p>
                    </div>
                  </div>

                  <div className="text-center py-4">
                    <div className="text-2xl font-bold text-success mb-1">
                      {story.earnings}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {story.period}
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
      <section className="py-16 bg-card/20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Upcoming Launches</h2>
            <Button variant="outline" className="rounded-full">
              View Calendar
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {upcomingLaunches.map((launch, index) => (
              <Card key={index} className="bg-card border-border">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-primary" />
                    <span className="text-sm font-medium">{launch.date}</span>
                  </div>

                  <h4 className="text-lg font-bold">{launch.title}</h4>
                  <p className="text-muted-foreground">{launch.time}</p>

                  <div className="flex justify-between items-center pt-2">
                    <span className="text-xs px-3 py-1 bg-primary/10 text-primary rounded-full font-medium">
                      {launch.category}
                    </span>
                    <Button size="sm" variant="gradient">
                      Join Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10">
        <div className="container mx-auto px-4 text-center space-y-8">
          <h2 className="text-4xl font-bold">Ready to Get Started?</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join the revolution where entertainment becomes finance. Choose your
            path and start earning today.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => setIsAuthModalOpen(true)}
              variant="gradient"
              size="xl"
              className="rounded-full px-8 min-w-[180px]"
            >
              Start Clipping Now
            </Button>
            <Button
              onClick={() => setIsAuthModalOpen(true)}
              variant="outline"
              size="xl"
              className="rounded-full px-8 min-w-[180px] border-secondary text-secondary hover:bg-secondary/10"
            >
              Start Streaming
            </Button>
          </div>
        </div>
      </section>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={() => {
          setIsAuthModalOpen(false);
          // TODO: Navigate to role selection or dashboard
        }}
      />
    </div>
  );
}
