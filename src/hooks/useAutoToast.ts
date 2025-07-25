
import { toast } from "@/hooks/use-toast";

interface ToastOptions {
  title: string;
  description?: string;
  variant?: "default" | "destructive";
}

export const useAutoToast = () => {
  const showAutoToast = (options: ToastOptions) => {
    toast({
      title: options.title,
      description: options.description,
      variant: options.variant || "default",
    });
  };

  return { showAutoToast };
};
