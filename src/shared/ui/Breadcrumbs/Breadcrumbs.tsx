import cn from 'classnames';
import { FC, Fragment } from 'react';
import { Text, TextSize } from '../Text/Text';
import styles from './Breadcrumbs.module.scss';
interface BreadcrumbsProps {
    className?: string;
    items?: string[];
}
export const Breadcrumbs: FC<BreadcrumbsProps> = (props) => {
    const { className, items = [] } = props;
    return (
        <div className={cn(styles.Breadcrumbs, className)}>
            {items.map((item, index) => (
                <Fragment key={item}>
                    <Text key={item} text={item} size={TextSize.MINI} />
                    {index !== items.length - 1 && <span className={styles.separator} />}
                </Fragment>
            ))}
        </div>
    );
};
