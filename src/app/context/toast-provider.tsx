'use client';
import React, { ReactElement } from 'react';

interface ToastOpenProps {
  component: ReactElement;
  timeout?: number;
}

interface ToastContextProps {
  open: (toast: ToastOpenProps) => void;
  close: (id: number) => void;
}

export const ToastContext = React.createContext<ToastContextProps>({
  open: (toast: ToastOpenProps) => {},
  close: (id: number) => {},
});
export const useToast = () => React.useContext(ToastContext);

export default function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toast, setToast] = React.useState<{ component: ReactElement } | null>(null);

  const open = ({ component, timeout = 3000 }: ToastOpenProps) => {
    setToast({ component });
    setTimeout(() => {
      close();
    }, timeout);
  };
  const close = () => {
    setToast(null);
  };

  return (
    <ToastContext.Provider
      value={{
        open,
        close,
      }}
    >
      {children}
      <div className="absolute top-1/2 right-[50%] translate-x-[50%] translate-y-[-50%]">
        <div>{toast?.component}</div>
      </div>
    </ToastContext.Provider>
  );
}
