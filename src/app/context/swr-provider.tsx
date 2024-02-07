'use client';
import { GUESS_API_URL } from '@/hooks/useSession';
import { SWRConfig } from 'swr';
import { useToast } from './toast-provider';
import Toast from '@/components/common/Toast';

const SWRConfigProvider = ({ children }: { children: React.ReactNode }) => {
  const toast = useToast();
  return (
    <SWRConfig
      value={{
        onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
          // Never retry on 404.
          if (error.status === 404) return;

          // Never retry for a specific key.
          if (key === GUESS_API_URL) return;

          // Only retry up to 10 times.
          if (retryCount >= 10) return;

          // Retry after 5 seconds.
          setTimeout(() => revalidate({ retryCount }), 5000);
        },
        onError: (err) => {
          toast.open({
            component: <Toast message={err.message} />,
            timeout: 5000,
          });
        },
      }}
    >
      {children}
    </SWRConfig>
  );
};

export default SWRConfigProvider;
