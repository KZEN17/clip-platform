"use client";

import { LaunchEvent } from "@/lib/launchSchema";
import { CheckCircle } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";

interface SuccessStoriesProps {
  completedLaunches: LaunchEvent[];
  loading: boolean;
}

export const SuccessStories = ({
  completedLaunches,
  loading,
}: SuccessStoriesProps) => {
  if (loading) {
    return (
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white flex items-center justify-center gap-3 mb-3">
            <CheckCircle className="w-8 h-8 text-emerald-400" />
            Success Stories
          </h2>
          <p className="text-gray-300 text-lg">Loading success stories...</p>
        </div>
      </div>
    );
  }

  const successStories = completedLaunches.slice(0, 3);

  if (successStories.length === 0) {
    return (
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white flex items-center justify-center gap-3 mb-3">
            <CheckCircle className="w-8 h-8 text-emerald-400" />
            Success Stories
          </h2>
          <p className="text-gray-300 text-lg">
            No success stories yet - be the first!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white flex items-center justify-center gap-3 mb-3">
          <CheckCircle className="w-8 h-8 text-emerald-400" />
          Success Stories
        </h2>
        <p className="text-gray-300 text-lg">Real streamers, real results</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {successStories.map((launch) => (
          <Card
            key={launch.$id}
            className="bg-gray-800 border border-gray-700 hover:border-emerald-500/50 transition-all"
          >
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-gray-600 flex items-center justify-center">
                  <span className="font-bold text-white">
                    {launch.streamerName.slice(0, 2).toUpperCase()}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-white">
                      {launch.streamerName}
                    </h4>
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                  </div>
                  {launch.tokenSymbol && (
                    <span className="bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                      ${launch.tokenSymbol}
                    </span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-400">
                    {launch.totalViews
                      ? `${(launch.totalViews / 1000).toFixed(0)}K`
                      : "0"}
                  </div>
                  <div className="text-xs text-gray-500">Views</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-cyan-400">
                    {launch.totalClips || 0}
                  </div>
                  <div className="text-xs text-gray-500">Clips</div>
                </div>
              </div>

              <div className="bg-gray-700 rounded-lg p-3 border-l-4 border-emerald-400 mb-4">
                <p className="text-sm italic text-gray-300">
                  "{launch.launchTitle}"
                </p>
              </div>

              <div className="flex items-center justify-center gap-2 text-sm text-emerald-400">
                <CheckCircle className="w-4 h-4" />
                <span className="font-medium">Completed Successfully</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center">
        <Button className="border-2 border-emerald-400 bg-transparent text-emerald-400 hover:bg-emerald-400/10 rounded-full px-8 py-2 font-medium">
          See More Success Stories
        </Button>
      </div>
    </div>
  );
};
