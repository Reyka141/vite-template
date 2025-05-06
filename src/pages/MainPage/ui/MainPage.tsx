import cn from 'classnames';
import styles from './MainPage.module.scss';

interface MainPageProps {
    className?: string;
}

const MainPage = (props: MainPageProps) => {
    const { className } = props;

    return (
        <div className={cn(styles.MainPage, className)}>
            <div className={styles.container}>
                <div className={styles.header}></div>

                <div className={styles.main}></div>
            </div>
        </div>
    );
};

export default MainPage;
