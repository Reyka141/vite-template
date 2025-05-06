import cn from 'classnames';
import { FC } from 'react';
import { NavbarItemStatus } from '../../model/NavbarItem.types';
import styles from './NavbarItem.module.scss';

interface NavbarItemProps {
    name: string;
    onClick: () => void;
    status: NavbarItemStatus;
}

export const NavbarItem: FC<NavbarItemProps> = (props) => {
    const { name, onClick, status } = props;

    return (
        <button className={cn(styles.Navbar_item, styles[status])} onClick={onClick}>
            {name}
        </button>
    );
};
