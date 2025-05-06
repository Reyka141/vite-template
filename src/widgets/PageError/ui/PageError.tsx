import { Button } from '@/shared/ui/Button/Button';
import { Text, TextSize } from '@/shared/ui/Text/Text';
import cn from 'classnames';
import { FC } from 'react';
import styles from './PageError.module.scss';

interface PageErrorProps {
    className?: string;
}

export const PageError: FC<PageErrorProps> = (props) => {
    const { className } = props;

    const reloadPage = () => {
        window.location.reload();
    };

    return (
        <div className={cn(styles.PageError, className)}>
            <Text text="Something went wrong" size={TextSize.BIG} />
            <Button onClick={reloadPage}>Reload page</Button>
        </div>
    );
};
