// src/components/auth/AuthModal.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";
import { Lock, Mail, X } from "lucide-react";
import { useEffect, useState } from "react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: "signin" | "signup";
  onSuccess?: () => void;
}

export const AuthModal = ({
  isOpen,
  onClose,
  initialMode = "signin",
  onSuccess,
}: AuthModalProps) => {
  const [isSignIn, setIsSignIn] = useState(initialMode === "signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showVerificationMessage, setShowVerificationMessage] = useState(false);

  const { login, register } = useAuth();

  // Update mode when modal opens with different initial mode
  useEffect(() => {
    setIsSignIn(initialMode === "signin");
  }, [initialMode, isOpen]);

  if (!isOpen) return null;

  const handleGoogleAuth = async () => {
    setLoading(true);
    setError("");

    try {
      // TODO: Implement Google OAuth with Appwrite
      // await account.createOAuth2Session('google', 'http://localhost:3000/auth/success', 'http://localhost:3000/auth/failure');
      console.log("Google auth not implemented yet");
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Google authentication failed";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (isSignIn) {
        await login(email, password);
        onSuccess?.();
        onClose();
      } else {
        // Validation for sign up
        if (password !== confirmPassword) {
          setError("Passwords do not match");
          setLoading(false);
          return;
        }

        if (password.length < 8) {
          setError("Password must be at least 8 characters long");
          setLoading(false);
          return;
        }

        await register(email, password, name);
        setShowVerificationMessage(true);
      }
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Authentication failed";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleBrowse = () => {
    onClose();
  };

  // Show verification message after successful registration
  if (showVerificationMessage) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        />
        <Card className="relative w-full max-w-md mx-4 bg-gray-800 border-gray-700 shadow-2xl">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 z-10 text-gray-400 hover:text-white"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>

          <CardHeader className="text-center pb-4">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Check Your Email
            </h2>
            <p className="text-gray-400">
              We&apos;ve sent a verification link to{" "}
              <strong className="text-white">{email}</strong>
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="bg-gray-700/50 rounded-lg p-4 border border-gray-600">
              <h3 className="font-semibold text-white mb-2">Next Steps:</h3>
              <ol className="text-sm text-gray-400 space-y-2">
                <li>1. Check your email inbox</li>
                <li>2. Click the verification link</li>
                <li>3. Return here to complete onboarding</li>
              </ol>
            </div>

            <div className="text-center">
              <Button
                onClick={onClose}
                className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white"
              >
                Got it!
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      <Card className="relative w-full max-w-md mx-4 bg-gray-800 border-gray-700 shadow-2xl">
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 z-10 text-gray-400 hover:text-white"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>

        <CardHeader className="text-center pb-4">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 bg-clip-text text-transparent mb-2">
            Join the Adventure
          </h2>
          <p className="text-gray-400">
            Sign in to access all features and start your journey
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

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

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-600" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-gray-800 px-2 text-gray-400">OR</span>
            </div>
          </div>

          <div className="grid grid-cols-2 p-1 bg-gray-700/30 rounded-lg">
            <Button
              type="button"
              variant={isSignIn ? "default" : "ghost"}
              className={cn(
                "h-9 transition-all",
                isSignIn
                  ? "bg-gray-900 text-white shadow-sm"
                  : "text-gray-400 hover:text-white hover:bg-gray-700"
              )}
              onClick={() => {
                setIsSignIn(true);
                setError("");
              }}
            >
              Sign In
            </Button>
            <Button
              type="button"
              variant={!isSignIn ? "default" : "ghost"}
              className={cn(
                "h-9 transition-all",
                !isSignIn
                  ? "bg-gray-900 text-white shadow-sm"
                  : "text-gray-400 hover:text-white hover:bg-gray-700"
              )}
              onClick={() => {
                setIsSignIn(false);
                setError("");
              }}
            >
              Sign Up
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isSignIn && (
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-white"
                >
                  Name
                </label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:border-pink-500 focus:ring-pink-500"
                  required
                />
              </div>
            )}

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-white">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:border-pink-500 focus:ring-pink-500"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-sm font-medium text-white"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:border-pink-500 focus:ring-pink-500"
                  required
                />
              </div>
            </div>

            {!isSignIn && (
              <div className="space-y-2">
                <label
                  htmlFor="confirmPassword"
                  className="text-sm font-medium text-white"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="pl-10 bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:border-pink-500 focus:ring-pink-500"
                    required
                  />
                </div>
              </div>
            )}

            <Button
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-medium"
              disabled={loading}
            >
              {loading ? "Processing..." : isSignIn ? "Sign In" : "Sign Up"}
            </Button>
          </form>

          <div className="text-center">
            <Button
              variant="ghost"
              onClick={handleBrowse}
              className="text-sm text-gray-400 hover:text-white"
            >
              Just browsing? Walk around!
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
