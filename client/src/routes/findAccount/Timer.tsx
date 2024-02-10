import React, { useState, useEffect } from "react";
import Style from "./FindAccount.module.scss";

interface TimerProps {
  initialTime: number;
  active: boolean;
}

const Timer: React.FC<TimerProps> = ({ initialTime, active }) => {
  const [seconds, setSeconds] = useState<number>(initialTime);
  const [isActive, setIsActive] = useState<boolean>(active);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isActive, seconds]);

  useEffect(() => {
    setSeconds(initialTime);
    setIsActive(active);
  }, [initialTime, active]);

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const remainingSeconds = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  return (
    <div>
      <div className={Style.timer}>{formatTime(seconds)}</div>
    </div>
  );
};

export default Timer;
