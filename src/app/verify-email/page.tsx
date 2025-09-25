// src/app/verify-email/page.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { account } from "@/lib/appwrite";
import { CheckCircle, Mail, RefreshCw, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

export default function VerifyEmailPage() {
  const [status, setStatus] = useState<"verifying" | "success" | "error">(
    "verifying"
  );
  const [message, setMessage] = useState("");
  const [resending, setResending] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const { checkEmailVerification, sendVerification, user } = useAuth();

  useEffect(() => {
    const verifyEmail = async () => {
      const userId = searchParams.get("userId");
      const secret = searchParams.get("secret");

      if (!userId || !secret) {
        setStatus("error");
        setMessage(
          "Invalid verification link. Please check your email for the correct link."
        );
        return;
      }

      try {
        // Complete the email verification
        await account.updateVerification(userId, secret);

        // Check verification status
        const isVerified = await checkEmailVerification();

        if (isVerified) {
          setStatus("success");
          setMessage(
            "Email verified successfully! Redirecting to onboarding..."
          );

          // Redirect to onboarding after a delay
          setTimeout(() => {
            router.push("/onboarding");
          }, 2000);
        } else {
          setStatus("error");
          setMessage("Verification failed. Please try again.");
        }
      } catch (error: unknown) {
        console.error("Verification error:", error);
        const errorMessage =
          error instanceof Error
            ? error.message
            : "Verification failed. Please try again.";
        setStatus("error");
        setMessage(errorMessage);
      }
    };

    verifyEmail();
  }, [searchParams, checkEmailVerification, router]);

  const handleResendVerification = async () => {
    if (!user) return;

    setResending(true);
    try {
      await sendVerification();
      setMessage("Verification email sent! Please check your inbox.");
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to send verification email.";
      setMessage(errorMessage);
    } finally {
      setResending(false);
    }
  };

  return (
    <Suspense>
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-gray-800 border-gray-700 shadow-2xl">
          <CardHeader className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center">
              {status === "verifying" && (
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                  <RefreshCw className="w-8 h-8 text-white animate-spin" />
                </div>
              )}
              {status === "success" && (
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
              )}
              {status === "error" && (
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-red-500 to-red-600 flex items-center justify-center">
                  <X className="w-8 h-8 text-white" />
                </div>
              )}
            </div>

            <CardTitle className="text-2xl font-bold text-white">
              {status === "verifying" && "Verifying Email..."}
              {status === "success" && "Email Verified!"}
              {status === "error" && "Verification Failed"}
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="text-center">
              <p className="text-gray-400">{message}</p>
            </div>

            {status === "success" && (
              <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                <h3 className="font-semibold text-green-400 mb-2">
                  What&apos;s Next?
                </h3>
                <p className="text-sm text-green-300">
                  You&apos;ll be redirected to complete your profile setup and
                  choose your role in the CLIP ecosystem.
                </p>
              </div>
            )}

            {status === "error" && (
              <div className="space-y-4">
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                  <h3 className="font-semibold text-red-400 mb-2">
                    Need Help?
                  </h3>
                  <ul className="text-sm text-red-300 space-y-1">
                    <li>• Check if the link has expired</li>
                    <li>• Look for a newer verification email</li>
                    <li>• Request a new verification link</li>
                  </ul>
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={handleResendVerification}
                    disabled={resending || !user}
                    className="flex-1 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white"
                  >
                    {resending ? (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Mail className="w-4 h-4 mr-2" />
                        Resend Email
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}

            {status === "verifying" && (
              <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <RefreshCw className="w-5 h-5 text-purple-400 animate-spin" />
                  <div>
                    <h3 className="font-semibold text-purple-400">
                      Processing...
                    </h3>
                    <p className="text-sm text-purple-300">
                      Please wait while we verify your email address.
                    </p>
                  </div>
                </div>
              </div>
            )}

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
    </Suspense>
  );
}
