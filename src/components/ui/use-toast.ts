
// Re-export from the toast component
import {
  type ToastActionElement,
  type ToastProps,
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
} from "@/components/ui/toast";

import {
  createToast,
  useToast as useToastHook,
} from "@/lib/use-toast";

export const useToast = useToastHook;
export const toast = createToast;

export {
  type ToastActionElement,
  type ToastProps,
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
};
