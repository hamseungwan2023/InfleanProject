import { useState, useEffect } from "react";

const Timer: React.FC = () => {
  const [seconds, setSeconds] = useState<number>(300);
  const [isActive, setIsActive] = useState<boolean>(true);

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

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const remainingSeconds = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  return (
    <div>
      <div>남은 시간: {formatTime(seconds)}</div>
    </div>
  );
};

export default Timer;
