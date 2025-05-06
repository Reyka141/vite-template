import { Button } from '@/shared/ui/Button/Button';

import { useEffect, useState } from 'react';

// Компонент для тестирование ошибок
export const BugButton = () => {
    const [error, setError] = useState(false);

    useEffect(() => {
        if (error) {
            throw new Error();
        }
    }, [error]);

    const onThrowError = () => {
        setError(true);
    };

    return <Button onClick={onThrowError}>Throw error</Button>;
};
