import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";

export default function LaunchCalendarPage() {
  const currentUser = {
    name: "zack.kargeen",
  };

  return (
    <MainLayout currentUser={currentUser}>
      <div className="p-6 space-y-6">
        <div className="flex items-center gap-3">
          <Calendar className="w-8 h-8 text-primary" />
          <h1 className="text-3xl font-bold text-white">Launch Calendar</h1>
        </div>

        <Card className="bg-card/50 border-border">
          <CardHeader>
            <CardTitle className="text-white">
              Upcoming Token Launches
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">
                Coming Soon
              </h3>
              <p className="text-muted-foreground">
                Launch Calendar functionality will be available soon. Track
                upcoming token launches and streaming events.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
