import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, Users, Zap } from "lucide-react";

export default function RaidChatPage() {
  const currentUser = {
    name: "zack.kargeen",
  };

  return (
    <MainLayout currentUser={currentUser}>
      <div className="p-6 space-y-6">
        <div className="flex items-center gap-3">
          <MessageCircle className="w-8 h-8 text-accent" />
          <h1 className="text-3xl font-bold text-white">Raid Chat</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-card/50 border-border">
            <CardContent className="p-6 text-center">
              <Users className="w-12 h-12 text-success mx-auto mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">
                Online Users
              </h3>
              <p className="text-2xl font-bold text-success">0</p>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border">
            <CardContent className="p-6 text-center">
              <Zap className="w-12 h-12 text-warning mx-auto mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">
                Active Raids
              </h3>
              <p className="text-2xl font-bold text-warning">0</p>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border">
            <CardContent className="p-6 text-center">
              <MessageCircle className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">Messages</h3>
              <p className="text-2xl font-bold text-primary">0</p>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-card/50 border-border">
          <CardHeader>
            <CardTitle className="text-white">Chat Rooms</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <MessageCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">
                No Active Chats
              </h3>
              <p className="text-muted-foreground">
                Join or create a raid chat to connect with other creators and
                clippers.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
