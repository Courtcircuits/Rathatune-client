import { ReactNode, createContext } from "react";
import toast, { Toaster } from "react-hot-toast";

interface ToastContextProps {
  trigger_notify: (message: string) => void;
  trigger_alert: (message: string) => void;
  trigger_success: (message: string) => void;
}

export const ToasterContext = createContext<ToastContextProps>({
  trigger_notify: () => {},
  trigger_alert: () => {},
  trigger_success: () => {},
});

export function ToastProvider({ children }: {children:ReactNode}) {
  const trigger_notify = (message: string) => {
    toast(message);
  }
  const trigger_alert = (message: string) => {
    toast.error(message);
  }

  const trigger_success = (message: string) => {
    toast.success(message);
  }

  return (
    <ToasterContext.Provider value={{ trigger_notify, trigger_alert, trigger_success }}>
      {children}
      <Toaster />
    </ToasterContext.Provider>
  );
}

