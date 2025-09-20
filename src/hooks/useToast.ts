// src/hooks/use-toast.ts
import { useCallback, useState } from "react";

interface Toast {
  id: string;
  title: string;
  description?: string;
  variant?: "default" | "destructive";
}

interface UseToastReturn {
  toast: (props: Omit<Toast, "id">) => void;
  toasts: Toast[];
  dismiss: (id: string) => void;
}

let toastCount = 0;

// Simple toast implementation
export const useToast = (): UseToastReturn => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback((props: Omit<Toast, "id">) => {
    const id = (++toastCount).toString();
    const newToast = { ...props, id };

    setToasts((prev) => [...prev, newToast]);

    // Auto dismiss after 5 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 5000);
  }, []);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return { toast, toasts, dismiss };
};

// Toast Provider Component (optional, for more advanced toast management)
// You could create a ToastProvider and ToastContainer component for better UX
