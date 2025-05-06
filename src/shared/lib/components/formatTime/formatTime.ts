export const formatTime = (time: string, withDate = false) => {
    const date = new Date(time);
    if (isNaN(date.getTime())) {
        return '00:00';
    }
    if (withDate) {
        return date.toLocaleDateString('ru-RU', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
            day: '2-digit',
            month: '2-digit',
            year: '2-digit',
        });
    }
    return date.toLocaleTimeString('ru-RU', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    });
};
