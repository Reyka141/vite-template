export const formatDate = (date: string) => {
    const dateObj = new Date(date);
    if (isNaN(dateObj.getTime())) {
        return '-/-/-';
    }

    return dateObj.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    });
};
