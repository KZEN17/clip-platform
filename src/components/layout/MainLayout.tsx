// src/components/layout/MainLayout.tsx
"use client";

import { AuthModal } from "@/components/auth/AuthModal";
import { OnboardingFlow } from "@/components/onboarding/OnboardingFlow";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");
  const { user, loading, needsOnboarding, emailVerified } = useAuth();
  const router = useRouter();

  // Handle authentication redirects
  useEffect(() => {
    if (!loading) {
      // If user needs to verify email, redirect to onboarding page
      if (user && !emailVerified) {
        router.push("/onboarding");
        return;
      }
    }
  }, [user, loading, emailVerified, router]);

  // Show onboarding flow if user needs it AND is email verified
  const shouldShowOnboarding = user && emailVerified && needsOnboarding;

  // If we should show onboarding, render the onboarding flow
  if (shouldShowOnboarding) {
    return <OnboardingFlow />;
  }

  const handleSignInClick = () => {
    setAuthMode("signin");
    setIsAuthModalOpen(true);
  };

  const handleSignUpClick = () => {
    setAuthMode("signup");
    setIsAuthModalOpen(true);
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 lg:ml-64 flex flex-col">
        <TopBar
          onSignInClick={handleSignInClick}
          onSignUpClick={handleSignUpClick}
        />

        {/* Content with top padding for the fixed TopBar */}
        <main className="flex-1 overflow-auto pt-16">{children}</main>
      </div>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authMode}
        onSuccess={() => {
          setIsAuthModalOpen(false);
          // User will be redirected to email verification via useEffect
        }}
      />
    </div>
  );
};
