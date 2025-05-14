
import {
  useToast as useToastOriginal,
  toast as toastOriginal,
} from "@/components/ui/use-toast";

// Re-export the toast hooks to make them available throughout the app
export const useToast = useToastOriginal;
export const toast = toastOriginal;
