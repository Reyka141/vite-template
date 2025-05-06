export enum GameStatus {
    NOT_STARTED = 'not started',
    IN_PROGRESS = 'in progress',
    FINISHED = 'finished',
}

export const getGameStatus = (startTime: string, endTime: string) => {
    const now = new Date().getTime();
    const startTimeDate = new Date(startTime).getTime();
    const endTimeDate = new Date(endTime).getTime();

    if (now < startTimeDate) {
        return GameStatus.NOT_STARTED;
    }
    if (now >= startTimeDate && now < endTimeDate) {
        return GameStatus.IN_PROGRESS;
    }
    return GameStatus.FINISHED;
};
