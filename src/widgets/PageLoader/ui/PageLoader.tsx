import cn from 'classnames';
import { FC } from 'react';
import styles from './PageLoader.module.scss';
import { Loader } from '@/shared/ui/Loader/Loader';
interface PageLoaderProps {
    className?: string;
}

export const PageLoader: FC<PageLoaderProps> = (props) => {
    const { className } = props;
    return (
        <div className={cn(styles.PageLoader, className)}>
            <Loader />
        </div>
    );
};
