import React, { useRef, useState } from 'react'

export const useTimer = ({ onTimeOut }: { onTimeOut: () => void }) => {
  const [time, setTime] = useState(1);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startTimer = () => {
    if (timerRef.current) return;

    timerRef.current = setInterval(() => {
      console.log("time", time);
      setTime((prev) => {
        if (prev <= 0) {
          stopTimer();
          onTimeOut();
          return 0;
        }
        return prev - 1;
      });
    }, 500);
  };

  const stopTimer = () => {
    if (!timerRef.current) return;

    clearInterval(timerRef.current);
    timerRef.current = null;
    setTime(0);
  };

  return { startTimer, stopTimer };
};
