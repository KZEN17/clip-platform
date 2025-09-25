"use client";
import { LaunchCreator } from "@/components/launch/LaunchCreator";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Bell,
  Calendar,
  CheckCircle,
  Clock,
  Eye,
  Plus,
  Share2,
  Star,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";

export default function LaunchCalendarPage() {
  const [activeTab, setActiveTab] = useState("calendar");
  const [selectedDate, setSelectedDate] = useState(18);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

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
              {/* Moon Master */}
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

              {/* Crypto Queen */}
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

              {/* Rocket Man */}
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
                <h3 className="font-bold text-white flex items-center gap-2 mb-6">
                  <Calendar className="w-5 h-5 text-purple-400" />
                  Launch Calendar
                </h3>

                <div className="text-center mb-6">
                  <h4 className="font-semibold text-white text-lg">
                    September 2025
                  </h4>
                </div>

                <div className="grid grid-cols-7 gap-1 text-center text-sm mb-4">
                  {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                    <div key={day} className="p-2 text-gray-400 font-medium">
                      {day}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-1 text-center">
                  {Array.from({ length: 30 }, (_, i) => {
                    const day = i + 1;
                    const isSelected = day === selectedDate;
                    const hasEvent = [18, 20, 25].includes(day);

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
              </div>

              {/* Launch Details */}
              <div className="lg:col-span-2 space-y-6">
                <h3 className="text-2xl font-bold text-white">
                  Launches for {selectedDate}/09/2025
                </h3>

                {selectedDate === 18 ? (
                  <div className="space-y-6">
                    {/* Unlocked Launch */}
                    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex items-center gap-4 flex-1">
                          <div className="w-16 h-16 rounded-full bg-gray-600 flex items-center justify-center">
                            <span className="font-bold text-lg text-white">
                              MM
                            </span>
                          </div>
                          <div className="flex-1">
                            <h4 className="text-2xl font-bold text-white mb-2">
                              $MOON Token Launch Stream
                            </h4>
                            <p className="text-gray-300 flex items-center gap-2 mb-3">
                              <Star className="w-4 h-4 text-yellow-400" />
                              Moon Master
                            </p>
                            <p className="text-gray-400 mb-4">
                              Join us for the biggest token launch of the month!
                              Interactive stream with live trading.
                            </p>

                            <div className="flex items-center gap-6 text-gray-400">
                              <span className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                8:00 PM GMT+1
                              </span>
                              <span className="flex items-center gap-2">
                                <Eye className="w-4 h-4" />
                                25,000 expected
                              </span>
                            </div>
                          </div>
                        </div>

                        <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
                          <CheckCircle className="w-4 h-4" />
                          Unlocked
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
                        <Button className="bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:from-pink-400 hover:to-purple-400">
                          Stream
                        </Button>
                      </div>
                    </div>

                    {/* Locked Launch */}
                    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex items-center gap-4 flex-1">
                          <div className="w-16 h-16 rounded-full bg-gray-600 flex items-center justify-center">
                            <span className="font-bold text-lg text-white">
                              ?
                            </span>
                          </div>
                          <div className="flex-1">
                            <h4 className="text-2xl font-bold text-white mb-2">
                              Mystery Launch
                            </h4>
                            <p className="text-gray-300 flex items-center gap-2 mb-3">
                              <Star className="w-4 h-4 text-yellow-400" />
                              ???
                            </p>
                            <p className="text-gray-400 mb-4">
                              Unlock this exclusive launch by contributing to
                              pre-donations! Big surprise awaits...
                            </p>

                            <div className="flex items-center gap-6 text-gray-400">
                              <span className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                12:00 AM GMT+1
                              </span>
                              <span className="flex items-center gap-2">
                                <Eye className="w-4 h-4" />
                                18,000 expected
                              </span>
                            </div>
                          </div>
                        </div>

                        <span className="bg-orange-500/20 text-orange-400 border border-orange-500/50 px-4 py-2 rounded-full text-sm font-medium">
                          Locked - Contribute to Unlock
                        </span>
                      </div>

                      {/* Contribution Section */}
                      <div className="bg-gray-700/50 rounded-lg p-4 mb-6">
                        <div className="flex items-center justify-between text-sm mb-3">
                          <span className="text-white font-semibold">
                            Contribution Goal
                          </span>
                          <span className="text-white font-bold">
                            $750 of $1000 raised
                          </span>
                        </div>

                        <div className="w-full bg-gray-600 rounded-full h-3 mb-4">
                          <div
                            className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full"
                            style={{ width: "75%" }}
                          />
                        </div>

                        <div className="flex gap-2 mb-4">
                          <Button className="bg-purple-500/20 border border-purple-500/50 text-purple-400 hover:bg-purple-500/30 hover:text-purple-300">
                            $25
                          </Button>
                          <Button className="bg-purple-500/20 border border-purple-500/50 text-purple-400 hover:bg-purple-500/30 hover:text-purple-300">
                            $50
                          </Button>
                          <Button className="bg-purple-500/20 border border-purple-500/50 text-purple-400 hover:bg-purple-500/30 hover:text-purple-300">
                            $100
                          </Button>
                        </div>

                        <div className="flex gap-2">
                          <Input
                            placeholder="Custom amount"
                            className="flex-1 bg-gray-600 border-gray-500 text-white placeholder:text-gray-400"
                          />
                          <Button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-400 hover:to-pink-400 font-semibold">
                            Contribute
                          </Button>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <Button className="bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white border border-gray-600">
                          <Share2 className="w-4 h-4 mr-2" />
                          Share
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-gray-800 rounded-xl p-12 border border-gray-700 text-center">
                    <Calendar className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">
                      No events scheduled
                    </h3>
                    <p className="text-gray-400 mb-6">
                      No launches scheduled for {selectedDate}/09/2025
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
              {[
                {
                  title: "$PUMP Launch Event",
                  date: "Dec 15, 2024",
                  streamer: "@pumpmaster",
                  clips: "24",
                  views: "450K",
                  fees: "$1250",
                },
                {
                  title: "$HODL Stream Marathon",
                  date: "Dec 12, 2024",
                  streamer: "@hodlking",
                  clips: "18",
                  views: "320K",
                  fees: "$980",
                },
                {
                  title: "$MEME Token Reveal",
                  date: "Dec 10, 2024",
                  streamer: "@memelord",
                  clips: "31",
                  views: "580K",
                  fees: "$1750",
                },
              ].map((launch, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-6 border-b border-gray-700 last:border-b-0"
                >
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">
                      {launch.title}
                    </h3>
                    <p className="text-gray-400">
                      {launch.date} • {launch.streamer}
                    </p>
                  </div>

                  <div className="flex items-center gap-12">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-400">
                        {launch.clips}
                      </div>
                      <div className="text-sm text-gray-500">Clips</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-cyan-400 flex items-center gap-1">
                        <Eye className="w-5 h-5" />
                        {launch.views}
                      </div>
                      <div className="text-sm text-gray-500">Views</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-emerald-400">
                        {launch.fees}
                      </div>
                      <div className="text-sm text-gray-500">Fees</div>
                    </div>
                  </div>
                </div>
              ))}
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
              <Button className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-400 hover:to-rose-400 text-white font-semibold rounded-full px-8 py-3 text-lg">
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
          onSuccess={() => {
            console.log("Launch created successfully");
          }}
        />
      </div>
    </MainLayout>
  );
}
