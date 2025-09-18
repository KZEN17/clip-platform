import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Play, Scissors, TrendingUp, Users } from "lucide-react";

export default function GuidePage() {
  const currentUser = {
    name: "zack.kargeen",
  };

  const guides = [
    {
      title: "Getting Started as a Clipper",
      description: "Learn how to create viral clips and earn rewards",
      icon: Scissors,
      color: "text-primary",
    },
    {
      title: "Streamer Setup Guide",
      description: "Connect your channels and launch tokens",
      icon: Play,
      color: "text-secondary",
    },
    {
      title: "Building Your Community",
      description: "Grow your audience and engagement",
      icon: Users,
      color: "text-success",
    },
    {
      title: "Maximizing Your Earnings",
      description: "Tips and strategies for higher rewards",
      icon: TrendingUp,
      color: "text-warning",
    },
  ];

  return (
    <MainLayout currentUser={currentUser}>
      <div className="p-6 space-y-6">
        <div className="flex items-center gap-3">
          <BookOpen className="w-8 h-8 text-accent" />
          <h1 className="text-3xl font-bold text-white">Guide</h1>
        </div>

        <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
          <CardContent className="p-8 text-center">
            <BookOpen className="w-16 h-16 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-4">
              Welcome to CLIP!
            </h2>
            <p className="text-muted-foreground text-lg">
              Learn everything you need to know about creating viral clips,
              streaming, and earning rewards on our platform.
            </p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {guides.map((guide, index) => {
            const Icon = guide.icon;
            return (
              <Card
                key={index}
                className="bg-card/50 border-border hover:border-border/80 transition-all duration-300 cursor-pointer"
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-card/50">
                      <Icon className={`w-8 h-8 ${guide.color}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white mb-2">
                        {guide.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {guide.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card className="bg-card/50 border-border">
          <CardHeader>
            <CardTitle className="text-white">Quick Start</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold">
                  1
                </div>
                <span className="text-muted-foreground">
                  Choose your role: Clipper, Streamer, or Agency
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-secondary text-white flex items-center justify-center text-sm font-bold">
                  2
                </div>
                <span className="text-muted-foreground">
                  Complete your profile setup
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-success text-white flex items-center justify-center text-sm font-bold">
                  3
                </div>
                <span className="text-muted-foreground">
                  Start creating content or streaming
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-warning text-warning-foreground flex items-center justify-center text-sm font-bold">
                  4
                </div>
                <span className="text-muted-foreground">
                  Earn rewards and grow your community
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
