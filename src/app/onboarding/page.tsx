// src/app/onboarding/page.tsx
"use client";

import { OnboardingFlow } from "@/components/onboarding/OnboardingFlow";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { Mail, RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function OnboardingPage() {
  const {
    user,
    emailVerified,
    checkEmailVerification,
    sendVerification,
    loading,
  } = useAuth();
  const [checkingVerification, setCheckingVerification] = useState(false);
  const [resendingEmail, setResendingEmail] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Redirect if not logged in
    if (!loading && !user) {
      router.push("/");
      return;
    }

    // Check verification status on mount
    if (user && !emailVerified) {
      handleCheckVerification();
    }
  }, [user, loading, emailVerified, router]);

  const handleCheckVerification = async () => {
    setCheckingVerification(true);
    try {
      await checkEmailVerification();
    } catch (error) {
      console.error("Error checking verification:", error);
    } finally {
      setCheckingVerification(false);
    }
  };

  const handleResendEmail = async () => {
    setResendingEmail(true);
    try {
      await sendVerification();
    } catch (error) {
      console.error("Error resending email:", error);
    } finally {
      setResendingEmail(false);
    }
  };

  // Show loading while checking auth
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 text-pink-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect if no user
  if (!user) {
    return null;
  }

  // Show email verification prompt if not verified
  if (!emailVerified) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-gray-800 border-gray-700 shadow-2xl">
          <CardHeader className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-white">
              Verify Your Email
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="text-center">
              <p className="text-gray-400 mb-4">
                Please verify your email address to complete your registration
                and access the onboarding flow.
              </p>
              <p className="text-sm text-gray-500">
                We sent a verification link to:{" "}
                <strong className="text-white">{user.email}</strong>
              </p>
            </div>

            <div className="bg-gray-700/50 rounded-lg p-4 border border-gray-600">
              <h3 className="font-semibold text-white mb-2">Next Steps:</h3>
              <ol className="text-sm text-gray-400 space-y-1">
                <li>1. Check your email inbox</li>
                <li>2. Click the verification link</li>
                <li>3. Return here to start onboarding</li>
              </ol>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={handleCheckVerification}
                disabled={checkingVerification}
                variant="outline"
                className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                {checkingVerification ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Checking...
                  </>
                ) : (
                  "I've Verified"
                )}
              </Button>

              <Button
                onClick={handleResendEmail}
                disabled={resendingEmail}
                className="flex-1 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white"
              >
                {resendingEmail ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Resend Email"
                )}
              </Button>
            </div>

            <div className="text-center">
              <Button
                variant="ghost"
                onClick={() => router.push("/")}
                className="text-gray-400 hover:text-white"
              >
                Return to Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show onboarding flow if email is verified
  return <OnboardingFlow />;
}
