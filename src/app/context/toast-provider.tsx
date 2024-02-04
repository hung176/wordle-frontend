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
  const [toasts, setToasts] = React.useState<{ id: number; component: ReactElement }[]>([]);

  const open = ({ component, timeout = 3000 }: ToastOpenProps) => {
    const id = Math.random();
    setToasts([...toasts, { id, component }]);
    setTimeout(() => {
      close(id);
    }, timeout);
  };
  const close = (id: number) => {
    setToasts(toasts.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider
      value={{
        open,
        close,
      }}
    >
      {children}
      <div className="absolute top-1/4 right-[50%] translate-x-[50%] translate-y-[-50%]">
        {toasts.map((toast) => (
          <div key={toast.id}>{toast.component}</div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
