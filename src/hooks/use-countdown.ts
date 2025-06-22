"use client";

import { useState, useEffect } from 'react';

export const useCountdown = (targetDate: number) => {
  const [countDown, setCountDown] = useState(targetDate - new Date().getTime());

  useEffect(() => {
    const interval = setInterval(() => {
      const newCountDown = targetDate - new Date().getTime();
      if (newCountDown <= 0) {
        clearInterval(interval);
        setCountDown(0);
      } else {
        setCountDown(newCountDown);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return getReturnValues(countDown);
};

const getReturnValues = (countDown: number) => {
  const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds };
};
