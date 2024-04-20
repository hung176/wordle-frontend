import { useState, useEffect, useRef } from 'react';

const useTimer = () => {
  const [time, setTime] = useState<{ hour: number; minute: number; second: number }>(() => {
    const fullHours = 23;
    const fullMinutes = 59;
    const fullSeconds = 59;

    const now = new Date();
    const hours = fullHours - now.getHours();
    const minutes = fullMinutes - now.getMinutes();
    const seconds = fullSeconds - now.getSeconds();
    return { hour: hours, minute: minutes, second: seconds };
  });
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      setTime((prev) => {
        const { hour, minute, second } = prev;
        if (hour === 0 && minute === 1 && second === 1) {
          return { hour: 23, minute: 59, second: 59 };
        }

        if (minute === 1 && second === 1) {
          return { hour: hour - 1, minute: 59, second: 59 };
        }

        if (second === 1) {
          return { hour, minute: minute - 1, second: 59 };
        }

        return { hour, minute, second: second - 1 };
      });
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [time]);

  return time;
};

export default useTimer;
