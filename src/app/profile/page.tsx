import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Calendar,
  DollarSign,
  Edit,
  Settings,
  Trophy,
  User,
} from "lucide-react";

export default function ProfilePage() {
  const currentUser = {
    name: "zack.kargeen",
  };

  const stats = [
    {
      label: "Total Earnings",
      value: "$0.00",
      icon: DollarSign,
      color: "text-success",
    },
    { label: "Clips Created", value: "0", icon: Trophy, color: "text-primary" },
    {
      label: "Member Since",
      value: "Dec 2024",
      icon: Calendar,
      color: "text-accent",
    },
  ];

  return (
    <MainLayout currentUser={currentUser}>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <User className="w-8 h-8 text-success" />
            <h1 className="text-3xl font-bold text-white">Profile</h1>
          </div>
          <Button variant="outline" className="gap-2">
            <Edit className="w-4 h-4" />
            Edit Profile
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <Card className="bg-card/50 border-border">
              <CardContent className="p-6 text-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-2xl">
                    {currentUser.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-white mb-2">
                  {currentUser.name}
                </h2>
                <div className="flex items-center justify-center gap-2 mb-4">
                  <div className="w-2 h-2 rounded-full bg-success"></div>
                  <span className="text-sm text-muted-foreground">Online</span>
                </div>
                <p className="text-muted-foreground text-sm mb-4">
                  New to CLIP platform. Ready to start creating viral content!
                </p>
                <Button className="w-full gap-2">
                  <Settings className="w-4 h-4" />
                  Account Settings
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Stats and Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <Card key={index} className="bg-card/50 border-border">
                    <CardContent className="p-4 text-center">
                      <Icon className={`w-8 h-8 mx-auto mb-2 ${stat.color}`} />
                      <p className="text-2xl font-bold text-white mb-1">
                        {stat.value}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {stat.label}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <Card className="bg-card/50 border-border">
              <CardHeader>
                <CardTitle className="text-white">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Trophy className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-white mb-2">
                    No Activity Yet
                  </h3>
                  <p className="text-muted-foreground">
                    Start creating clips or streaming to see your activity here.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border">
              <CardHeader>
                <CardTitle className="text-white">Achievements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Trophy className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-white mb-2">
                    No Achievements Yet
                  </h3>
                  <p className="text-muted-foreground">
                    Earn your first achievement by completing your profile
                    setup.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
