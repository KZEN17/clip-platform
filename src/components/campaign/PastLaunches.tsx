"use client";

import { LaunchEvent } from "@/lib/launchSchema";
import { Eye, TrendingUp } from "lucide-react";

interface PastLaunchesProps {
  completedLaunches: LaunchEvent[];
  loading: boolean;
}

export const PastLaunches = ({
  completedLaunches,
  loading,
}: PastLaunchesProps) => {
  if (loading) {
    return (
      <div className="space-y-8">
        <h2 className="text-3xl font-bold text-white flex items-center gap-3">
          <TrendingUp className="w-8 h-8 text-cyan-400" />
          Past Launches
        </h2>
        <div className="text-center py-8">
          <p className="text-gray-400">Loading past launches...</p>
        </div>
      </div>
    );
  }

  const pastLaunches = completedLaunches.slice(0, 3);

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-white flex items-center gap-3">
        <TrendingUp className="w-8 h-8 text-cyan-400" />
        Past Launches
      </h2>

      <div className="space-y-6">
        {pastLaunches.length > 0 ? (
          pastLaunches.map((launch) => (
            <div
              key={launch.$id}
              className="flex items-center justify-between py-6 border-b border-gray-700 last:border-b-0"
            >
              <div>
                <h3 className="text-xl font-bold text-white mb-1">
                  {launch.launchTitle}
                </h3>
                <p className="text-gray-400">
                  {new Date(launch.scheduledDate).toLocaleDateString()} •{" "}
                  {launch.streamerName}
                </p>
              </div>

              <div className="flex items-center gap-12">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">
                    {launch.totalClips || 0}
                  </div>
                  <div className="text-sm text-gray-500">Clips</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-cyan-400 flex items-center gap-1">
                    <Eye className="w-5 h-5" />
                    {launch.totalViews
                      ? `${(launch.totalViews / 1000).toFixed(0)}K`
                      : "0"}
                  </div>
                  <div className="text-sm text-gray-500">Views</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-400">
                    $
                    {launch.expectedViews
                      ? (launch.expectedViews * 0.001).toFixed(0)
                      : "0"}
                  </div>
                  <div className="text-sm text-gray-500">Fees</div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <TrendingUp className="w-12 h-12 mx-auto text-gray-500 mb-4" />
            <p className="text-gray-400">No completed launches yet</p>
          </div>
        )}
      </div>
    </div>
  );
};
