import cn from 'classnames';
import { FC } from 'react';
import styles from './NotFoundPage.module.scss';
import { Text, TextSize } from '@/shared/ui/Text/Text';

interface NotFoundPageProps {
    className?: string;
}

export const NotFoundPage: FC<NotFoundPageProps> = (props) => {
    const { className } = props;
    return (
        <div className={cn(styles.NotFoundPage, className)}>
            <Text text="Страница не найдена" size={TextSize.BIG} />
        </div>
    );
};
