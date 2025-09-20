// src/contexts/AuthContext.tsx
"use client";

import { account } from "@/lib/appwrite";
import { ID, Models } from "appwrite";
import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  user: Models.User<Models.Preferences> | null;
  loading: boolean;
  needsOnboarding: boolean;
  emailVerified: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  sendVerification: () => Promise<void>;
  setNeedsOnboarding: (needs: boolean) => void;
  checkEmailVerification: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [needsOnboarding, setNeedsOnboarding] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);

  // Check if user is logged in on mount
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      setLoading(true);
      const currentUser = await account.get();
      setUser(currentUser);
      setEmailVerified(currentUser.emailVerification);

      // Check if user has completed onboarding
      // You'll need to implement this based on your user preferences or database
      const hasCompletedOnboarding =
        currentUser.prefs?.onboardingCompleted || false;
      setNeedsOnboarding(
        !hasCompletedOnboarding && currentUser.emailVerification
      );
    } catch (error) {
      console.log("No active session");
      setUser(null);
      setEmailVerified(false);
      setNeedsOnboarding(false);
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string) => {
    try {
      // Create account
      await account.create(ID.unique(), email, password, name);

      // Login the user
      await account.createEmailPasswordSession(email, password);

      // Send verification email
      await sendVerification();

      // Get the user data
      const currentUser = await account.get();
      setUser(currentUser);
      setEmailVerified(false);
    } catch (error: any) {
      console.error("Registration error:", error);
      throw new Error(error.message || "Registration failed");
    }
  };

  const login = async (email: string, password: string) => {
    try {
      await account.createEmailPasswordSession(email, password);
      const currentUser = await account.get();
      setUser(currentUser);
      setEmailVerified(currentUser.emailVerification);

      // Check onboarding status
      const hasCompletedOnboarding =
        currentUser.prefs?.onboardingCompleted || false;
      setNeedsOnboarding(
        !hasCompletedOnboarding && currentUser.emailVerification
      );
    } catch (error: any) {
      console.error("Login error:", error);
      throw new Error(error.message || "Login failed");
    }
  };

  const logout = async () => {
    try {
      await account.deleteSession("current");
      setUser(null);
      setEmailVerified(false);
      setNeedsOnboarding(false);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const sendVerification = async () => {
    try {
      const verificationUrl = `${window.location.origin}/verify-email`;
      await account.createVerification(verificationUrl);
    } catch (error: any) {
      console.error("Send verification error:", error);
      throw new Error(error.message || "Failed to send verification email");
    }
  };

  const checkEmailVerification = async () => {
    try {
      const currentUser = await account.get();
      setEmailVerified(currentUser.emailVerification);

      if (currentUser.emailVerification) {
        const hasCompletedOnboarding =
          currentUser.prefs?.onboardingCompleted || false;
        setNeedsOnboarding(!hasCompletedOnboarding);
      }

      return currentUser.emailVerification;
    } catch (error) {
      console.error("Check verification error:", error);
      return false;
    }
  };

  const value = {
    user,
    loading,
    needsOnboarding,
    emailVerified,
    login,
    register,
    logout,
    sendVerification,
    setNeedsOnboarding,
    checkEmailVerification,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
