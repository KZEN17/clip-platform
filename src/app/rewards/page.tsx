import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Gift, Trophy } from "lucide-react";

export default function RewardsPage() {
  const currentUser = {
    name: "zack.kargeen",
  };

  return (
    <MainLayout currentUser={currentUser}>
      <div className="p-6 space-y-6">
        <div className="flex items-center gap-3">
          <Gift className="w-8 h-8 text-success" />
          <h1 className="text-3xl font-bold text-white">Rewards</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-card/50 border-border">
            <CardContent className="p-6 text-center">
              <Trophy className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">
                Total Earned
              </h3>
              <p className="text-2xl font-bold text-success">$0.00</p>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border">
            <CardContent className="p-6 text-center">
              <DollarSign className="w-12 h-12 text-secondary mx-auto mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">Pending</h3>
              <p className="text-2xl font-bold text-warning">$0.00</p>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border">
            <CardContent className="p-6 text-center">
              <Gift className="w-12 h-12 text-accent mx-auto mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">Available</h3>
              <p className="text-2xl font-bold text-white">$0.00</p>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-card/50 border-border">
          <CardHeader>
            <CardTitle className="text-white">Reward History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <Gift className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">
                No Rewards Yet
              </h3>
              <p className="text-muted-foreground">
                Start creating viral clips to earn your first rewards!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
