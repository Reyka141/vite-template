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
                <div className={styles.header}>
                    <h1 className={styles.header_title}>Добро пожаловать!!!!</h1>
                    <p className={styles.header_text_medium}>Мы рады приветствовать вас на нашей платформе</p>
                    <button className={styles.header_button}>Начать</button>
                </div>

                <div className={styles.main}>
                    <div className={styles.main_card}>
                        <h2>Что вас ждет</h2>
                        <p>Откройте для себя новые возможности нашей платформы</p>
                    </div>

                    <div className={styles.main_features}>
                        <div className={styles.feature_item}>
                            <div className={styles.feature_icon}>🚀</div>
                            <p>Быстрый старт</p>
                        </div>
                        <div className={styles.feature_item}>
                            <div className={styles.feature_icon}>💡</div>
                            <p>Полезные инструменты</p>
                        </div>
                        <div className={styles.feature_item}>
                            <div className={styles.feature_icon}>👥</div>
                            <p>Сообщество единомышленников</p>
                        </div>
                    </div>

                    <button className={styles.main_action_button}>Исследовать платформу</button>
                </div>
            </div>
        </div>
    );
};

export default MainPage;
