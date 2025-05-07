import React, { useState, useEffect } from 'react';
import "../styles/timer.css";

const Timer = ({ endTime }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = endTime - now;

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [endTime]);

  return (
    <div className="timer">
      <div className="time-unit">
        <span className="time-value">{timeLeft.days.toString().padStart(2, '0')}</span>
        <span className="time-label">Days</span>
      </div>
      <span className="separator">:</span>
      <div className="time-unit">
        <span className="time-value">{timeLeft.hours.toString().padStart(2, '0')}</span>
        <span className="time-label">Hours</span>
      </div>
      <span className="separator">:</span>
      <div className="time-unit">
        <span className="time-value">{timeLeft.minutes.toString().padStart(2, '0')}</span>
        <span className="time-label">Minutes</span>
      </div>
      <span className="separator">:</span>
      <div className="time-unit">
        <span className="time-value">{timeLeft.seconds.toString().padStart(2, '0')}</span>
        <span className="time-label">Seconds</span>
      </div>
    </div>
  );
};

export default Timer;