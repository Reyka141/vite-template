import BirchHorse from '@/shared/assets/icons/horse_birch.svg?react';
import BlackHorse from '@/shared/assets/icons/horse_black.svg?react';
import BlueHorse from '@/shared/assets/icons/horse_blue.svg?react';
import GreenHorse from '@/shared/assets/icons/horse_green_2.svg?react';
import PinkHorse from '@/shared/assets/icons/horse_pink.svg?react';
import PurpleHorse from '@/shared/assets/icons/horse_purple.svg?react';
import RedHorse from '@/shared/assets/icons/horse_red.svg?react';
import WhiteHorse from '@/shared/assets/icons/horse_white.svg?react';
import YellowHorse from '@/shared/assets/icons/horse_yellow.svg?react';
import cn from 'classnames';
import { FC } from 'react';
import styles from './HorseIcon.module.scss';

export enum HorseSize {
    BIG = 48,
    SMALL = 24,
}

export enum HorseColor {
    WHITE = 'white',
    GREEN = 'green',
    RED = 'red',
    YELLOW = 'yellow',
    BIRCH = 'birch',
    BLUE = 'blue',
    PURPLE = 'purple',
    PINK = 'pink',
    BLACK = 'black',
}

interface HorseIconProps {
    className?: string;
    size?: HorseSize;
    color?: HorseColor;
}

interface SVGProps {
    width?: number;
    height?: number;
}

const horseMapper: Record<HorseColor, FC<SVGProps>> = {
    [HorseColor.WHITE]: WhiteHorse,
    [HorseColor.GREEN]: GreenHorse,
    [HorseColor.RED]: RedHorse,
    [HorseColor.YELLOW]: YellowHorse,
    [HorseColor.BIRCH]: BirchHorse,
    [HorseColor.BLUE]: BlueHorse,
    [HorseColor.PURPLE]: PurpleHorse,
    [HorseColor.PINK]: PinkHorse,
    [HorseColor.BLACK]: BlackHorse,
};

export const HorseIcon: FC<HorseIconProps> = (props) => {
    const { className, size = HorseSize.BIG, color = HorseColor.WHITE } = props;
    const IconComponent = horseMapper[color] ?? WhiteHorse;
    return (
        <div className={cn(styles.HorseIcon, className)}>
            <IconComponent width={size} height={size} />
        </div>
    );
};
