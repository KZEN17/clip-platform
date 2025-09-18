"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  BookOpen,
  Calendar,
  Gift,
  Home,
  Menu,
  MessageCircle,
  TrendingUp,
  User,
  X,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface SidebarProps {
  currentUser?: {
    name: string;
    avatar?: string;
  };
}

export const Sidebar = ({ currentUser }: SidebarProps) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  const navigationItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Launch Calendar", href: "/calendar", icon: Calendar },
    { name: "Rewards", href: "/rewards", icon: Gift },
    { name: "Raid Chat", href: "/chat", icon: MessageCircle },
    { name: "Leaderboards", href: "/leaderboards", icon: TrendingUp },
    { name: "Guide", href: "/guide", icon: BookOpen },
    { name: "Profile", href: "/profile", icon: User },
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-background border-r border-border">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b border-border">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-success to-primary flex items-center justify-center">
          <span className="text-white font-bold text-sm">C</span>
        </div>
        <span className="font-bold text-lg text-white">ClipStream</span>
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
                    className="absolute left-0 top-0 bottom-0 w-1 bg-success rounded-r-full z-10"
                    style={{ backgroundColor: "#3CFF88" }}
                  />
                )}
                <a
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group relative",
                    isActive
                      ? "text-success bg-success/10"
                      : "text-muted-foreground hover:text-white hover:bg-white/5 hover:scale-105"
                  )}
                  style={isActive ? { color: "#3CFF88" } : {}}
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

      {/* User Profile */}
      {currentUser && (
        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
              <span className="text-white font-medium text-sm">
                {currentUser.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                {currentUser.name}
              </p>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-success"></div>
                <span className="text-xs text-muted-foreground">Online</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden bg-background/80 backdrop-blur-sm border border-border"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        {isMobileOpen ? (
          <X className="h-5 w-5" />
        ) : (
          <Menu className="h-5 w-5" />
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
      <div className="fixed left-0 top-0 z-30 h-full w-64 bg-background border-r border-border hidden lg:block">
        <SidebarContent />
      </div>
    </>
  );
};
