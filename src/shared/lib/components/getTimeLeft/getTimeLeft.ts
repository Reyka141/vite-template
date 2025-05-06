export const getTimeLeft = (startTime: string, endTime: string) => {
    const now = new Date().getTime();
    const startTimeDate = new Date(startTime).getTime();
    const endTimeDate = new Date(endTime).getTime();
    if (now < startTimeDate) {
        const difference = startTimeDate - now;
        return Math.floor(difference / 1000);
    }
    if (now >= startTimeDate && now < endTimeDate) {
        const difference = endTimeDate - now;
        return Math.floor(difference / 1000);
    }
    return 0;
};
