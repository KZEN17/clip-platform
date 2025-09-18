"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Lock, Mail, X } from "lucide-react";
import { useState } from "react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const AuthModal = ({ isOpen, onClose, onSuccess }: AuthModalProps) => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleGoogleAuth = async () => {
    setLoading(true);
    // TODO: Implement Google OAuth with Appwrite
    console.log("Google auth clicked");
    setTimeout(() => setLoading(false), 1000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // TODO: Implement Appwrite authentication
    if (isSignIn) {
      console.log("Sign in:", { email, password });
    } else {
      if (password !== confirmPassword) {
        alert("Passwords do not match");
        setLoading(false);
        return;
      }
      console.log("Sign up:", { email, password });
    }

    setTimeout(() => {
      setLoading(false);
      onSuccess?.();
    }, 1000);
  };

  const handleBrowse = () => {
    onClose();
    // Allow browsing without authentication
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <Card className="relative w-full max-w-md mx-4 bg-card border-border shadow-2xl">
        {/* Close Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 z-10 text-muted-foreground hover:text-foreground"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>

        <CardHeader className="text-center pb-4">
          <h2 className="text-2xl font-bold text-gradient-rainbow mb-2">
            Join the Adventure
          </h2>
          <p className="text-muted-foreground">
            Sign in to access all features and start your journey
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Google Auth Button */}
          <Button
            onClick={handleGoogleAuth}
            disabled={loading}
            className="w-full h-12 bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 rounded-lg font-medium transition-colors"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </Button>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">OR</span>
            </div>
          </div>

          {/* Tab Buttons */}
          <div className="grid grid-cols-2 p-1 bg-muted/20 rounded-lg">
            <Button
              type="button"
              variant={isSignIn ? "default" : "ghost"}
              className={cn(
                "h-9 transition-all",
                isSignIn && "bg-background text-foreground shadow-sm"
              )}
              onClick={() => setIsSignIn(true)}
            >
              Sign In
            </Button>
            <Button
              type="button"
              variant={!isSignIn ? "default" : "ghost"}
              className={cn(
                "h-9 transition-all",
                !isSignIn && "bg-background text-foreground shadow-sm"
              )}
              onClick={() => setIsSignIn(false)}
            >
              Sign Up
            </Button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            {!isSignIn && (
              <div className="space-y-2">
                <label
                  htmlFor="confirmPassword"
                  className="text-sm font-medium"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
            )}

            <Button
              type="submit"
              variant="gradient"
              className="w-full h-12"
              disabled={loading}
            >
              {loading ? "Processing..." : isSignIn ? "Sign In" : "Sign Up"}
            </Button>
          </form>

          {/* Browse Option */}
          <div className="text-center">
            <Button
              variant="ghost"
              onClick={handleBrowse}
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Just browsing? Walk around! 👋
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
