
// Re-export the toast hooks to make them available throughout the app
import { useToast as useToastHook, createToast } from "@/lib/use-toast";

export const useToast = useToastHook;
export const toast = createToast;
