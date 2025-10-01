"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LaunchEvent } from "@/lib/launchSchema";
import { Bell, CheckCircle, Clock, Eye, Share2, Star } from "lucide-react";
import Image from "next/image";

interface LaunchEventCardProps {
  event: LaunchEvent;
}

export const LaunchEventCard = ({ event }: LaunchEventCardProps) => {
  const eventDate = new Date(event.scheduledDate);
  const dayOfMonth = eventDate.getDate();
  const month = eventDate.toLocaleString("default", { month: "short" });
  const time = eventDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const hasSocials = !!(
    event.twitchUsername ||
    event.youtubeChannel ||
    event.tiktokUsername ||
    event.instagramUsername ||
    event.discordServer
  );

  return (
    <Card className="bg-gray-800 border-gray-700 hover:border-teal-400/50 transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex gap-6">
          <div className="flex-shrink-0">
            <div className="w-20 h-20 bg-gradient-to-br from-teal-400 to-emerald-400 rounded-xl flex flex-col items-center justify-center shadow-lg shadow-teal-400/30">
              <div className="text-3xl font-bold text-black">{dayOfMonth}</div>
              <div className="text-xs font-semibold text-black uppercase">
                {month}
              </div>
            </div>
            <div className="text-center mt-2 text-sm text-gray-400 font-medium">
              {time}
            </div>
          </div>

          <div className="flex-1 space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4 flex-1">
                {event.tokenLogo ? (
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-600">
                    <Image
                      src={event.tokenLogo}
                      alt={event.tokenSymbol || "Token"}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-16 h-16 rounded-full bg-gray-600 flex items-center justify-center border-2 border-gray-600">
                    <span className="font-bold text-lg text-white">
                      {event.tokenSymbol?.slice(0, 2) ||
                        event.streamerName?.slice(0, 2).toUpperCase() ||
                        "?"}
                    </span>
                  </div>
                )}

                <div className="flex-1">
                  <h4 className="text-2xl font-bold text-white mb-2">
                    {event.launchTitle}
                  </h4>
                  <p className="text-gray-300 flex items-center gap-2 mb-2">
                    <Star className="w-4 h-4 text-yellow-400" />
                    {event.streamerName}
                  </p>
                  {event.description && (
                    <p className="text-gray-400 mb-3 line-clamp-2">
                      {event.description}
                    </p>
                  )}

                  {hasSocials && (
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs text-gray-500">Socials:</span>
                      {event.twitchUsername && (
                        <div className="w-6 h-6 rounded bg-purple-500/20 flex items-center justify-center">
                          <span className="text-purple-400 text-xs font-bold">
                            TW
                          </span>
                        </div>
                      )}
                      {event.youtubeChannel && (
                        <div className="w-6 h-6 rounded bg-red-500/20 flex items-center justify-center">
                          <span className="text-red-400 text-xs font-bold">
                            YT
                          </span>
                        </div>
                      )}
                      {event.tiktokUsername && (
                        <div className="w-6 h-6 rounded bg-gray-700 flex items-center justify-center">
                          <span className="text-white text-xs font-bold">
                            TT
                          </span>
                        </div>
                      )}
                      {event.instagramUsername && (
                        <div className="w-6 h-6 rounded bg-pink-500/20 flex items-center justify-center">
                          <span className="text-pink-400 text-xs font-bold">
                            IG
                          </span>
                        </div>
                      )}
                      {event.discordServer && (
                        <div className="w-6 h-6 rounded bg-indigo-500/20 flex items-center justify-center">
                          <span className="text-indigo-400 text-xs font-bold">
                            DC
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {time}
                    </span>
                    {event.expectedViews && (
                      <span className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        {event.expectedViews.toLocaleString()} expected
                      </span>
                    )}
                    {event.streamPlatform && (
                      <span className="capitalize">{event.streamPlatform}</span>
                    )}
                  </div>
                </div>
              </div>

              <span
                className={`px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 ${
                  event.status === "scheduled"
                    ? "bg-blue-500/20 text-blue-400 border border-blue-500/50"
                    : event.status === "live"
                    ? "bg-green-500/20 text-green-400 border border-green-500/50"
                    : "bg-gray-500/20 text-gray-400 border border-gray-500/50"
                }`}
              >
                {event.status === "scheduled" && <Clock className="w-4 h-4" />}
                {event.status === "live" && <CheckCircle className="w-4 h-4" />}
                {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
              </span>
            </div>

            <div className="flex gap-3">
              <Button className="bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white border border-gray-600">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button className="bg-purple-500 text-white hover:bg-purple-400">
                <Bell className="w-4 h-4 mr-2" />
                Notify Me
              </Button>
              {event.status === "live" && (
                <Button className="bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:from-pink-400 hover:to-purple-400">
                  Watch Stream
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
