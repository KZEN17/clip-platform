"use client";

import { CalendarWidget } from "@/components/campaign/CalendarWidget";
import { LaunchEventCard } from "@/components/campaign/LaunchEventCard";
import { PastLaunches } from "@/components/campaign/PastLaunches";
import { SuccessStories } from "@/components/campaign/SuccessStories";
import { LaunchCreator } from "@/components/launch/LaunchCreator";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/useToast";
import { databases } from "@/lib/appwrite";
import { LaunchEvent } from "@/lib/launchSchema";
import { Query } from "appwrite";
import { Bell, Calendar, Plus, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";

export default function LaunchCalendarPage() {
  const [selectedDate, setSelectedDate] = useState(new Date().getDate());
  const [selectedMonth] = useState(new Date().getMonth());
  const [selectedYear] = useState(new Date().getFullYear());
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [launchEvents, setLaunchEvents] = useState<LaunchEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Load launch events from Appwrite
  useEffect(() => {
    loadLaunchEvents();
  }, []);

  const loadLaunchEvents = async () => {
    try {
      setLoading(true);
      setError(null);

      const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
      const collectionId =
        process.env.NEXT_PUBLIC_APPWRITE_LAUNCH_EVENTS_COLLECTION_ID;

      if (!databaseId || !collectionId) {
        console.warn("Database or collection ID not configured");
        setError("Database configuration missing");
        setLoading(false);
        return;
      }

      const response = await databases.listDocuments(databaseId, collectionId, [
        Query.orderDesc("scheduledDate"),
        Query.limit(100),
      ]);

      setLaunchEvents(response.documents as unknown as LaunchEvent[]);
    } catch (error) {
      console.error("Error loading launch events:", error);
      setError("Failed to load launch events");
      toast({
        title: "Error Loading Events",
        description: "Could not load launch events. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLaunchCreated = () => {
    setIsCreateModalOpen(false);
    loadLaunchEvents();
    toast({
      title: "Launch Event Created!",
      description: "Your token launch event has been scheduled successfully.",
    });
  };

  // Get events for selected date
  const getEventsForDate = (day: number, month: number, year: number) => {
    const selectedDateStr = `${year}-${(month + 1)
      .toString()
      .padStart(2, "0")}-${day.toString().padStart(2, "0")}`;

    return launchEvents.filter((event) => {
      const eventDate = new Date(event.scheduledDate);
      const eventDateStr = `${eventDate.getFullYear()}-${(
        eventDate.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}-${eventDate.getDate().toString().padStart(2, "0")}`;
      return eventDateStr === selectedDateStr;
    });
  };

  // Get dates that have events
  const getDatesWithEvents = () => {
    const dates = new Set<number>();
    launchEvents.forEach((event) => {
      const eventDate = new Date(event.scheduledDate);
      if (
        eventDate.getMonth() === selectedMonth &&
        eventDate.getFullYear() === selectedYear
      ) {
        dates.add(eventDate.getDate());
      }
    });
    return Array.from(dates);
  };

  const eventsForSelectedDate = getEventsForDate(
    selectedDate,
    selectedMonth,
    selectedYear
  );
  const datesWithEvents = getDatesWithEvents();
  const completedLaunches = launchEvents.filter(
    (event) => event.status === "completed"
  );

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-900 text-white">
        {/* Top Banner */}
        <div className="bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 mx-6 mt-6 rounded-lg p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-white">
                Launch your token stream today.
              </h3>
              <p className="text-sm text-blue-100">
                Create, stream, and get featured in the calendar.
              </p>
            </div>
          </div>
          <Button
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-white font-semibold rounded-full px-6 py-2 shadow-lg"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create a Launch
          </Button>
        </div>

        <div className="px-6 py-8 space-y-12">
          {/* Hero Section */}
          <div className="text-center space-y-6">
            <h1 className="text-5xl font-bold text-white">
              Never miss a pump.fun launch event
            </h1>

            <Button className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-400 hover:to-rose-400 text-white font-semibold rounded-full px-8 py-3 shadow-lg">
              <Bell className="w-4 h-4 mr-2" />
              Notifications On
            </Button>

            <div className="flex items-center justify-center gap-2 text-sm text-gray-300">
              <div className="w-2 h-2 rounded-full bg-purple-400" />
              Contributions unlock launches and fund initial allocation + DEX
              fees
            </div>
          </div>

          {/* Error State */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mx-auto max-w-2xl">
              <div className="text-center">
                <div className="text-red-400 mb-2">⚠️ Error</div>
                <p className="text-red-300">{error}</p>
                <Button
                  onClick={loadLaunchEvents}
                  className="mt-4 bg-red-500 hover:bg-red-600 text-white"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Try Again
                </Button>
              </div>
            </div>
          )}

          {/* Success Stories */}
          <SuccessStories
            completedLaunches={completedLaunches}
            loading={loading}
          />

          {/* Calendar Content */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Calendar Widget */}
            <CalendarWidget
              selectedDate={selectedDate}
              selectedMonth={selectedMonth}
              selectedYear={selectedYear}
              datesWithEvents={datesWithEvents}
              loading={loading}
              onDateSelect={setSelectedDate}
              onRefresh={loadLaunchEvents}
            />

            {/* Launch Details */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-white">
                  Launches for {selectedDate}/{selectedMonth + 1}/{selectedYear}
                </h3>
                {loading && (
                  <RefreshCw className="w-5 h-5 text-gray-400 animate-spin" />
                )}
              </div>

              {eventsForSelectedDate.length > 0 ? (
                <div className="space-y-6">
                  {eventsForSelectedDate.map((event) => (
                    <LaunchEventCard key={event.$id} event={event} />
                  ))}
                </div>
              ) : (
                <Card className="bg-gray-800 border-gray-700 text-center p-12">
                  <CardContent>
                    <Calendar className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">
                      No events scheduled
                    </h3>
                    <p className="text-gray-400 mb-6">
                      No launches scheduled for {selectedDate}/
                      {selectedMonth + 1}/{selectedYear}
                    </p>
                    <Button
                      onClick={() => setIsCreateModalOpen(true)}
                      className="bg-purple-500 text-white hover:bg-purple-400"
                    >
                      Create Your First Event
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Past Launches */}
          <PastLaunches
            completedLaunches={completedLaunches}
            loading={loading}
          />

          {/* CTA */}
          <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 rounded-xl p-8 text-center">
            <h2 className="text-4xl font-bold text-white mb-4">
              Want to Launch Your Token?
            </h2>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
              Get featured on our launch calendar and tap into our clipper
              network for maximum exposure.
            </p>
            <div className="flex justify-center gap-4">
              <Button
                onClick={() => setIsCreateModalOpen(true)}
                className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-400 hover:to-rose-400 text-white font-semibold rounded-full px-8 py-3 text-lg"
              >
                Submit Launch Request
              </Button>
              <Button className="border-2 border-purple-300 bg-transparent text-purple-300 hover:bg-purple-300/10 rounded-full px-8 py-3 text-lg font-semibold">
                View Launch Guide
              </Button>
            </div>
          </div>
        </div>

        {/* Launch Creator Modal */}
        <LaunchCreator
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onSuccess={handleLaunchCreated}
        />
      </div>
    </MainLayout>
  );
}
