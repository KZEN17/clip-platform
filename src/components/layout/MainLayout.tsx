"use client";

import { AuthModal } from "@/components/auth/AuthModal";
import { useState } from "react";
import { Sidebar } from "./Sidebar";

interface MainLayoutProps {
  children: React.ReactNode;
  currentUser?: {
    name: string;
    avatar?: string;
  };
}

export const MainLayout = ({ children, currentUser }: MainLayoutProps) => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  return (
    <div className="flex h-screen bg-background">
      <Sidebar currentUser={currentUser} />

      {/* Main Content */}
      <div className="flex-1 lg:ml-64">
        <main className="h-full overflow-auto">{children}</main>
      </div>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={() => {
          setIsAuthModalOpen(false);
          // TODO: Navigate to role selection or dashboard
        }}
      />
    </div>
  );
};
