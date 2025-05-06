import { Prize } from '@/entities/User';
import { Loader, LoaderSize } from '@/shared/ui/Loader/Loader';
import { Text, TextSize } from '@/shared/ui/Text/Text';
import cn from 'classnames';
import { FC, useEffect, useState } from 'react';
import styles from './PrizeItem.module.scss';

// Статический импорт изображений
import prize1Image from '@/shared/assets/images/prize_1.png';
import prize2Image from '@/shared/assets/images/prize_2.png';
import prize3Image from '@/shared/assets/images/prize_3.png';

interface PrizeItemProps {
    className?: string;
    prize?: Prize;
}

const getPrizeImage = (winsCount: number) => {
    switch (winsCount) {
        case 3:
            return prize1Image;
        case 2:
            return prize2Image;
        case 1:
            return prize3Image;
        default:
            return prize3Image;
    }
};

export const PrizeItem: FC<PrizeItemProps> = (props) => {
    const { className, prize } = props;
    const [imageSrc, setImageSrc] = useState<string>('');
    const isWinner = prize?.winsCount && prize.winsCount > 0;

    useEffect(() => {
        if (prize) {
            // Получаем изображение напрямую из импортированных ресурсов
            setImageSrc(getPrizeImage(prize.winsCount));
        }
    }, [prize]);

    return (
        <div className={cn(styles.PrizeItem, className)}>
            <div className={styles.image_container}>
                <div className={styles.image}>
                    {prize && imageSrc ? (
                        <img src={imageSrc} alt={prize.prizeText} className={styles.image} />
                    ) : (
                        <Loader className={styles.loader} size={LoaderSize.LARGE} />
                    )}
                </div>
            </div>
            <div
                className={cn(styles.text_container, {
                    [styles.text_container_winner]: isWinner,
                    [styles.text_container_loser]: !isWinner,
                })}
            >
                <Text text={prize?.prizeText} size={isWinner ? TextSize.LARGE : TextSize.BODY} />
            </div>
        </div>
    );
};
