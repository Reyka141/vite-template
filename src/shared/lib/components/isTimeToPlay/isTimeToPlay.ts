export const isTimeToPlay = (startTime: string, endTime: string) => {
    const now = new Date().getTime();
    const startTimeDate = new Date(startTime).getTime();
    const endTimeDate = new Date(endTime).getTime();
    return now >= startTimeDate && now < endTimeDate;
};
