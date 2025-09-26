"use client";
import { LaunchCreator } from "@/components/launch/LaunchCreator";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/useToast";
import { databases } from "@/lib/appwrite";
import { LaunchEvent } from "@/lib/launchSchema";
import { Query } from "appwrite";
import {
  Bell,
  Calendar,
  CheckCircle,
  Clock,
  Eye,
  Plus,
  RefreshCw,
  Share2,
  Star,
  TrendingUp,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function LaunchCalendarPage() {
  const [activeTab, setActiveTab] = useState("calendar");
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
    loadLaunchEvents(); // Reload events after creating new one
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

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const eventsForSelectedDate = getEventsForDate(
    selectedDate,
    selectedMonth,
    selectedYear
  );
  const datesWithEvents = getDatesWithEvents();

  // Generate calendar days (simplified version)
  const generateCalendarDays = () => {
    const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
    const days = [];
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  };

  const calendarDays = generateCalendarDays();
  console.log("Launch events loaded:", launchEvents);
  console.log("Events for selected date:", eventsForSelectedDate);
  console.log("Dates with events:", datesWithEvents);
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
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white flex items-center justify-center gap-3 mb-3">
                <CheckCircle className="w-8 h-8 text-emerald-400" />
                Success Stories
              </h2>
              <p className="text-gray-300 text-lg">
                Real streamers, real results
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Example success stories - these could also be fetched from database */}
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-emerald-500/50 transition-all">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-gray-600 flex items-center justify-center">
                    <span className="font-bold text-white">MM</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-white">Moon Master</h4>
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                    </div>
                    <p className="text-sm text-gray-400">@moonmaster</p>
                  </div>
                  <span className="bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    $MOON
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-emerald-400">
                      $125K
                    </div>
                    <div className="text-xs text-gray-500">Raised</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-cyan-400">250K</div>
                    <div className="text-xs text-gray-500">Views</div>
                  </div>
                </div>

                <div className="bg-gray-700 rounded-lg p-3 border-l-4 border-emerald-400 mb-4">
                  <p className="text-sm italic text-gray-300">
                    &quot;Hit 25K views in 24h!&quot;
                  </p>
                </div>

                <div className="flex items-center justify-center gap-2 text-sm text-emerald-400">
                  <CheckCircle className="w-4 h-4" />
                  <span className="font-medium">Unlocked Success</span>
                </div>
              </div>

              {/* More success story cards... */}
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-emerald-500/50 transition-all">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-gray-600 flex items-center justify-center">
                    <span className="font-bold text-white">CQ</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-white">Crypto Queen</h4>
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                    </div>
                    <p className="text-sm text-gray-400">@cryptoqueen</p>
                  </div>
                  <span className="bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    $DIAMOND
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-emerald-400">
                      $89K
                    </div>
                    <div className="text-xs text-gray-500">Raised</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-cyan-400">180K</div>
                    <div className="text-xs text-gray-500">Views</div>
                  </div>
                </div>

                <div className="bg-gray-700 rounded-lg p-3 border-l-4 border-emerald-400 mb-4">
                  <p className="text-sm italic text-gray-300">
                    &quot;Community funded in 10 minutes!&quot;
                  </p>
                </div>

                <div className="flex items-center justify-center gap-2 text-sm text-emerald-400">
                  <CheckCircle className="w-4 h-4" />
                  <span className="font-medium">Unlocked Success</span>
                </div>
              </div>

              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-emerald-500/50 transition-all">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-gray-600 flex items-center justify-center">
                    <span className="font-bold text-white">RM</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-white">Rocket Man</h4>
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                    </div>
                    <p className="text-sm text-gray-400">@rocketman</p>
                  </div>
                  <span className="bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    $ROCKET
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-emerald-400">
                      $67K
                    </div>
                    <div className="text-xs text-gray-500">Raised</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-cyan-400">145K</div>
                    <div className="text-xs text-gray-500">Views</div>
                  </div>
                </div>

                <div className="bg-gray-700 rounded-lg p-3 border-l-4 border-emerald-400 mb-4">
                  <p className="text-sm italic text-gray-300">
                    &quot;Turned 2K followers into 15K overnight!&quot;
                  </p>
                </div>

                <div className="flex items-center justify-center gap-2 text-sm text-emerald-400">
                  <CheckCircle className="w-4 h-4" />
                  <span className="font-medium">Unlocked Success</span>
                </div>
              </div>
            </div>

            <div className="text-center">
              <Button className="border-2 border-emerald-400 bg-transparent text-emerald-400 hover:bg-emerald-400/10 rounded-full px-8 py-2 font-medium">
                See More Success Stories
              </Button>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-gray-800 rounded-full p-1 flex max-w-2xl mx-auto">
            {[
              { id: "calendar", label: "Calendar View" },
              { id: "streamers", label: "Streamers" },
              { id: "upcoming", label: "Upcoming" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 px-6 py-3 rounded-full text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? "bg-gray-900 text-white shadow-lg"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Calendar Content */}
          {activeTab === "calendar" && (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Calendar Widget */}
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold text-white flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-purple-400" />
                    Launch Calendar
                  </h3>
                  {!loading && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={loadLaunchEvents}
                      className="text-gray-400 hover:text-white"
                    >
                      <RefreshCw className="w-4 h-4" />
                    </Button>
                  )}
                </div>

                <div className="text-center mb-6">
                  <h4 className="font-semibold text-white text-lg">
                    {monthNames[selectedMonth]} {selectedYear}
                  </h4>
                </div>

                <div className="grid grid-cols-7 gap-1 text-center text-sm mb-4">
                  {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                    <div key={day} className="p-2 text-gray-400 font-medium">
                      {day}
                    </div>
                  ))}
                </div>

                {loading ? (
                  <div className="flex justify-center py-8">
                    <RefreshCw className="w-6 h-6 text-purple-400 animate-spin" />
                  </div>
                ) : (
                  <div className="grid grid-cols-7 gap-1 text-center">
                    {calendarDays.map((day) => {
                      const isSelected = day === selectedDate;
                      const hasEvent = datesWithEvents.includes(day);

                      return (
                        <button
                          key={day}
                          onClick={() => setSelectedDate(day)}
                          className={`p-2 rounded text-sm font-medium transition-all ${
                            isSelected
                              ? "bg-purple-500 text-white"
                              : hasEvent
                              ? "text-purple-400 bg-purple-400/20 hover:bg-purple-400/30"
                              : "text-gray-400 hover:text-white hover:bg-gray-700"
                          }`}
                        >
                          {day}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Launch Details */}
              <div className="lg:col-span-2 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-white">
                    Launches for {selectedDate}/{selectedMonth + 1}/
                    {selectedYear}
                  </h3>
                  {loading && (
                    <RefreshCw className="w-5 h-5 text-gray-400 animate-spin" />
                  )}
                </div>

                {eventsForSelectedDate.length > 0 ? (
                  <div className="space-y-6">
                    {eventsForSelectedDate.map((event) => (
                      <div
                        key={event.$id}
                        className="bg-gray-800 rounded-xl p-6 border border-gray-700"
                      >
                        <div className="flex items-start justify-between mb-6">
                          <div className="flex items-center gap-4 flex-1">
                            {event.tokenLogo ? (
                              <div className="w-16 h-16 rounded-full overflow-hidden border border-gray-600">
                                <Image
                                  src={event.tokenLogo}
                                  alt={event.tokenSymbol || "Token"}
                                  width={64}
                                  height={64}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            ) : (
                              <div className="w-16 h-16 rounded-full bg-gray-600 flex items-center justify-center">
                                <span className="font-bold text-lg text-white">
                                  {event.tokenSymbol?.slice(0, 2) ||
                                    event.streamerName
                                      ?.slice(0, 2)
                                      .toUpperCase() ||
                                    "?"}
                                </span>
                              </div>
                            )}
                            <div className="flex-1">
                              <h4 className="text-2xl font-bold text-white mb-2">
                                {event.launchTitle}
                              </h4>
                              <p className="text-gray-300 flex items-center gap-2 mb-3">
                                <Star className="w-4 h-4 text-yellow-400" />
                                {event.streamerName}
                              </p>
                              {event.description && (
                                <p className="text-gray-400 mb-4">
                                  {event.description}
                                </p>
                              )}

                              <div className="flex items-center gap-6 text-gray-400">
                                <span className="flex items-center gap-2">
                                  <Clock className="w-4 h-4" />
                                  {new Date(
                                    event.scheduledDate
                                  ).toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    timeZoneName: "short",
                                  })}
                                </span>
                                {event.expectedViews && (
                                  <span className="flex items-center gap-2">
                                    <Eye className="w-4 h-4" />
                                    {event.expectedViews.toLocaleString()}{" "}
                                    expected
                                  </span>
                                )}
                                {event.streamPlatform && (
                                  <span className="capitalize">
                                    {event.streamPlatform}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          <span
                            className={`px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 ${
                              event.status === "scheduled"
                                ? "bg-blue-500/20 text-blue-400 border border-blue-500/50"
                                : event.status === "live"
                                ? "bg-green-500/20 text-green-400 border border-green-500/50"
                                : "bg-gray-500/20 text-gray-400 border border-gray-500/50"
                            }`}
                          >
                            {event.status === "scheduled" && (
                              <Clock className="w-4 h-4" />
                            )}
                            {event.status === "live" && (
                              <CheckCircle className="w-4 h-4" />
                            )}
                            {event.status.charAt(0).toUpperCase() +
                              event.status.slice(1)}
                          </span>
                        </div>

                        <div className="flex gap-3">
                          <Button className="bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white border border-gray-600">
                            <Share2 className="w-4 h-4 mr-2" />
                            Share
                          </Button>
                          <Button className="bg-purple-500 text-white hover:bg-purple-400">
                            <Bell className="w-4 h-4 mr-2" />
                            Notify Me
                          </Button>
                          {event.status === "live" && (
                            <Button className="bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:from-pink-400 hover:to-purple-400">
                              Stream
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-gray-800 rounded-xl p-12 border border-gray-700 text-center">
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
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Past Launches */}
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-white flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-cyan-400" />
              Past Launches
            </h2>

            <div className="space-y-6">
              {launchEvents
                .filter((event) => event.status === "completed")
                .slice(0, 3)
                .map((launch) => (
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
                ))}

              {launchEvents.filter((event) => event.status === "completed")
                .length === 0 && (
                <div className="text-center py-8">
                  <TrendingUp className="w-12 h-12 mx-auto text-gray-500 mb-4" />
                  <p className="text-gray-400">No completed launches yet</p>
                </div>
              )}
            </div>
          </div>

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
