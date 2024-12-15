export function setCustomInterval(callback, interval) {
    const id = setInterval(callback, interval);
    if (!window.activeIntervals) {
        window.activeIntervals = [];
    }
    window.activeIntervals.push(id);
    return id;
}

export function clearAllIntervals() {
    if (window.activeIntervals) {
        window.activeIntervals.forEach(clearInterval);
        window.activeIntervals = [];
    }
}