// src/components/layout/Sidebar.tsx
"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";
import {
  BookOpen,
  Calendar,
  Home,
  Menu,
  MessageCircle,
  TrendingUp,
  Trophy,
  User,
  X,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";

export const Sidebar = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();
  const { user } = useAuth();

  const navigationItems = [
    {
      name: "Home",
      href: "/",
      icon: Home,
      color: "text-teal-400",
      hoverColor: "hover:bg-teal-400/10 hover:text-teal-300",
      activeColor: "text-teal-400 bg-teal-400/10",
      borderColor: "bg-teal-400",
    },
    {
      name: "Launch Calendar",
      href: "/calendar",
      icon: Calendar,
      color: "text-emerald-400",
      hoverColor: "hover:bg-emerald-400/10 hover:text-emerald-300",
      activeColor: "text-emerald-400 bg-emerald-400/10",
      borderColor: "bg-emerald-400",
    },
    {
      name: "Rewards",
      href: "/rewards",
      icon: Trophy,
      color: "text-cyan-400",
      hoverColor: "hover:bg-cyan-400/10 hover:text-cyan-300",
      activeColor: "text-cyan-400 bg-cyan-400/10",
      borderColor: "bg-cyan-400",
    },
    {
      name: "Raid Chat",
      href: "/chat",
      icon: MessageCircle,
      color: "text-teal-500",
      hoverColor: "hover:bg-teal-500/10 hover:text-teal-400",
      activeColor: "text-teal-500 bg-teal-500/10",
      borderColor: "bg-teal-500",
    },
    {
      name: "Leaderboards",
      href: "/leaderboards",
      icon: TrendingUp,
      color: "text-green-400",
      hoverColor: "hover:bg-green-400/10 hover:text-green-300",
      activeColor: "text-green-400 bg-green-400/10",
      borderColor: "bg-green-400",
    },
    {
      name: "Guide",
      href: "/guide",
      icon: BookOpen,
      color: "text-blue-400",
      hoverColor: "hover:bg-blue-400/10 hover:text-blue-300",
      activeColor: "text-blue-400 bg-blue-400/10",
      borderColor: "bg-blue-400",
    },
    {
      name: "Profile",
      href: "/profile",
      icon: User,
      color: "text-indigo-400",
      hoverColor: "hover:bg-indigo-400/10 hover:text-indigo-300",
      activeColor: "text-indigo-400 bg-indigo-400/10",
      borderColor: "bg-indigo-400",
    },
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-black border-r border-gray-900">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b border-gray-900">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-teal-400 via-emerald-400 to-cyan-400 flex items-center justify-center shadow-teal">
          <span className="text-black font-bold text-sm">C</span>
        </div>
        <span className="font-bold text-lg text-gradient-teal">ClipStream</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-2">
        <div className="space-y-1">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <div key={item.name} className="relative">
                {isActive && (
                  <div
                    className={`absolute left-0 top-0 bottom-0 w-1 ${item.borderColor} rounded-r-full z-10`}
                  />
                )}
                <a
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group relative",
                    isActive
                      ? item.activeColor
                      : `text-gray-400 ${item.hoverColor} hover:scale-105`
                  )}
                >
                  <Icon className="w-5 h-5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="group-hover:translate-x-1 transition-transform">
                    {item.name}
                  </span>
                </a>
              </div>
            );
          })}
        </div>
      </nav>

      {/* User Profile or Guest Message */}
      <div className="p-4 border-t border-gray-900">
        {user ? (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-teal-400 to-emerald-400 flex items-center justify-center shadow-teal">
              <span className="text-black font-medium text-sm">
                {user.name?.charAt(0).toUpperCase() ||
                  user.email.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                {user.name || user.email}
              </p>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-teal-400"></div>
                <span className="text-xs text-gray-400">Online</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center"></div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden bg-black/80 backdrop-blur-sm border border-gray-900 hover:bg-teal-400/10"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        {isMobileOpen ? (
          <X className="h-5 w-5 text-white" />
        ) : (
          <Menu className="h-5 w-5 text-white" />
        )}
      </Button>

      {/* Mobile Sidebar Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden bg-black/50 backdrop-blur-sm"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <div
        className={cn(
          "fixed left-0 top-0 z-40 h-full w-64 transform transition-transform duration-300 ease-in-out lg:hidden",
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <SidebarContent />
      </div>

      {/* Desktop Sidebar */}
      <div className="fixed left-0 top-0 z-30 h-full w-64 bg-black border-r border-gray-900 hidden lg:block">
        <SidebarContent />
      </div>
    </>
  );
};
