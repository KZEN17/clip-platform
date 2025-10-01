"use client";

import { MainLayout } from "@/components/layout/MainLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Eye, TrendingUp } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface LiveStream {
  id: string;
  streamerName: string;
  title: string;
  thumbnail: string;
  viewerCount: number;
  tokenSymbol?: string;
  marketCap?: number;
  platform: "twitch" | "youtube" | "kick";
  isLive: boolean;
  streamUrl: string;
  category?: string;
}

// Mock data - replace with real API call
const mockStreams: LiveStream[] = [
  {
    id: "1",
    streamerName: "CryptoKing",
    title: "$MOON Token Launch - TO THE MOON! 🚀",
    thumbnail: "/api/placeholder/400/225",
    viewerCount: 2847,
    tokenSymbol: "MOON",
    marketCap: 450000,
    platform: "twitch",
    isLive: true,
    streamUrl: "https://twitch.tv/cryptoking",
    category: "Just Chatting",
  },
  {
    id: "2",
    streamerName: "PumpMaster",
    title: "New Token Launch | Community Rewards",
    thumbnail: "/api/placeholder/400/225",
    viewerCount: 1523,
    tokenSymbol: "PUMP",
    marketCap: 280000,
    platform: "youtube",
    isLive: true,
    streamUrl: "https://youtube.com/watch",
    category: "Gaming",
  },
  {
    id: "3",
    streamerName: "TokenQueen",
    title: "$DIAMOND Launch Stream - Join the Revolution",
    thumbnail: "/api/placeholder/400/225",
    viewerCount: 3241,
    tokenSymbol: "DIAMOND",
    marketCap: 890000,
    platform: "kick",
    isLive: true,
    streamUrl: "https://kick.com/tokenqueen",
    category: "Just Chatting",
  },
  {
    id: "4",
    streamerName: "ClipLord",
    title: "Massive Giveaway Stream! Come Join!",
    thumbnail: "/api/placeholder/400/225",
    viewerCount: 892,
    platform: "twitch",
    isLive: true,
    streamUrl: "https://twitch.tv/cliplord",
    category: "IRL",
  },
  {
    id: "5",
    streamerName: "StreamGod",
    title: "$ROCKET Token - Next 100x Gem?",
    thumbnail: "/api/placeholder/400/225",
    viewerCount: 1876,
    tokenSymbol: "ROCKET",
    marketCap: 520000,
    platform: "youtube",
    isLive: true,
    streamUrl: "https://youtube.com/watch",
    category: "Gaming",
  },
  {
    id: "6",
    streamerName: "CryptoGamer",
    title: "Token Launch + Gameplay | $GAME",
    thumbnail: "/api/placeholder/400/225",
    viewerCount: 645,
    tokenSymbol: "GAME",
    marketCap: 150000,
    platform: "twitch",
    isLive: true,
    streamUrl: "https://twitch.tv/cryptogamer",
    category: "Gaming",
  },
];

export default function ExplorePage() {
  const [streams] = useState<LiveStream[]>(mockStreams);
  const [sortBy, setSortBy] = useState<"viewers" | "marketcap">("viewers");

  const sortedStreams = [...streams].sort((a, b) => {
    if (sortBy === "viewers") {
      return b.viewerCount - a.viewerCount;
    } else {
      return (b.marketCap || 0) - (a.marketCap || 0);
    }
  });

  const formatNumber = (num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case "twitch":
        return "bg-purple-500";
      case "youtube":
        return "bg-red-500";
      case "kick":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <MainLayout>
      <div className="min-h-screen bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-teal-300 via-emerald-400 to-cyan-300 bg-clip-text text-transparent">
                  Live Crypto Streams
                </h1>
                <p className="text-gray-400 mt-2">
                  Watch live token launches and earn rewards by clipping
                </p>
              </div>

              <div className="flex gap-2">
                <Button
                  variant={sortBy === "viewers" ? "default" : "outline"}
                  onClick={() => setSortBy("viewers")}
                  className={
                    sortBy === "viewers"
                      ? "bg-teal-400 text-black"
                      : "border-gray-600 text-gray-300"
                  }
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Viewers
                </Button>
                <Button
                  variant={sortBy === "marketcap" ? "default" : "outline"}
                  onClick={() => setSortBy("marketcap")}
                  className={
                    sortBy === "marketcap"
                      ? "bg-teal-400 text-black"
                      : "border-gray-600 text-gray-300"
                  }
                >
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Market Cap
                </Button>
              </div>
            </div>

            {/* Stats Bar */}
            <div className="grid grid-cols-3 gap-4">
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-teal-400">
                    {streams.length}
                  </div>
                  <div className="text-sm text-gray-400">Live Streams</div>
                </CardContent>
              </Card>
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-emerald-400">
                    {formatNumber(
                      streams.reduce((sum, s) => sum + s.viewerCount, 0)
                    )}
                  </div>
                  <div className="text-sm text-gray-400">Total Viewers</div>
                </CardContent>
              </Card>
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-cyan-400">
                    {streams.filter((s) => s.tokenSymbol).length}
                  </div>
                  <div className="text-sm text-gray-400">Token Launches</div>
                </CardContent>
              </Card>
            </div>

            {/* Stream Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedStreams.map((stream) => (
                <Card
                  key={stream.id}
                  className="bg-gray-800 border-gray-700 hover:border-teal-400/50 transition-all duration-300 cursor-pointer group"
                  onClick={() =>
                    window.open(
                      stream.streamUrl,
                      "_blank",
                      "noopener,noreferrer"
                    )
                  }
                >
                  <div className="relative">
                    {/* Thumbnail */}
                    <div className="relative w-full h-48 bg-gray-700 rounded-t-lg overflow-hidden">
                      <Image
                        src={stream.thumbnail}
                        alt={stream.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />

                      {/* Live Badge */}
                      {stream.isLive && (
                        <div className="absolute top-2 left-2">
                          <Badge className="bg-red-500 text-white animate-pulse">
                            LIVE
                          </Badge>
                        </div>
                      )}

                      {/* Viewer Count */}
                      <div className="absolute top-2 right-2 bg-black/80 backdrop-blur-sm px-2 py-1 rounded flex items-center gap-1">
                        <Eye className="w-3 h-3 text-white" />
                        <span className="text-white text-xs font-medium">
                          {formatNumber(stream.viewerCount)}
                        </span>
                      </div>

                      {/* Platform Badge */}
                      <div className="absolute bottom-2 left-2">
                        <Badge
                          className={`${getPlatformColor(
                            stream.platform
                          )} text-white text-xs`}
                        >
                          {stream.platform.toUpperCase()}
                        </Badge>
                      </div>

                      {/* Token Badge */}
                      {stream.tokenSymbol && (
                        <div className="absolute bottom-2 right-2 bg-teal-400 px-2 py-1 rounded font-bold text-black text-xs">
                          ${stream.tokenSymbol}
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <CardContent className="p-4 space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-teal-400 to-emerald-400 flex items-center justify-center flex-shrink-0">
                          <span className="text-black font-bold text-sm">
                            {stream.streamerName.slice(0, 2).toUpperCase()}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-white font-semibold line-clamp-2 group-hover:text-teal-400 transition-colors">
                            {stream.title}
                          </h3>
                          <p className="text-gray-400 text-sm mt-1">
                            {stream.streamerName}
                          </p>
                          {stream.category && (
                            <p className="text-gray-500 text-xs mt-1">
                              {stream.category}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Market Cap */}
                      {stream.marketCap && (
                        <div className="flex items-center justify-between pt-2 border-t border-gray-700">
                          <span className="text-gray-400 text-xs">
                            Market Cap
                          </span>
                          <span className="text-emerald-400 font-semibold text-sm">
                            ${formatNumber(stream.marketCap)}
                          </span>
                        </div>
                      )}
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>

            {/* CTA Section */}
            <Card className="bg-gradient-to-r from-teal-400/10 via-emerald-400/10 to-cyan-400/10 border-teal-400/20">
              <CardContent className="p-8 text-center">
                <h2 className="text-2xl font-bold text-white mb-4">
                  Want to be featured here?
                </h2>
                <p className="text-gray-400 mb-6">
                  Launch your token on pump.fun and connect with CLIP to get
                  featured in our explorer
                </p>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-teal-400 to-emerald-400 hover:from-teal-300 hover:to-emerald-300 text-black font-semibold px-8"
                  onClick={() => (window.location.href = "/calendar")}
                >
                  Create Your Launch
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
