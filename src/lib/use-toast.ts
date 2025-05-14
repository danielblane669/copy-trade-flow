
import * as React from "react";

const TOAST_LIMIT = 20;
export const TOAST_REMOVE_DELAY = 1000000;

type ToastType = {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  variant?: "default" | "destructive";
  duration?: number;
};

let count = 0;

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>();
const listeners: Array<(state: ToastType[]) => void> = [];

let memoryState: ToastType[] = [];

function dispatch(state: ToastType[]) {
  memoryState = state;
  listeners.forEach((listener) => {
    listener(state);
  });
}

function addToast(toast: ToastType) {
  const id = toast.id || genId();

  const newToast = {
    ...toast,
    id,
    duration: toast.duration || 5000,
  };

  dispatch([...memoryState, newToast]);

  return id;
}

function updateToast(id: string, toast: ToastType) {
  dispatch(
    memoryState.map((t) => (t.id === id ? { ...t, ...toast } : t))
  );
}

function dismissToast(id: string) {
  const toastTimeoutId = toastTimeouts.get(id);
  if (toastTimeoutId) clearTimeout(toastTimeoutId);

  toastTimeouts.delete(id);
  dispatch(memoryState.filter((t) => t.id !== id));
}

function useToast() {
  const [state, setState] = React.useState<ToastType[]>(memoryState);

  React.useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, [state]);

  return {
    toasts: state,
    toast: createToast,
    dismiss: dismissToast,
  };
}

function createToast(props: Omit<ToastType, "id">) {
  return addToast(props as ToastType);
}

export { useToast, createToast, dismissToast, updateToast };
