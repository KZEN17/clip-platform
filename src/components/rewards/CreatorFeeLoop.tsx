"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Gift, RefreshCw, TrendingUp } from "lucide-react";

export const CreatorFeeLoop = () => {
  return (
    <Card className="border-cyan-400/20 bg-gradient-to-r from-cyan-400/5 to-cyan-400/10">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-2xl text-white">
          <RefreshCw className="w-6 h-6 text-cyan-400" />
          <span>Creator Fee Loop</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-lg text-gray-400">
          Creator fees are recycled into new clipping campaigns, creating a
          sustainable economy where successful content generates more
          opportunities for creators.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-pink-600 rounded-xl flex items-center justify-center mx-auto">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-white">Fees Generated</h3>
            <p className="text-sm text-gray-400">
              Streamers earn from viral clips
            </p>
          </div>
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto">
              <RefreshCw className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-white">Fees Recycled</h3>
            <p className="text-sm text-gray-400">Portion funds new campaigns</p>
          </div>
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-cyan-500 rounded-xl flex items-center justify-center mx-auto">
              <Gift className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-white">More Rewards</h3>
            <p className="text-sm text-gray-400">
              Increased incentives for clippers
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
