export function setIntervalForTime(callback, delay, time, callbackEnd) {
    const interval = setInterval(callback, delay)
    const timeOut = setTimeout(() => {
        clearInterval(interval)
        if (callbackEnd) {
            callbackEnd()
        }
    }, time)
    return (interval, timeOut)
}