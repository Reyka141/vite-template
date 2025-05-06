import cn from 'classnames';
import { FC } from 'react';
import './Loader.scss';

export enum LoaderSize {
    TINY = 'tiny',
    SMALL = 'small',
    MEDIUM = 'medium',
    LARGE = 'large',
}

interface LoaderProps {
    className?: string;
    size?: LoaderSize;
}

export const Loader: FC<LoaderProps> = (props) => {
    const { className, size = LoaderSize.MEDIUM } = props;
    return (
        <div className={cn('lds-ring', className, size)}>
            <div />
            <div />
            <div />
            <div />
        </div>
    );
};
