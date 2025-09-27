"use client";

import { AuthModal } from "@/components/auth/AuthModal";
import { LaunchCreator } from "@/components/launch/LaunchCreator";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
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
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signup");
  const [isLaunchCreatorOpen, setIsLaunchCreatorOpen] = useState(false);
  const { user } = useAuth();

  const stats = [
    { label: "Total Users", value: "45,678", color: "text-teal-400" },
    { label: "Earnings Paid", value: "$125,340", color: "text-emerald-400" },
    { label: "Active Clips", value: "3,456", color: "text-cyan-400" },
    { label: "Views", value: "2.1M", color: "text-green-400" },
  ];

  const features = [
    {
      icon: Play,
      title: "Stream • Clip • Earn $",
      description:
        "Create viral clips from live streams and monetize based on views and engagement",
      color: "text-teal-400",
      bgColor: "from-teal-400/10 to-teal-600/10",
      borderColor: "border-teal-400/20",
    },
    {
      icon: TrendingUp,
      title: "Loop Rewards & Grow",
      description:
        "Recycle hype, multiply rewards and grow your creator network",
      color: "text-emerald-400",
      bgColor: "from-emerald-400/10 to-green-500/10",
      borderColor: "border-emerald-400/20",
    },
    {
      icon: DollarSign,
      title: "Entertainment Finance",
      description:
        "Turn entertainment into sustainable revenue as innovative creator",
      color: "text-cyan-400",
      bgColor: "from-cyan-400/10 to-teal-500/10",
      borderColor: "border-cyan-400/20",
    },
  ];

  const handleStartClipping = () => {
    if (user) {
      window.location.href = "/rewards";
    } else {
      setAuthMode("signup");
      setIsAuthModalOpen(true);
    }
  };

  const handleStartStreaming = () => {
    if (user) {
      setIsLaunchCreatorOpen(true);
    } else {
      setAuthMode("signup");
      setIsAuthModalOpen(true);
    }
  };

  return (
    <MainLayout>
      <div className="min-h-screen bg-black">
        <style
          dangerouslySetInnerHTML={{
            __html: `
            @keyframes float {
              0%, 100% {
                transform: translateY(0px) translateX(0px);
              }
              33% {
                transform: translateY(-20px) translateX(10px);
              }
              66% {
                transform: translateY(10px) translateX(-10px);
              }
            }
            
            @keyframes pulse-glow {
              0%, 100% {
                filter: brightness(1) drop-shadow(0 0 10px rgba(20, 184, 166, 0.3));
              }
              50% {
                filter: brightness(1.1) drop-shadow(0 0 20px rgba(20, 184, 166, 0.6));
              }
            }
            
            @keyframes gradient-shift {
              0% {
                background-position: 0% 50%;
              }
              25% {
                background-position: 100% 50%;
              }
              50% {
                background-position: 200% 50%;
              }
              75% {
                background-position: 300% 50%;
              }
              100% {
                background-position: 400% 50%;
              }
            }
            
            @keyframes color-wave {
              0% {
                background: linear-gradient(45deg, #14B8A6, #2DD4BF, #67E8F9, #10B981, #059669);
                background-size: 400% 400%;
                background-position: 0% 50%;
              }
              25% {
                background: linear-gradient(45deg, #2DD4BF, #67E8F9, #14B8A6, #059669, #10B981);
                background-size: 400% 400%;
                background-position: 100% 50%;
              }
              50% {
                background: linear-gradient(45deg, #67E8F9, #14B8A6, #059669, #2DD4BF, #10B981);
                background-size: 400% 400%;
                background-position: 200% 50%;
              }
              75% {
                background: linear-gradient(45deg, #10B981, #059669, #2DD4BF, #67E8F9, #14B8A6);
                background-size: 400% 400%;
                background-position: 300% 50%;
              }
              100% {
                background: linear-gradient(45deg, #059669, #10B981, #67E8F9, #14B8A6, #2DD4BF);
                background-size: 400% 400%;
                background-position: 400% 50%;
              }
            }
            
            @keyframes blob-move {
              0% {
                transform: translate(-50%, -50%) scale(1);
                left: 20%;
                top: 30%;
              }
              25% {
                transform: translate(-50%, -50%) scale(1.2);
                left: 80%;
                top: 20%;
              }
              50% {
                transform: translate(-50%, -50%) scale(0.8);
                left: 85%;
                top: 70%;
              }
              75% {
                transform: translate(-50%, -50%) scale(1.1);
                left: 15%;
                top: 80%;
              }
              100% {
                transform: translate(-50%, -50%) scale(1);
                left: 20%;
                top: 30%;
              }
            }
            
            @keyframes blob-move-secondary {
              0% {
                transform: translate(-50%, -50%) scale(1);
                left: 70%;
                top: 60%;
              }
              33% {
                transform: translate(-50%, -50%) scale(1.3);
                left: 30%;
                top: 20%;
              }
              66% {
                transform: translate(-50%, -50%) scale(0.9);
                left: 10%;
                top: 50%;
              }
              100% {
                transform: translate(-50%, -50%) scale(1);
                left: 70%;
                top: 60%;
              }
            }
            
            @keyframes small-blob-1 {
              0% {
                transform: translate(-50%, -50%) scale(1);
                left: 10%;
                top: 40%;
                opacity: 0.6;
              }
              30% {
                transform: translate(-50%, -50%) scale(1.5);
                left: 60%;
                top: 30%;
                opacity: 0.8;
              }
              60% {
                transform: translate(-50%, -50%) scale(0.7);
                left: 90%;
                top: 60%;
                opacity: 0.4;
              }
              100% {
                transform: translate(-50%, -50%) scale(1);
                left: 10%;
                top: 40%;
                opacity: 0.6;
              }
            }
            
            @keyframes small-blob-2 {
              0% {
                transform: translate(-50%, -50%) scale(1);
                left: 90%;
                top: 80%;
                opacity: 0.7;
              }
              40% {
                transform: translate(-50%, -50%) scale(1.2);
                left: 40%;
                top: 70%;
                opacity: 0.9;
              }
              80% {
                transform: translate(-50%, -50%) scale(0.8);
                left: 5%;
                top: 10%;
                opacity: 0.5;
              }
              100% {
                transform: translate(-50%, -50%) scale(1);
                left: 90%;
                top: 80%;
                opacity: 0.7;
              }
            }
            
            @keyframes accent-blob-1 {
              0% {
                transform: translate(-50%, -50%) scale(1) rotate(0deg);
                left: 25%;
                top: 15%;
                opacity: 0.95;
              }
              35% {
                transform: translate(-50%, -50%) scale(1.4) rotate(120deg);
                left: 75%;
                top: 45%;
                opacity: 0.8;
              }
              70% {
                transform: translate(-50%, -50%) scale(0.9) rotate(240deg);
                left: 50%;
                top: 85%;
                opacity: 0.9;
              }
              100% {
                transform: translate(-50%, -50%) scale(1) rotate(360deg);
                left: 25%;
                top: 15%;
                opacity: 0.95;
              }
            }
            
            @keyframes accent-blob-2 {
              0% {
                transform: translate(-50%, -50%) scale(1.1) rotate(0deg);
                left: 80%;
                top: 25%;
                opacity: 0.85;
              }
              45% {
                transform: translate(-50%, -50%) scale(0.7) rotate(180deg);
                left: 20%;
                top: 65%;
                opacity: 1;
              }
              90% {
                transform: translate(-50%, -50%) scale(1.3) rotate(300deg);
                left: 60%;
                top: 10%;
                opacity: 0.7;
              }
              100% {
                transform: translate(-50%, -50%) scale(1.1) rotate(360deg);
                left: 80%;
                top: 25%;
                opacity: 0.85;
              }
            }
          `,
          }}
        />
        {/* Hero Section - Compact */}
        <section className="py-24 px-6 flex items-center justify-center relative overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0 opacity-60">
            {/* Main Neon Blob - Large moving blob */}
            <div
              className="absolute w-[500px] h-[500px] rounded-full blur-3xl opacity-80"
              style={{
                background:
                  "radial-gradient(circle, rgba(20,184,166,0.9) 0%, rgba(45,212,191,0.8) 25%, rgba(103,232,249,0.7) 50%, rgba(16,185,129,0.5) 75%, transparent 100%)",
                animation: "blob-move 20s ease-in-out infinite",
                filter: "blur(60px)",
                boxShadow:
                  "0 0 100px rgba(20,184,166,0.6), 0 0 200px rgba(45,212,191,0.4)",
              }}
            ></div>

            {/* Secondary Neon Blob - Medium size */}
            <div
              className="absolute w-80 h-80 rounded-full blur-2xl opacity-90"
              style={{
                background:
                  "radial-gradient(circle, rgba(16,185,129,0.9) 0%, rgba(20,184,166,0.8) 30%, rgba(45,212,191,0.6) 60%, transparent 100%)",
                animation: "blob-move-secondary 15s ease-in-out infinite",
                filter: "blur(50px)",
                boxShadow:
                  "0 0 80px rgba(16,185,129,0.7), 0 0 160px rgba(20,184,166,0.5)",
              }}
            ></div>

            {/* Small interactive blobs */}
            <div
              className="absolute w-48 h-48 rounded-full blur-xl opacity-85"
              style={{
                background:
                  "radial-gradient(circle, rgba(45,212,191,1) 0%, rgba(103,232,249,0.9) 40%, rgba(20,184,166,0.6) 70%, transparent 100%)",
                animation: "small-blob-1 12s ease-in-out infinite",
                filter: "blur(35px)",
                boxShadow:
                  "0 0 60px rgba(45,212,191,0.8), 0 0 120px rgba(103,232,249,0.4)",
              }}
            ></div>

            <div
              className="absolute w-36 h-36 rounded-full blur-lg opacity-90"
              style={{
                background:
                  "radial-gradient(circle, rgba(103,232,249,1) 0%, rgba(20,184,166,0.9) 50%, rgba(45,212,191,0.6) 80%, transparent 100%)",
                animation: "small-blob-2 18s ease-in-out infinite",
                filter: "blur(25px)",
                boxShadow:
                  "0 0 50px rgba(103,232,249,0.9), 0 0 100px rgba(20,184,166,0.5)",
              }}
            ></div>

            {/* Additional accent blobs for more intensity */}
            <div
              className="absolute w-28 h-28 rounded-full blur-md opacity-95"
              style={{
                background:
                  "radial-gradient(circle, rgba(5,150,105,1) 0%, rgba(16,185,129,0.8) 60%, transparent 100%)",
                animation: "accent-blob-1 14s ease-in-out infinite",
                filter: "blur(20px)",
                boxShadow: "0 0 40px rgba(5,150,105,0.9)",
              }}
            ></div>

            <div
              className="absolute w-32 h-32 rounded-full blur-md opacity-85"
              style={{
                background:
                  "radial-gradient(circle, rgba(6,182,212,1) 0%, rgba(103,232,249,0.8) 50%, transparent 100%)",
                animation: "accent-blob-2 16s ease-in-out infinite",
                filter: "blur(18px)",
                boxShadow: "0 0 45px rgba(6,182,212,0.8)",
              }}
            ></div>

            {/* Floating orbs - smaller decorative elements with more intensity */}
            <div
              className="absolute top-1/4 left-1/4 w-20 h-20 bg-gradient-to-r from-teal-400/60 to-emerald-400/60 rounded-full blur-xl"
              style={{
                animation: "float 6s ease-in-out infinite",
                boxShadow: "0 0 30px rgba(20,184,166,0.6)",
              }}
            ></div>
            <div
              className="absolute top-1/3 right-1/4 w-16 h-16 bg-gradient-to-r from-cyan-400/60 to-teal-400/60 rounded-full blur-xl"
              style={{
                animation: "float 6s ease-in-out infinite",
                animationDelay: "2s",
                boxShadow: "0 0 25px rgba(103,232,249,0.6)",
              }}
            ></div>
            <div
              className="absolute bottom-1/4 left-1/3 w-14 h-14 bg-gradient-to-r from-emerald-400/60 to-green-400/60 rounded-full blur-xl"
              style={{
                animation: "float 6s ease-in-out infinite",
                animationDelay: "4s",
                boxShadow: "0 0 20px rgba(16,185,129,0.6)",
              }}
            ></div>
            <div
              className="absolute bottom-1/3 right-1/3 w-18 h-18 bg-gradient-to-r from-teal-400/60 to-cyan-400/60 rounded-full blur-xl"
              style={{
                animation: "float 6s ease-in-out infinite",
                animationDelay: "1s",
                boxShadow: "0 0 28px rgba(45,212,191,0.6)",
              }}
            ></div>

            {/* Grid pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(20,184,166,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(20,184,166,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

            {/* Animated lines */}
            <div className="absolute top-0 left-0 w-full h-full">
              <div
                className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-teal-400/30 to-transparent"
                style={{
                  animation: "pulse 2s ease-in-out infinite",
                }}
              ></div>
              <div
                className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-400/30 to-transparent"
                style={{
                  animation: "pulse 2s ease-in-out infinite",
                  animationDelay: "1.5s",
                }}
              ></div>
            </div>
          </div>

          <div className="text-center space-y-8 max-w-5xl mx-auto relative z-10">
            <h1 className="text-6xl md:text-8xl font-bold leading-tight tracking-tight">
              <span
                className="bg-gradient-to-r from-teal-300 via-emerald-400 to-cyan-300 bg-clip-text text-transparent"
                style={{
                  backgroundSize: "200% 200%",
                  animation:
                    "gradient-shift 3s ease-in-out infinite, pulse-glow 2s ease-in-out infinite",
                }}
              >
                FROM TWITCH
              </span>
              <br />
              <span
                className="bg-gradient-to-r from-cyan-300 via-teal-400 to-emerald-300 bg-clip-text text-transparent"
                style={{
                  backgroundSize: "200% 200%",
                  animation:
                    "gradient-shift 3s ease-in-out infinite, pulse-glow 2s ease-in-out infinite",
                  animationDelay: "0.5s",
                }}
              >
                TO RICH
              </span>
            </h1>

            {/* Decorative line with controller icon */}
            <div className="flex items-center justify-center gap-4 py-4">
              <div className="w-20 h-0.5 bg-gradient-to-r from-transparent to-teal-400"></div>
              <div className="w-10 h-10 bg-gray-900 rounded flex items-center justify-center border border-teal-400/30">
                <span className="text-sm">🎮</span>
              </div>
              <div className="w-20 h-0.5 bg-gradient-to-r from-teal-400 to-transparent"></div>
            </div>

            <p className="text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Turn{" "}
              <span className="text-teal-400 font-medium">entertainment</span>{" "}
              into finance. Connect{" "}
              <span className="text-emerald-400 font-medium">streamers</span>,
              clippers, and agencies.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-4">
              <Button
                onClick={handleStartClipping}
                variant="cta"
                size="xl"
                className="rounded-full px-14 py-5 min-w-[300px] font-semibold text-xl shadow-teal-strong hover:shadow-teal-strong transition-all duration-300"
              >
                ▶ START CLIPPING NOW
              </Button>
              <Button
                onClick={handleStartStreaming}
                variant="cta-outline"
                size="xl"
                className="rounded-full px-14 py-5 min-w-[300px] font-semibold text-xl transition-all duration-300"
              >
                👥 START STREAMING NOW
              </Button>
            </div>
          </div>
        </section>

        {/* Platform Growth Stats */}
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-5xl font-bold mb-6 text-white">
                Platform Growth
              </h2>
              <p className="text-gray-400 text-xl">
                Real numbers from our thriving creator economy
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center mb-24">
              {stats.map((stat, index) => (
                <div key={index}>
                  <div className={`text-5xl font-bold ${stat.color} mb-3`}>
                    {stat.value}
                  </div>
                  <div className="text-gray-400 text-lg">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Feature Cards */}
            <div className="grid md:grid-cols-3 gap-8 mb-24">
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
                    )} transition-all duration-300 border bg-gray-900/50 backdrop-blur-sm`}
                  >
                    <CardContent className="p-10 text-center space-y-6">
                      <div
                        className={`w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br ${feature.bgColor} flex items-center justify-center border ${feature.borderColor}`}
                      >
                        <Icon className={`w-10 h-10 ${feature.color}`} />
                      </div>
                      <h3 className={`text-2xl font-bold ${feature.color}`}>
                        {feature.title}
                      </h3>
                      <p className="text-gray-300 leading-relaxed text-lg">
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
        <section className="py-24 px-6 bg-gray-900/20">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-6xl font-bold mb-6 text-gradient-cta">
              HOW IT WORKS
            </h2>
            <p className="text-gray-300 text-xl mb-20">
              Three paths to dominate the battlefield
            </p>

            <div className="grid md:grid-cols-3 gap-16">
              {/* For Clippers */}
              <div className="text-left space-y-8">
                <h3 className="text-3xl font-bold text-teal-400">
                  FOR CLIPPERS
                </h3>
                <div className="space-y-6">
                  {[
                    "Find trending streamer and missions",
                    "Create and submit viral clips",
                    "Earn rewards",
                  ].map((step, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-teal-400 text-black flex items-center justify-center text-lg font-bold">
                        {index + 1}
                      </div>
                      <span className="text-gray-300 text-lg">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* For Streamers */}
              <div className="text-left space-y-8">
                <h3 className="text-3xl font-bold text-emerald-400">
                  FOR STREAMERS
                </h3>
                <div className="space-y-6">
                  {[
                    "Connect your channels to Pumpfun and create missions",
                    "Stream and engage with your audience",
                    "Watch your content spread and earn fees",
                  ].map((step, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-emerald-400 text-black flex items-center justify-center text-lg font-bold">
                        {index + 1}
                      </div>
                      <span className="text-gray-300 text-lg">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Platform */}
              <div className="text-left space-y-8">
                <h3 className="text-3xl font-bold text-cyan-400">PLATFORM</h3>
                <div className="space-y-6">
                  {[
                    "Token buys fuel reach and visibility.",
                    "Bigger community support = stronger launch outcome.",
                    "Every contribution amplifies streams to new audiences.",
                  ].map((step, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-cyan-400 text-black flex items-center justify-center text-lg font-bold">
                        {index + 1}
                      </div>
                      <span className="text-gray-300 text-lg">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Creator Fee Loop */}
        <section className="py-24 px-6 bg-gray-900/10">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6 text-white">
              $CLIP Creator Fee Loop
            </h2>
            <p className="text-gray-300 mb-16 text-xl">
              Every fee compounds into more reach, more clips, more value.
            </p>

            <div className="flex justify-center items-center gap-12 mb-12 flex-wrap">
              <div className="text-center">
                <div className="text-4xl font-bold text-teal-400 mb-2">
                  $12,500
                </div>
                <div className="text-lg text-gray-300">Total Fees</div>
              </div>
              <ArrowRight className="text-gray-400 w-8 h-8" />
              <div className="text-center">
                <div className="text-4xl font-bold text-emerald-400 mb-2">
                  $6,250
                </div>
                <div className="text-lg text-gray-300">To Streamers</div>
              </div>
              <ArrowRight className="text-gray-400 w-8 h-8" />
              <div className="text-center">
                <div className="text-4xl font-bold text-cyan-400 mb-2">
                  $3,750
                </div>
                <div className="text-lg text-gray-300">To Clipper</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-400 mb-2"></div>
                <div className="text-lg text-gray-300">To Mission</div>
              </div>
            </div>

            <p className="text-lg text-gray-300">
              We take 0% Fees 0% allocation except running infra cost
            </p>
          </div>
        </section>

        {/* Live Leaderboards */}
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-16">
              <h2 className="text-4xl font-bold text-white">
                Live Leaderboards
              </h2>
              <Button
                variant="cta-outline"
                className="rounded-full text-lg px-6 py-3"
                onClick={() => (window.location.href = "/leaderboards")}
              >
                View All →
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-16">
              {/* Top Clippers */}
              <div>
                <h3 className="text-2xl font-bold mb-8 flex items-center gap-3 text-white">
                  <Scissors className="w-6 h-6 text-teal-400" />
                  Top Clippers
                </h3>
                <div className="space-y-6">
                  {[
                    {
                      name: "@clipmaster",
                      earnings: "$1,225",
                      color: "text-teal-400",
                    },
                    {
                      name: "@viralking",
                      earnings: "$1,065",
                      color: "text-emerald-400",
                    },
                    {
                      name: "@contentcreator",
                      earnings: "$945",
                      color: "text-cyan-400",
                    },
                  ].map((clipper, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 rounded-lg bg-gray-900/50 hover:bg-gray-800/50 transition-colors border border-gray-800"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-teal-400 to-emerald-400 flex items-center justify-center">
                          <span className="text-black text-lg">●</span>
                        </div>
                        <span className="text-white text-lg">
                          {clipper.name}
                        </span>
                      </div>
                      <span className={`font-bold text-xl ${clipper.color}`}>
                        {clipper.earnings}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top Streamers */}
              <div>
                <h3 className="text-2xl font-bold mb-8 flex items-center gap-3 text-white">
                  <DollarSign className="w-6 h-6 text-emerald-400" />
                  Top Streamers
                </h3>
                <div className="space-y-6">
                  {[
                    {
                      name: "@pumpstreamer",
                      earnings: "$1,250",
                      color: "text-emerald-400",
                    },
                    {
                      name: "@cryptoking",
                      earnings: "$980",
                      color: "text-teal-400",
                    },
                    {
                      name: "@tokenmaster",
                      earnings: "$750",
                      color: "text-cyan-400",
                    },
                  ].map((streamer, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 rounded-lg bg-gray-900/50 hover:bg-gray-800/50 transition-colors border border-gray-800"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 flex items-center justify-center">
                          <span className="text-black text-lg">●</span>
                        </div>
                        <span className="text-white text-lg">
                          {streamer.name}
                        </span>
                      </div>
                      <span className={`font-bold text-xl ${streamer.color}`}>
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
        <section className="py-24 px-6 bg-gray-900/10">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-4xl font-bold mb-6 text-white">
                Success Stories
              </h2>
              <p className="text-gray-300 text-xl">
                Onboarded pump.fun streamers crushing it
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-10">
              {[
                {
                  name: "TokenKing",
                  period: "Last 30 days",
                  earnings: "$2,500",
                  story:
                    "Launched on pump.fun and immediately connected with CLIP. Now earning consistent fees from viral clips.",
                  color: "from-teal-400 to-emerald-400",
                },
                {
                  name: "CryptoQueen",
                  period: "Last 30 days",
                  earnings: "$1,800",
                  story:
                    "Grew from 100 to 10K followers through strategic clip distribution and community building.",
                  color: "from-emerald-400 to-cyan-400",
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
                  className="bg-gray-900/50 border-gray-800 hover:border-gray-700 transition-colors backdrop-blur-sm"
                >
                  <CardContent className="p-8 space-y-6">
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-16 h-16 rounded-full bg-gradient-to-r ${story.color} flex items-center justify-center`}
                      >
                        <Star className="w-8 h-8 text-black" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-xl">
                          {story.name}
                        </h4>
                        <p className="text-sm text-gray-400">{story.period}</p>
                      </div>
                    </div>

                    <div className="text-center py-6">
                      <div className="text-3xl font-bold text-teal-400 mb-2">
                        {story.earnings}
                      </div>
                      <div className="text-sm text-gray-400">Fees Earned</div>
                    </div>

                    <p className="text-gray-300 leading-relaxed text-lg">
                      {story.story}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Upcoming Launches */}
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-16">
              <h2 className="text-4xl font-bold text-white">
                Upcoming Launches
              </h2>
              <Button
                variant="cta-outline"
                className="rounded-full text-lg px-6 py-3"
                onClick={() => (window.location.href = "/calendar")}
              >
                View Calendar →
              </Button>
            </div>

            <div className="grid md:grid-cols-3 gap-10">
              <Card className="bg-gray-900/50 border-gray-800 hover:border-gray-700 transition-all duration-300 backdrop-blur-sm">
                <CardContent className="p-8 space-y-6">
                  <div className="flex items-center gap-2 text-teal-400">
                    <Calendar className="w-5 h-5" />
                    <span className="text-lg font-medium">Dec 20, 2024</span>
                  </div>

                  <h3 className="text-2xl font-bold text-white">
                    $MOON Token Launch
                  </h3>

                  <div className="space-y-3">
                    <p className="text-lg text-white">2:00 PM EST</p>
                    <p className="text-lg text-gray-400">@moonmaster</p>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button
                      size="sm"
                      variant="cta"
                      className="rounded-full px-6 py-3 text-lg"
                    >
                      👥 Follow
                    </Button>
                    <Button
                      size="sm"
                      variant="cta-outline"
                      className="rounded-full px-6 py-3 text-lg"
                      onClick={() => setIsLaunchCreatorOpen(true)}
                    >
                      Set Reminder
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 border-gray-800 hover:border-gray-700 transition-all duration-300 backdrop-blur-sm">
                <CardContent className="p-8 space-y-6">
                  <div className="flex items-center gap-2 text-emerald-400">
                    <Calendar className="w-5 h-5" />
                    <span className="text-lg font-medium">Dec 22, 2024</span>
                  </div>

                  <h3 className="text-2xl font-bold text-white">
                    $ROCKET Stream Event
                  </h3>

                  <div className="space-y-3">
                    <p className="text-lg text-white">6:00 PM EST</p>
                    <p className="text-lg text-gray-400">@rocketman</p>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button
                      size="sm"
                      variant="cta"
                      className="rounded-full px-6 py-3 text-lg"
                    >
                      👥 Follow
                    </Button>
                    <Button
                      size="sm"
                      variant="cta-outline"
                      className="rounded-full px-6 py-3 text-lg"
                      onClick={() => setIsLaunchCreatorOpen(true)}
                    >
                      Set Reminder
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 border-gray-800 hover:border-gray-700 transition-all duration-300 backdrop-blur-sm">
                <CardContent className="p-8 space-y-6">
                  <div className="flex items-center gap-2 text-cyan-400">
                    <Calendar className="w-5 h-5" />
                    <span className="text-lg font-medium">Dec 25, 2024</span>
                  </div>

                  <h3 className="text-2xl font-bold text-white">
                    $DIAMOND Launch Party
                  </h3>

                  <div className="space-y-3">
                    <p className="text-lg text-white">8:00 PM EST</p>
                    <p className="text-lg text-gray-400">@cryptoqueen</p>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button
                      size="sm"
                      variant="cta"
                      className="rounded-full px-6 py-3 text-lg"
                    >
                      👥 Follow
                    </Button>
                    <Button
                      size="sm"
                      variant="cta-outline"
                      className="rounded-full px-6 py-3 text-lg"
                      onClick={() => setIsLaunchCreatorOpen(true)}
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
        <section className="py-24 px-6 bg-gradient-to-br from-teal-400/5 via-emerald-400/5 to-cyan-400/5 rounded-t-3xl border-t border-gray-800">
          <div className="max-w-5xl mx-auto text-center space-y-10">
            <h2 className="text-5xl font-bold text-white">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Join the revolution where entertainment becomes finance. Choose
              your path and start earning today.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                onClick={handleStartClipping}
                variant="cta"
                size="xl"
                className="rounded-full px-14 py-5 min-w-[280px] font-semibold text-xl shadow-teal-strong transition-all duration-300"
              >
                ▶ Start Clipping Now
              </Button>
              <Button
                onClick={handleStartStreaming}
                variant="cta-outline"
                size="xl"
                className="rounded-full px-14 py-5 min-w-[280px] font-semibold text-xl transition-all duration-300"
              >
                👥 Start Streaming
              </Button>
            </div>
          </div>
        </section>
      </div>

      <>
        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          initialMode={authMode}
          onSuccess={() => {
            setIsAuthModalOpen(false);
          }}
        />

        <LaunchCreator
          isOpen={isLaunchCreatorOpen}
          onClose={() => setIsLaunchCreatorOpen(false)}
          onSuccess={() => {
            console.log("Launch created successfully");
          }}
        />
      </>
    </MainLayout>
  );
}
