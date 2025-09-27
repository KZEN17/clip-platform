// src/components/layout/TopBar.tsx
"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { LogOut, User } from "lucide-react";
import { useState } from "react";

interface TopBarProps {
  onSignInClick: () => void;
  onSignUpClick: () => void;
}

export const TopBar = ({ onSignInClick, onSignUpClick }: TopBarProps) => {
  const { user, logout } = useAuth();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await logout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <div className="fixed top-0 right-0 left-0 lg:left-64 z-20 bg-black/80 backdrop-blur-sm border-b border-gray-900">
      <div className="flex items-center justify-end px-6 py-4">
        {user ? (
          <div className="flex items-center gap-4">
            {/* User Info */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-teal-400 to-emerald-400 flex items-center justify-center shadow-teal">
                <span className="text-black font-medium text-sm">
                  {user.name?.charAt(0).toUpperCase() ||
                    user.email.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-white">
                  {user.name || user.email}
                </p>
                <p className="text-xs text-gray-400"></p>
              </div>
            </div>

            {/* User Actions */}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => (window.location.href = "/profile")}
                className="text-gray-300 hover:text-white hover:bg-gray-800"
              >
                <User className="w-4 h-4 mr-2" />
                Profile
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                disabled={loggingOut}
                className="text-gray-300 hover:text-white hover:bg-gray-800"
              >
                <LogOut className="w-4 h-4 mr-2" />
                {loggingOut ? "Signing out..." : "Sign Out"}
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              onClick={onSignInClick}
              className="text-gray-300 hover:text-white hover:bg-gray-800 font-medium"
            >
              Sign In
            </Button>

            <Button
              onClick={onSignUpClick}
              className="bg-gradient-cta hover:bg-gradient-cta-hover text-white font-medium shadow-teal transition-all duration-300"
            >
              Sign Up
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
