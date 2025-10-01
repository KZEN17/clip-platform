"use client";

import { MainLayout } from "@/components/layout/MainLayout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Globe,
  Instagram,
  Share2,
  Twitter,
  UserPlus,
  Youtube,
} from "lucide-react";
import { useState } from "react";

interface CreatorProfile {
  id: string;
  username: string;
  twitterHandle?: string;
  avatarUrl?: string;
  tags: string[];
  socials: {
    twitter?: string;
    instagram?: string;
    youtube?: string;
    website?: string;
  };
  isVerified?: boolean;
}

// Mock data
const mockProfiles: CreatorProfile[] = [
  {
    id: "1",
    username: "CryptoKing",
    twitterHandle: "@cryptoking",
    avatarUrl: "/api/placeholder/100/100",
    tags: ["Streamer", "Degen", "Trader"],
    socials: {
      twitter: "https://twitter.com/cryptoking",
      instagram: "https://instagram.com/cryptoking",
      youtube: "https://youtube.com/@cryptoking",
    },
    isVerified: true,
  },
  {
    id: "2",
    username: "ClipMaster",
    twitterHandle: "@clipmaster",
    avatarUrl: "/api/placeholder/100/100",
    tags: ["Clipper", "Editor"],
    socials: {
      twitter: "https://twitter.com/clipmaster",
      website: "https://clipmaster.com",
    },
    isVerified: true,
  },
  {
    id: "3",
    username: "TokenQueen",
    twitterHandle: "@tokenqueen",
    avatarUrl: "/api/placeholder/100/100",
    tags: ["Streamer", "Project"],
    socials: {
      twitter: "https://twitter.com/tokenqueen",
      youtube: "https://youtube.com/@tokenqueen",
    },
    isVerified: false,
  },
  {
    id: "4",
    username: "AgencyPro",
    twitterHandle: "@agencypro",
    avatarUrl: "/api/placeholder/100/100",
    tags: ["Agency", "Manager"],
    socials: {
      twitter: "https://twitter.com/agencypro",
      website: "https://agencypro.com",
      instagram: "https://instagram.com/agencypro",
    },
    isVerified: true,
  },
  {
    id: "5",
    username: "DegenTrader",
    twitterHandle: "@degentrader",
    avatarUrl: "/api/placeholder/100/100",
    tags: ["Degen", "Trader", "Alpha"],
    socials: {
      twitter: "https://twitter.com/degentrader",
    },
    isVerified: false,
  },
  {
    id: "6",
    username: "StreamLord",
    twitterHandle: "@streamlord",
    avatarUrl: "/api/placeholder/100/100",
    tags: ["Streamer", "Entertainer"],
    socials: {
      twitter: "https://twitter.com/streamlord",
      youtube: "https://youtube.com/@streamlord",
      instagram: "https://instagram.com/streamlord",
    },
    isVerified: true,
  },
];

export default function FrenworkPage() {
  const [profiles] = useState<CreatorProfile[]>(mockProfiles);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const allTags = Array.from(new Set(profiles.flatMap((p) => p.tags))).sort();

  const filteredProfiles = selectedTag
    ? profiles.filter((p) => p.tags.includes(selectedTag))
    : profiles;

  const getTagColor = (tag: string) => {
    const colors: Record<string, string> = {
      Streamer: "bg-purple-500/20 text-purple-400 border-purple-500/30",
      Clipper: "bg-pink-500/20 text-pink-400 border-pink-500/30",
      Degen: "bg-orange-500/20 text-orange-400 border-orange-500/30",
      Trader: "bg-green-500/20 text-green-400 border-green-500/30",
      Agency: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
      Project: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
      Editor: "bg-blue-500/20 text-blue-400 border-blue-500/30",
      Manager: "bg-indigo-500/20 text-indigo-400 border-indigo-500/30",
      Alpha: "bg-red-500/20 text-red-400 border-red-500/30",
      Entertainer: "bg-teal-500/20 text-teal-400 border-teal-500/30",
    };
    return colors[tag] || "bg-gray-500/20 text-gray-400 border-gray-500/30";
  };

  const handleShare = (profile: CreatorProfile) => {
    // Coming soon functionality
    console.log("Share profile:", profile.id);
    alert("Share functionality coming soon!");
  };

  const handleFollow = (profile: CreatorProfile) => {
    // Coming soon functionality
    console.log("Follow profile:", profile.id);
    alert("Follow functionality coming soon!");
  };

  return (
    <MainLayout>
      <div className="min-h-screen bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="space-y-8">
            {/* Header */}
            <div className="text-center space-y-4">
              <div className="inline-block px-4 py-2 bg-yellow-500/10 border border-yellow-500/30 rounded-full mb-4">
                <span className="text-yellow-400 font-semibold">
                  Coming Soon
                </span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-teal-300 via-emerald-400 to-cyan-300 bg-clip-text text-transparent">
                FRENWORK
              </h1>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Top creators in our network - ranked by performance
              </p>
            </div>

            {/* Filter Tags */}
            <div className="flex flex-wrap justify-center gap-2">
              <Button
                variant={selectedTag === null ? "default" : "outline"}
                onClick={() => setSelectedTag(null)}
                className={
                  selectedTag === null
                    ? "bg-teal-400 text-black"
                    : "border-gray-600 text-gray-300"
                }
              >
                All ({profiles.length})
              </Button>
              {allTags.map((tag) => (
                <Button
                  key={tag}
                  variant={selectedTag === tag ? "default" : "outline"}
                  onClick={() => setSelectedTag(tag)}
                  className={
                    selectedTag === tag
                      ? "bg-teal-400 text-black"
                      : "border-gray-600 text-gray-300"
                  }
                >
                  {tag} ({profiles.filter((p) => p.tags.includes(tag)).length})
                </Button>
              ))}
            </div>

            {/* Profile Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProfiles.map((profile) => (
                <Card
                  key={profile.id}
                  className="bg-gray-800 border-gray-700 hover:border-teal-400/50 transition-all duration-300"
                >
                  <CardContent className="p-6 space-y-4">
                    {/* Profile Header */}
                    <div className="flex items-center gap-4">
                      <Avatar className="w-16 h-16 ring-2 ring-teal-400/30">
                        <AvatarImage src={profile.avatarUrl} />
                        <AvatarFallback className="bg-gradient-to-r from-teal-400 to-emerald-400 text-black font-bold text-lg">
                          {profile.username.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="text-white font-bold text-lg">
                            {profile.username}
                          </h3>
                          {profile.isVerified && (
                            <Badge className="bg-blue-500 text-white text-xs">
                              ✓
                            </Badge>
                          )}
                        </div>
                        {profile.twitterHandle && (
                          <p className="text-gray-400 text-sm">
                            {profile.twitterHandle}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {profile.tags.map((tag) => (
                        <Badge
                          key={tag}
                          className={`${getTagColor(tag)} border text-xs`}
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Social Links */}
                    <div className="flex items-center gap-2">
                      {profile.socials.twitter && (
                        <a
                          href={profile.socials.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-lg bg-gray-700 hover:bg-blue-500/20 hover:text-blue-400 text-gray-400 transition-colors"
                        >
                          <Twitter className="w-4 h-4" />
                        </a>
                      )}
                      {profile.socials.instagram && (
                        <a
                          href={profile.socials.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-lg bg-gray-700 hover:bg-pink-500/20 hover:text-pink-400 text-gray-400 transition-colors"
                        >
                          <Instagram className="w-4 h-4" />
                        </a>
                      )}
                      {profile.socials.youtube && (
                        <a
                          href={profile.socials.youtube}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-lg bg-gray-700 hover:bg-red-500/20 hover:text-red-400 text-gray-400 transition-colors"
                        >
                          <Youtube className="w-4 h-4" />
                        </a>
                      )}
                      {profile.socials.website && (
                        <a
                          href={profile.socials.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-lg bg-gray-700 hover:bg-teal-500/20 hover:text-teal-400 text-gray-400 transition-colors"
                        >
                          <Globe className="w-4 h-4" />
                        </a>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 pt-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleShare(profile)}
                        className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700"
                      >
                        <Share2 className="w-4 h-4 mr-2" />
                        Share
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleFollow(profile)}
                        className="flex-1 bg-teal-400 hover:bg-teal-300 text-black"
                      >
                        <UserPlus className="w-4 h-4 mr-2" />
                        Follow
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Empty State */}
            {filteredProfiles.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-400">No profiles found with this tag</p>
              </div>
            )}

            {/* CTA Section */}
            <Card className="bg-gradient-to-r from-teal-400/10 via-emerald-400/10 to-cyan-400/10 border-teal-400/20">
              <CardContent className="p-8 text-center">
                <h2 className="text-2xl font-bold text-white mb-4">
                  Want to be featured?
                </h2>
                <p className="text-gray-400 mb-6">
                  Complete your profile and start creating content to get listed
                  in FRENWORK
                </p>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-teal-400 to-emerald-400 hover:from-teal-300 hover:to-emerald-300 text-black font-semibold px-8"
                  onClick={() => (window.location.href = "/profile")}
                >
                  Complete Your Profile
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
