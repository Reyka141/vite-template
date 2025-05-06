import { eventActions, getNavItems } from '@/entities/Event';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector/useAppSelector';
import cn from 'classnames';
import { FC } from 'react';
import { NavbarItem } from '../NavbarItem/NavbarItem';
import styles from './Navbar.module.scss';

interface NavbarProps {
    className?: string;
}

export const Navbar: FC<NavbarProps> = (props) => {
    const { className } = props;
    const dispatch = useAppDispatch();
    const navItems = useAppSelector(getNavItems);

    const handleClick = (id: number) => {
        dispatch(eventActions.setActiveNavItemById(id));
    };

    return (
        <div className={cn(styles.Navbar, className)}>
            {navItems?.map((item) => (
                <NavbarItem key={item.id} name={item.name} onClick={() => handleClick(item.id)} status={item.status} />
            ))}
        </div>
    );
};
