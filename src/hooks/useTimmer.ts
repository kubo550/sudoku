import { useEffect, useState } from "react";

const decimal = (num: number): string => num.toString().padStart(2, "0");

const displayTime = (time: number | null): string => {
    const secondsInMin = 60
    time = Number(time)
    if (time < 0) {
        return `00:00`
    }
    const mn = Math.floor(time / secondsInMin);
    const sc = time % secondsInMin;
    return `${decimal(mn)}:${decimal(sc)}`;
};

let timeInterval: NodeJS.Timeout;

const useTimmer = (timeInSeconds?: number) => {
    const [time, setTime] = useState(timeInSeconds || 0);
    const [isCounting, setisCounting] = useState(true)

    const startCount = (): void => {
        setisCounting(true)
        timeInterval = setInterval(() => {
            setTime(prev => Number(prev) + 1);
        }, 1000);
    };

    const stopCount = (): void => {
        clearInterval(timeInterval);
        setisCounting(false)
    }

    const restartCount = (): void => {
        stopCount();
        setTime(0);
    }

    useEffect(() => {
        startCount();
        return () => stopCount();
    }, []);

    const timeToDisplay = displayTime(time)

    return { time, stopCount, startCount, restartCount, displayTime, timeToDisplay, isCounting }

}

export default useTimmer