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
  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4 flex-1">
            {event.tokenLogo ? (
              <div className="w-16 h-16 rounded-full overflow-hidden border border-gray-600">
                <Image
                  src={event.tokenLogo}
                  alt={event.tokenSymbol || "Token"}
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-16 h-16 rounded-full bg-gray-600 flex items-center justify-center">
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
              <p className="text-gray-300 flex items-center gap-2 mb-3">
                <Star className="w-4 h-4 text-yellow-400" />
                {event.streamerName}
              </p>
              {event.description && (
                <p className="text-gray-400 mb-4">{event.description}</p>
              )}

              <div className="flex items-center gap-6 text-gray-400">
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {new Date(event.scheduledDate).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    timeZoneName: "short",
                  })}
                </span>
                {event.expectedViews && (
                  <span className="flex items-center gap-2">
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
              Stream
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
