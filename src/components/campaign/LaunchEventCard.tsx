"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LaunchEvent } from "@/lib/launchSchema";
import { Bell, Share2 } from "lucide-react";
import Image from "next/image";

// Social media icon components
const TwitchIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z" />
  </svg>
);

const YoutubeIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const DiscordIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
  </svg>
);

interface LaunchEventCardProps {
  event: LaunchEvent;
}

export const LaunchEventCard = ({ event }: LaunchEventCardProps) => {
  const eventDate = new Date(event.scheduledDate);
  const time = eventDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const handleShare = () => {
    const shareText = `${event.launchTitle} by ${event.streamerName}\n${
      event.tokenSymbol ? `$${event.tokenSymbol}` : ""
    }\n\nScheduled: ${eventDate.toLocaleDateString()} at ${time}`;
    const shareUrl = window.location.href;

    if (navigator.share) {
      navigator
        .share({
          title: event.launchTitle,
          text: shareText,
          url: shareUrl,
        })
        .catch((err) => console.log("Error sharing:", err));
    } else {
      navigator.clipboard
        .writeText(`${shareText}\n\n${shareUrl}`)
        .then(() => {
          alert("Link copied to clipboard!");
        })
        .catch(() => {
          const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
            shareText
          )}&url=${encodeURIComponent(shareUrl)}`;
          window.open(twitterUrl, "_blank", "width=600,height=400");
        });
    }
  };

  const getSocialIcon = (
    platform: "twitch" | "youtube" | "tiktok" | "instagram" | "discord"
  ) => {
    const icons = {
      twitch: <TwitchIcon className="w-3 h-3" />,
      youtube: <YoutubeIcon className="w-3 h-3" />,
      tiktok: <TikTokIcon className="w-3 h-3" />,
      instagram: <InstagramIcon className="w-3 h-3" />,
      discord: <DiscordIcon className="w-3 h-3" />,
    };
    return icons[platform];
  };

  const getSocialBadgeClass = (platform: string) => {
    const classes = {
      twitch: "bg-purple-500 text-white",
      youtube: "bg-red-500 text-white",
      tiktok: "bg-gray-900 text-white",
      instagram: "bg-gradient-to-r from-purple-500 to-pink-500 text-white",
      discord: "bg-indigo-500 text-white",
    };
    return (
      classes[platform as keyof typeof classes] || "bg-gray-700 text-white"
    );
  };

  return (
    <Card className="bg-gray-900 border-gray-800 hover:border-gray-700 transition-all duration-300">
      <CardContent className="p-0">
        {/* Profile Header */}
        <div className="flex items-center gap-3 p-4 border-b border-gray-800">
          {event.tokenLogo ? (
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-700">
              <Image
                src={event.tokenLogo}
                alt={event.tokenSymbol || "Token"}
                width={48}
                height={48}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-400 to-emerald-400 flex items-center justify-center border-2 border-gray-700">
              <span className="font-bold text-black text-sm">
                {event.tokenSymbol?.slice(0, 2) ||
                  event.streamerName?.slice(0, 2).toUpperCase() ||
                  "?"}
              </span>
            </div>
          )}
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-white truncate">
              {event.streamerName}
            </h4>
            <p className="text-sm text-gray-400 truncate">
              {event.launchTitle}
            </p>
          </div>
          <Badge
            className={`${
              event.status === "scheduled"
                ? "bg-blue-500/20 text-blue-400"
                : event.status === "live"
                ? "bg-green-500 text-white animate-pulse"
                : "bg-gray-600 text-white"
            }`}
          >
            {event.status === "live" ? "LIVE" : "Scheduled"}
          </Badge>
        </div>

        {/* Event Details */}
        <div className="p-4 space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">Time</span>
            <span className="text-white font-medium">{time} GMT+8</span>
          </div>

          {event.expectedViews && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">Expected</span>
              <span className="text-teal-400 font-semibold">
                {event.expectedViews.toLocaleString()} viewers
              </span>
            </div>
          )}

          {event.streamPlatform && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">Platform</span>
              <span className="text-white capitalize">
                {event.streamPlatform}
              </span>
            </div>
          )}

          {/* Social Media Icons */}
          {(event.twitchUsername ||
            event.youtubeChannel ||
            event.tiktokUsername ||
            event.instagramUsername ||
            event.discordServer) && (
            <div className="flex items-center gap-2 pt-2">
              <span className="text-xs text-gray-500">Socials:</span>
              <div className="flex gap-1.5">
                {event.twitchUsername && (
                  <div
                    className={`px-2 py-1 rounded text-xs font-medium flex items-center gap-1 ${getSocialBadgeClass(
                      "twitch"
                    )}`}
                  >
                    {getSocialIcon("twitch")}
                    <span>TW</span>
                  </div>
                )}
                {event.youtubeChannel && (
                  <div
                    className={`px-2 py-1 rounded text-xs font-medium flex items-center gap-1 ${getSocialBadgeClass(
                      "youtube"
                    )}`}
                  >
                    {getSocialIcon("youtube")}
                    <span>YT</span>
                  </div>
                )}
                {event.tiktokUsername && (
                  <div
                    className={`px-2 py-1 rounded text-xs font-medium flex items-center gap-1 ${getSocialBadgeClass(
                      "tiktok"
                    )}`}
                  >
                    {getSocialIcon("tiktok")}
                    <span>TT</span>
                  </div>
                )}
                {event.instagramUsername && (
                  <div
                    className={`px-2 py-1 rounded text-xs font-medium flex items-center gap-1 ${getSocialBadgeClass(
                      "instagram"
                    )}`}
                  >
                    {getSocialIcon("instagram")}
                    <span>IG</span>
                  </div>
                )}
                {event.discordServer && (
                  <div
                    className={`px-2 py-1 rounded text-xs font-medium flex items-center gap-1 ${getSocialBadgeClass(
                      "discord"
                    )}`}
                  >
                    {getSocialIcon("discord")}
                    <span>DC</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 p-4 pt-0">
          <Button
            variant="outline"
            size="sm"
            onClick={handleShare}
            className="flex-1 border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
          >
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
          <Button
            size="sm"
            className="flex-1 bg-purple-500 hover:bg-purple-600 text-white"
          >
            <Bell className="w-4 h-4 mr-2" />
            Notify Me
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
