import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Crown, Medal, TrendingUp, Trophy } from "lucide-react";

export default function LeaderboardsPage() {
  const currentUser = {
    name: "zack.kargeen",
  };

  return (
    <MainLayout currentUser={currentUser}>
      <div className="p-6 space-y-6">
        <div className="flex items-center gap-3">
          <TrendingUp className="w-8 h-8 text-warning" />
          <h1 className="text-3xl font-bold text-white">Leaderboards</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-card/50 border-border">
            <CardContent className="p-6 text-center">
              <Crown className="w-12 h-12 text-warning mx-auto mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">Your Rank</h3>
              <p className="text-2xl font-bold text-muted-foreground">-</p>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border">
            <CardContent className="p-6 text-center">
              <Trophy className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">Top Clipper</h3>
              <p className="text-lg font-bold text-primary">@clipmaster</p>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border">
            <CardContent className="p-6 text-center">
              <Medal className="w-12 h-12 text-secondary mx-auto mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">
                Top Streamer
              </h3>
              <p className="text-lg font-bold text-secondary">@pumpking</p>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border">
            <CardContent className="p-6 text-center">
              <TrendingUp className="w-12 h-12 text-success mx-auto mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">Total Users</h3>
              <p className="text-2xl font-bold text-success">479+</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-card/50 border-border">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Trophy className="w-5 h-5 text-primary" />
                Top Clippers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Trophy className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  Leaderboard data loading...
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Medal className="w-5 h-5 text-secondary" />
                Top Streamers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Medal className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  Leaderboard data loading...
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
