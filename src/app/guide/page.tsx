"use client";

// import { CampaignLauncher } from "@/components/campaign/CampaignLauncher";
import { MainLayout } from "@/components/layout/MainLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowRight,
  BookOpen,
  CheckCircle,
  FileText,
  Link,
  Settings,
  Star,
  Upload,
  Video,
  Wallet,
} from "lucide-react";
import { useState } from "react";

export default function GuidePage() {
  const currentUser = {
    name: "zack.kargeen",
  };

  const [isLauncherOpen, setIsLauncherOpen] = useState(false);

  const guideSteps = [
    {
      step: 1,
      title: "Sign Up & Wallet",
      icon: Wallet,
      description: "Visit pump.fun and create a wallet with secure setup.",
      details: [
        "Visit pump.fun (app or browser)",
        "Create a wallet (Phantom, Gmail, Twitter login)",
        "Never share your seed phrase",
      ],
    },
    {
      step: 2,
      title: "Token Prep",
      icon: FileText,
      description: "Prepare all materials and content for your token launch.",
      details: [
        "Have your logo & banner ready",
        "Prepare socials (Twitter is critical)",
        "Draft a pinned launch post with token contract",
        "Inform your audience about the drop",
      ],
    },
    {
      step: 3,
      title: "Launch Timing",
      icon: CheckCircle,
      description: "Strategic timing and transparency for successful launch.",
      details: [
        "Best drop window: 3–9 PM UTC",
        "Announce goals & fee usage (important for trust)",
        "Check examples like $KIND or $FTP",
      ],
    },
    {
      step: 4,
      title: "Stream Setup",
      icon: Video,
      description: "Configure streaming equipment and get ready to go live.",
      details: [
        "Mobile: just your phone (battery + powerbank)",
        "PC: OBS recommended (overlay ready)",
        "After token creation you'll get RTMP URL + Stream Key",
      ],
    },
    {
      step: 5,
      title: "Test & Go Live",
      icon: Upload,
      description:
        "Final preparations and launch execution for maximum impact.",
      details: [
        "Run a test token if needed",
        "First 1, 5, 10, 15, 30 minutes are crucial—interact actively",
        "Drop your CA + pinned post fast",
      ],
    },
    {
      step: 6,
      title: "Build Trust",
      icon: Settings,
      description: "Engage with your community and build credibility.",
      details: [
        "Engage first supporters (they take the risk)",
        "Moderate chat (friends/community help)",
        "Focus on instant action & entertainment",
      ],
    },
    {
      step: 7,
      title: "Growth & Collab",
      icon: Link,
      description:
        "Scale your reach through collaboration and content distribution.",
      details: [
        "Recycle content across socials",
        "Collaborate with other streamers & clippers",
        "Build community energy = stronger trust",
      ],
    },
    {
      step: 8,
      title: "Scale Up",
      icon: Star,
      description:
        "Build sustainable growth and get featured on CLIP platform.",
      details: [
        "Create clipping campaigns with creator fees",
        "Push for $CLIP featuring (success stories)",
        "Stay consistent → attract repeat buyers",
      ],
    },
  ];

  return (
    <MainLayout currentUser={currentUser}>
      <div className="min-h-screen bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="space-y-8">
            {/* Header */}
            <div className="text-center space-y-4">
              <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
                Launch Guide
              </h1>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Your complete guide to launching on pump.fun and connecting with
                CLIP
              </p>
            </div>

            {/* Overview */}
            <Card className="bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-cyan-400/10 border-pink-500/20">
              <CardContent className="p-8">
                <div className="text-center space-y-4">
                  <div className="flex items-center justify-center space-x-2">
                    <BookOpen className="w-8 h-8 text-pink-500" />
                    <h2 className="text-3xl font-bold text-white">
                      Quick Start Overview
                    </h2>
                  </div>
                  <p className="text-lg text-gray-400 max-w-3xl mx-auto">
                    This comprehensive guide will take you from token creation
                    to viral content distribution. Follow these 8 steps to
                    maximize your launch success and tap into CLIP&apos;s
                    creator economy.
                  </p>
                  <div className="grid md:grid-cols-3 gap-6 mt-8">
                    <div className="text-center space-y-2">
                      <div className="text-3xl font-bold text-pink-500">
                        15-30 min
                      </div>
                      <div className="text-sm text-gray-400">Setup Time</div>
                    </div>
                    <div className="text-center space-y-2">
                      <div className="text-3xl font-bold text-purple-400">
                        8 steps
                      </div>
                      <div className="text-sm text-gray-400">To Complete</div>
                    </div>
                    <div className="text-center space-y-2">
                      <div className="text-3xl font-bold text-cyan-400">
                        ∞ potential
                      </div>
                      <div className="text-sm text-gray-400">Earnings</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Step-by-Step Guide */}
            <section className="space-y-6">
              <h2 className="text-3xl font-bold text-center text-white">
                Step-by-Step Guide
              </h2>

              <div className="space-y-6">
                {guideSteps.map((step, index) => (
                  <Card
                    key={step.step}
                    className="bg-gray-800 border-gray-700 hover:border-gray-600 transition-all duration-300 hover:shadow-lg"
                  >
                    <CardHeader>
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl flex items-center justify-center">
                            <step.icon className="w-6 h-6 text-white" />
                          </div>
                        </div>
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center space-x-2">
                            <Badge className="bg-purple-500 text-white">
                              Step {step.step}
                            </Badge>
                            <CardTitle className="text-xl text-white">
                              {step.title}
                            </CardTitle>
                          </div>
                          <p className="text-gray-400">{step.description}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="ml-16">
                        <ul className="space-y-2">
                          {step.details.map((detail, detailIndex) => (
                            <li
                              key={detailIndex}
                              className="flex items-start space-x-2"
                            >
                              <CheckCircle className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-gray-400">
                                {detail}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Pro Tips */}
            <section className="space-y-6">
              <h2 className="text-3xl font-bold text-center text-white">
                Pro Tips for Success
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-pink-500/20 bg-pink-500/5 bg-gray-800">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-white">
                      <Star className="w-5 h-5 text-pink-500" />
                      <span>Content Strategy</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start space-x-2">
                        <ArrowRight className="w-4 h-4 text-pink-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300">
                          Plan 3-5 &quot;clip-worthy&quot; moments per stream
                        </span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <ArrowRight className="w-4 h-4 text-pink-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300">
                          Coordinate with CLIP team for optimal timing
                        </span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <ArrowRight className="w-4 h-4 text-pink-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300">
                          Engage authentically with your audience
                        </span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <ArrowRight className="w-4 h-4 text-pink-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300">
                          React dramatically to token price movements
                        </span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-purple-400/20 bg-purple-400/5 bg-gray-800">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-white">
                      <Star className="w-5 h-5 text-purple-400" />
                      <span>Technical Setup</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start space-x-2">
                        <ArrowRight className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300">
                          Test stream quality before launch event
                        </span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <ArrowRight className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300">
                          Set up price tracking overlays
                        </span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <ArrowRight className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300">
                          Configure donation/sub alerts
                        </span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <ArrowRight className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300">
                          Have backup streaming setup ready
                        </span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* CTA Section */}
            <section className="bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-cyan-400/10 rounded-xl p-8">
              <div className="text-center space-y-6">
                <h2 className="text-3xl font-bold text-white">
                  Ready to Launch?
                </h2>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                  Follow this guide and join the ranks of successful pump.fun
                  streamers earning through CLIP&apos;s ecosystem.
                </p>
                <div className="flex justify-center gap-4">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-8 py-3"
                    onClick={() => (window.location.href = "/calendar")}
                  >
                    Start Your Launch
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-pink-500 text-pink-500 hover:bg-pink-500/10 px-8 py-3"
                    onClick={() => setIsLauncherOpen(true)}
                  >
                    Create Campaign
                  </Button>
                </div>
              </div>
            </section>
          </div>

          {/* Campaign Launcher Modal */}
          {/* <CampaignLauncher
            isOpen={isLauncherOpen}
            onClose={() => setIsLauncherOpen(false)}
            onSuccess={() => {
              // Handle success
              console.log("Campaign created successfully");
            }}
          /> */}
        </div>
      </div>
    </MainLayout>
  );
}
