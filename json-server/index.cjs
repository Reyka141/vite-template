const fs = require('fs');
const jsonServer = require('json-server');
const path = require('path');

// НАСТРОЙКИ ПРИЛОЖЕНИЯ
// -------------------
// Основные параметры времени (в миллисекундах)
const RACE_DURATION = 1 * 60 * 1000; // Продолжительность гонки (1 минут)
const RACE_INTERVAL = 1 * 60 * 1000; // Промежуток между гонками (1 минута)
const NUMBER_OF_RACES = 3; // Количество гонок в событии

const EVENT_START_DELAY = 1 * 60 * 1000; // Через сколько начнется событие после запуска сервера (1 минута)
const EVENT_DURATION = RACE_DURATION * NUMBER_OF_RACES + RACE_INTERVAL * (NUMBER_OF_RACES - 1); // Продолжительность всего события (2 минуты)
const API_DELAY = 800; // Задержка API в миллисекундах для симуляции сетевой задержки

const server = jsonServer.create();
const router = jsonServer.router(path.resolve(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

// Симуляция задержки API
const delayMiddleware = async (req, res, next) => {
    await new Promise((resolve) => {
        setTimeout(resolve, API_DELAY);
    });
    next();
};

server.use(delayMiddleware);

// Промежуточное ПО для проверки авторизации
const authMiddleware = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).json({
            message: 'Authorization required',
            error: 'Unauthorized',
        });
    }
    next();
};

// Эндпоинт для получения последнего события (авторизация не требуется)
server.get('/lastEvent', (req, res) => {
    try {
        const dbPath = path.resolve(__dirname, 'db.json');
        const dbData = JSON.parse(fs.readFileSync(dbPath, 'UTF-8'));

        if (!dbData.event || !dbData.event.length) {
            return res.status(404).json({
                message: 'Events not found',
                error: 'Not Found',
            });
        }

        const lastEvent = dbData.event[dbData.event.length - 1];

        // Проверяем, есть ли авторизация
        const isAuthorized = req.headers.authorization;
        let userChoices = [];
        console.log(isAuthorized);

        // Если есть авторизация, получаем выборы пользователя
        if (isAuthorized) {
            // Предполагаем, что ID пользователя есть в заголовке авторизации
            // Обычно в формате "Bearer userId" или извлекаем из токена
            const userId = parseInt(req.headers.authorization.split(' ')[1]);

            if (userId && !isNaN(userId)) {
                // Находим все выборы пользователя для последнего события
                userChoices = dbData.userChoices.filter(
                    (choice) => choice.userId === userId && choice.eventId === lastEvent.id,
                );

                // Преобразуем выборы в формат, соответствующий UserChoices из eventSchema
                userChoices = userChoices.map((choice) => ({
                    raceId: choice.raceId,
                    horseId: choice.horseId,
                    reOpen: choice.reOpen,
                }));
            }
        }

        return res.json({
            success: true,
            event: lastEvent,
            userChoices: isAuthorized ? userChoices : undefined,
        });
    } catch (error) {
        console.error('Error getting the latest event:', error);
        return res.status(500).json({
            message: 'Error retrieving event',
            error: error.message,
        });
    }
});

// Эндпоинт для получения выборов текущего авторизованного пользователя
server.get('/myChoices', authMiddleware, (req, res) => {
    try {
        // Получаем userId из заголовка авторизации
        const userId = parseInt(req.headers.authorization.split(' ')[1]);
        const { eventId } = req.query;

        if (!userId || isNaN(userId)) {
            return res.status(401).json({
                message: 'Некорректная авторизация',
                error: 'Unauthorized',
            });
        }

        const dbPath = path.resolve(__dirname, 'db.json');
        const dbData = JSON.parse(fs.readFileSync(dbPath, 'UTF-8'));

        if (!Array.isArray(dbData.userChoices)) {
            return res.json({
                success: true,
                userChoices: [],
            });
        }

        let userChoices = dbData.userChoices.filter((choice) => choice.userId === userId);

        // Если указан eventId, фильтруем по нему
        if (eventId) {
            userChoices = userChoices.filter((choice) => choice.eventId === parseInt(eventId));
        }

        // Текущее время для определения завершенных гонок
        const currentTime = new Date();

        // Добавляем информацию о лошадях из событий и результаты, если гонка завершена
        if (userChoices.length > 0 && dbData.event && dbData.event.length > 0) {
            userChoices = userChoices.map((choice) => {
                const event = dbData.event.find((e) => e.id === choice.eventId);
                const race = event?.raceData?.find((r) => r.id === choice.raceId);
                const horse = race?.horseData?.find((h) => h.id === choice.horseId);

                // Определяем время начала и окончания гонки
                const raceStartTime = race ? new Date(race.startTime) : null;
                const raceEndTime = race ? new Date(race.endTime) : null;

                // Определяем статус гонки
                const raceEnded = raceEndTime ? currentTime > raceEndTime : false;
                const raceInProgress =
                    raceStartTime && raceEndTime ? currentTime >= raceStartTime && currentTime <= raceEndTime : false;

                // Статус гонки
                let raceStatus = 'upcoming'; // предстоящая
                if (raceInProgress) raceStatus = 'in_progress'; // в процессе
                if (raceEnded) raceStatus = 'finished'; // завершена

                // Определяем результат гонки, если она завершилась
                let raceResult = null;
                if (raceEnded && dbData.raceResults && Array.isArray(dbData.raceResults)) {
                    // Ищем результат для конкретной гонки
                    const result = dbData.raceResults.find(
                        (r) => r.eventId === choice.eventId && r.raceId === choice.raceId,
                    );

                    if (result) {
                        // Проверяем, совпадает ли выбранная лошадь с победителем
                        const isWinner = result.winnerHorseId === choice.horseId;

                        // Находим лошадь-победителя для получения цвета
                        const winnerHorse = race?.horseData?.find((h) => h.id === result.winnerHorseId);

                        raceResult = {
                            winnerHorseId: result.winnerHorseId,
                            winnerHorseName: result.winnerHorseName,
                            winnerHorseColor: winnerHorse?.color || '',
                            isUserWinner: isWinner,
                            finishTime: result.finishTime,
                        };
                    }
                }

                return {
                    ...choice,
                    horseName: horse?.name,
                    horseColor: horse?.color,
                    horseStats: horse?.stats,
                    horsePosition: horse?.position, // Добавляем позицию лошади
                    raceTitle: race?.title,
                    raceDescription: race?.description || '',
                    raceStartTime: race?.startTime,
                    raceEndTime: race?.endTime,
                    raceStatus,
                    raceEnded,
                    raceInProgress,
                    raceResult,
                };
            });
        }

        return res.json({
            success: true,
            userChoices,
        });
    } catch (error) {
        console.error('Ошибка получения выборов пользователя:', error);
        return res.status(500).json({
            message: 'Внутренняя ошибка сервера',
            error: error.message,
        });
    }
});

// Эндпоинт для получения выборов пользователя только для текущего активного события
server.get('/myActiveEventChoices', authMiddleware, (req, res) => {
    try {
        // Получаем userId из заголовка авторизации
        const userId = parseInt(req.headers.authorization.split(' ')[1]);
        // Получаем eventId из query параметров, если он задан
        const eventId = req.query.eventId ? parseInt(req.query.eventId) : null;

        if (!userId || isNaN(userId)) {
            return res.status(401).json({
                message: 'Некорректная авторизация',
                error: 'Unauthorized',
            });
        }

        const dbPath = path.resolve(__dirname, 'db.json');
        const dbData = JSON.parse(fs.readFileSync(dbPath, 'UTF-8'));

        // Определяем целевое событие
        let targetEvent = null;

        // Если eventId задан, пытаемся найти событие с указанным ID
        if (eventId) {
            targetEvent =
                dbData.event && Array.isArray(dbData.event) ? dbData.event.find((event) => event.id === eventId) : null;
        }
        // Если eventId не задан или событие не найдено, используем стандартную логику (активное или последнее)
        if (!targetEvent) {
            // Находим активное событие
            targetEvent =
                dbData.event && Array.isArray(dbData.event)
                    ? dbData.event.find((event) => event.isActive === true)
                    : null;

            // Если активного события нет, находим последнее событие
            if (!targetEvent && dbData.event && Array.isArray(dbData.event) && dbData.event.length > 0) {
                // Находим последнее (самое новое) событие
                targetEvent = dbData.event[dbData.event.length - 1];
            }
        }

        // Если ни активного, ни последнего события нет, возвращаем пустой массив
        if (!targetEvent) {
            return res.json({
                success: true,
                userChoices: [],
            });
        }

        // Если нет выборов пользователей, возвращаем пустой массив
        if (!Array.isArray(dbData.userChoices)) {
            return res.json({
                success: true,
                userChoices: [],
            });
        }

        // Фильтруем выборы по userId и eventId активного/последнего события
        let userChoices = dbData.userChoices.filter(
            (choice) => choice.userId === userId && choice.eventId === targetEvent.id,
        );

        // Если у пользователя нет выборов для активного/последнего события, возвращаем пустой массив
        if (userChoices.length === 0) {
            return res.json({
                success: true,
                userChoices: [],
            });
        }

        // Текущее время для определения завершенных гонок
        const currentTime = new Date();

        // Добавляем информацию о лошадях из событий и результаты, если гонка завершилась
        userChoices = userChoices.map((choice) => {
            const race = targetEvent.raceData?.find((r) => r.id === choice.raceId);
            const horse = race?.horseData?.find((h) => h.id === choice.horseId);

            // Определяем время начала и окончания гонки
            const raceStartTime = race ? new Date(race.startTime) : null;
            const raceEndTime = race ? new Date(race.endTime) : null;

            // Определяем статус гонки
            const raceEnded = raceEndTime ? currentTime > raceEndTime : false;
            const raceInProgress =
                raceStartTime && raceEndTime ? currentTime >= raceStartTime && currentTime <= raceEndTime : false;

            // Статус гонки
            let raceStatus = 'upcoming'; // предстоящая
            if (raceInProgress) raceStatus = 'in_progress'; // в процессе
            if (raceEnded) raceStatus = 'finished'; // завершена

            // Определяем результат гонки, если она завершилась
            let raceResult = null;
            if (raceEnded && dbData.raceResults && Array.isArray(dbData.raceResults)) {
                // Ищем результат для конкретной гонки
                const result = dbData.raceResults.find(
                    (r) => r.eventId === targetEvent.id && r.raceId === choice.raceId,
                );

                if (result) {
                    // Проверяем, совпадает ли выбранная лошадь с победителем
                    const isWinner = result.winnerHorseId === choice.horseId;

                    // Находим лошадь-победителя для получения цвета
                    const winnerHorse = race?.horseData?.find((h) => h.id === result.winnerHorseId);

                    raceResult = {
                        winnerHorseId: result.winnerHorseId,
                        winnerHorseName: result.winnerHorseName,
                        winnerHorseColor: winnerHorse?.color || '',
                        isUserWinner: isWinner,
                        finishTime: result.finishTime,
                    };
                }
            }

            return {
                ...choice,
                horseName: horse?.name,
                horseColor: horse?.color,
                horseStats: horse?.stats,
                horsePosition: horse?.position, // Добавляем позицию лошади
                raceTitle: race?.title,
                raceDescription: race?.description || '',
                raceStartTime: race?.startTime,
                raceEndTime: race?.endTime,
                raceStatus,
                raceEnded,
                raceInProgress,
                raceResult,
                isActiveEvent: targetEvent.isActive, // добавляем флаг, чтобы клиент знал, активное это событие или нет
            };
        });

        return res.json({
            success: true,
            userChoices,
        });
    } catch (error) {
        console.error('Ошибка получения выборов пользователя для активного события:', error);
        return res.status(500).json({
            message: 'Внутренняя ошибка сервера',
            error: error.message,
        });
    }
});

// Эндпоинт аутентификации (авторизация не требуется)
server.post('/login', (req, res) => {
    try {
        const { username, password } = req.body;
        const dbPath = path.resolve(__dirname, 'db.json');
        const dbData = JSON.parse(fs.readFileSync(dbPath, 'UTF-8'));
        const { users = [] } = dbData;

        const user = users.find((u) => u.username === username && u.password === password);

        if (user) {
            const { password, ...userWithoutPassword } = user;

            // Получаем последнее событие для проверки userChoices
            let lastEvent = null;
            if (dbData.event && dbData.event.length) {
                lastEvent = dbData.event[dbData.event.length - 1];
            }

            // Получаем выборы пользователя
            let userChoices = [];
            if (Array.isArray(dbData.userChoices)) {
                // Если есть последнее событие, фильтруем выборы только для этого события
                if (lastEvent) {
                    userChoices = dbData.userChoices.filter(
                        (choice) => choice.userId === user.id && choice.eventId === lastEvent.id,
                    );

                    // Преобразуем выборы в формат, соответствующий схеме
                    userChoices = userChoices.map((choice) => ({
                        raceId: choice.raceId,
                        horseId: choice.horseId,
                        reOpen: choice.reOpen,
                    }));
                } else {
                    // Если нет последнего события, просто получаем все выборы пользователя
                    userChoices = dbData.userChoices.filter((choice) => choice.userId === user.id);
                }
            }

            // Убедимся, что массив призов существует
            const prizes = Array.isArray(userWithoutPassword.prizes) ? userWithoutPassword.prizes : [];

            // Возвращаем данные пользователя вместе с его выборами и призами
            return res.json({
                ...userWithoutPassword,
                userChoices: userChoices,
                prizes: prizes,
            });
        }

        return res.status(401).json({
            message: 'Invalid credentials',
            error: 'Unauthorized',
        });
    } catch (error) {
        console.error('Authentication error:', error);
        return res.status(500).json({
            message: 'Internal server error',
            error: error.message,
        });
    }
});

// Эндпоинт для сохранения выборов пользователя для всех гонок (требуется авторизация)
server.post('/saveUserChoice', authMiddleware, (req, res) => {
    try {
        const { userId, eventId, choices } = req.body;

        // Проверка обязательных полей
        if (!userId || !eventId || !Array.isArray(choices)) {
            return res.status(400).json({
                message: 'Не все обязательные поля заполнены или формат некорректен',
                error: 'Bad Request',
            });
        }

        const dbPath = path.resolve(__dirname, 'db.json');
        const dbData = JSON.parse(fs.readFileSync(dbPath, 'UTF-8'));

        // Проверка существования массива userChoices
        if (!Array.isArray(dbData.userChoices)) {
            dbData.userChoices = [];
        }

        // Проверка существования события
        const eventExists = dbData.event.some((event) => event.id === eventId);
        if (!eventExists) {
            return res.status(404).json({
                message: 'Событие не найдено',
                error: 'Not Found',
            });
        }

        // Проверка существования пользователя
        const userExists = dbData.users.some((user) => user.id === userId);
        if (!userExists) {
            return res.status(404).json({
                message: 'Пользователь не найден',
                error: 'Not Found',
            });
        }

        // Массив для хранения обновленных выборов
        const updatedChoices = [];

        // Обработка каждого выбора из массива choices
        for (const choice of choices) {
            const { raceId, horseId, reOpen = false } = choice;

            if (!raceId) {
                return res.status(400).json({
                    message: 'Некорректный raceId в одном из выборов',
                    error: 'Bad Request',
                });
            }

            // Проверка существования забега с указанным raceId в текущем событии
            const event = dbData.event.find((e) => e.id === eventId);
            const raceExists = event && event.raceData && event.raceData.some((race) => race.id === raceId);

            if (!raceExists) {
                return res.status(400).json({
                    message: `Забег с id=${raceId} не найден в текущем событии`,
                    error: 'Bad Request',
                });
            }

            // Проверка наличия уже существующего выбора
            const existingChoiceIndex = dbData.userChoices.findIndex(
                (c) => c.userId === userId && c.eventId === eventId && c.raceId === raceId,
            );

            const userChoice = {
                id:
                    existingChoiceIndex >= 0
                        ? dbData.userChoices[existingChoiceIndex].id
                        : dbData.userChoices.length + 1,
                userId,
                eventId,
                raceId,
                horseId,
                reOpen,
                timestamp: new Date().toISOString(),
            };

            if (existingChoiceIndex >= 0) {
                // Обновление существующего выбора
                dbData.userChoices[existingChoiceIndex] = userChoice;
            } else {
                // Добавление нового выбора
                dbData.userChoices.push(userChoice);
            }

            updatedChoices.push(userChoice);
        }

        fs.writeFileSync(dbPath, JSON.stringify(dbData, null, 2), 'UTF-8');

        return res.json({
            success: true,
            message: 'Выборы пользователя сохранены',
            userChoices: updatedChoices,
        });
    } catch (error) {
        console.error('Ошибка сохранения выборов пользователя:', error);
        return res.status(500).json({
            message: 'Внутренняя ошибка сервера',
            error: error.message,
        });
    }
});

// Эндпоинт для получения результатов гонки по ID (требуется авторизация)
server.get('/raceResult/:id', authMiddleware, (req, res) => {
    try {
        const raceId = parseInt(req.params.id);
        const userId = parseInt(req.headers.authorization.split(' ')[1]);
        const eventId = req.query.eventId ? parseInt(req.query.eventId) : null;

        if (!raceId || isNaN(raceId)) {
            return res.status(400).json({
                message: 'Некорректный ID гонки',
                error: 'Bad Request',
            });
        }

        if (!userId || isNaN(userId)) {
            return res.status(401).json({
                message: 'Некорректная авторизация',
                error: 'Unauthorized',
            });
        }

        const dbPath = path.resolve(__dirname, 'db.json');
        const dbData = JSON.parse(fs.readFileSync(dbPath, 'UTF-8'));

        // Находим активное событие или последнее событие
        let targetEvent = null;
        if (eventId) {
            // Если указан eventId, находим это событие
            targetEvent = dbData.event.find((e) => e.id === eventId);
        } else {
            // Иначе, находим активное событие или последнее событие
            targetEvent =
                dbData.event.find((e) => e.isActive === true) ||
                (dbData.event.length > 0 ? dbData.event[dbData.event.length - 1] : null);
        }

        if (!targetEvent) {
            return res.status(404).json({
                message: 'Событие не найдено',
                error: 'Not Found',
            });
        }

        // Находим гонку в событии
        const race = targetEvent.raceData.find((r) => r.id === raceId);
        if (!race) {
            return res.status(404).json({
                message: 'Гонка не найдена',
                error: 'Not Found',
            });
        }

        // Проверяем, завершилась ли гонка
        const currentTime = new Date();
        const raceEndTime = new Date(race.endTime);
        const raceEnded = currentTime > raceEndTime;

        // Находим выбор пользователя
        const userChoice = dbData.userChoices.find(
            (choice) => choice.userId === userId && choice.eventId === targetEvent.id && choice.raceId === raceId,
        );

        // Находим результаты гонки, если она завершилась
        let raceResult = null;
        if (raceEnded) {
            raceResult = dbData.raceResults.find(
                (result) => result.eventId === targetEvent.id && result.raceId === raceId,
            );
        }

        // Формируем список всех лошадей
        // Используем существующие позиции из базы данных
        const horses = race.horseData.map((horse) => {
            return {
                id: horse.id,
                name: horse.name,
                age: horse.age,
                color: horse.color,
                weight: horse.weight,
                stats: horse.stats,
                position: horse.position,
            };
        });

        // Если гонка завершилась, сортируем лошадей по позиции
        if (raceEnded) {
            // Сортируем по позиции
            horses.sort((a, b) => {
                // Если у обоих есть позиция, сортируем по ней
                if (a.position !== null && b.position !== null) {
                    return a.position - b.position;
                }
                // Если у одного есть позиция, а у другого нет, тот у кого есть позиция идет первым
                if (a.position !== null) return -1;
                if (b.position !== null) return 1;
                // Если у обоих нет позиции, сохраняем текущий порядок
                return 0;
            });
        }

        // Находим выбранную пользователем лошадь
        let selectedHorse = null;
        if (userChoice) {
            selectedHorse = horses.find((h) => h.id === userChoice.horseId);
        }

        return res.json({
            success: true,
            raceData: {
                id: race.id,
                title: race.title,
                description: race.description,
                startTime: race.startTime,
                endTime: race.endTime,
                isFinished: raceEnded,
                finishTime: raceResult ? raceResult.finishTime : null,
            },
            userChoice: userChoice
                ? {
                      raceId: userChoice.raceId,
                      horseId: userChoice.horseId,
                      horseName: selectedHorse ? selectedHorse.name : null,
                      horseColor: selectedHorse ? selectedHorse.color : null,
                      horseStats: selectedHorse ? selectedHorse.stats : null,
                      position: selectedHorse ? selectedHorse.position : null,
                      isWinner: raceEnded && raceResult ? userChoice.horseId === raceResult.winnerHorseId : null,
                  }
                : null,
            horses: horses,
            winnerHorse:
                raceEnded && raceResult
                    ? {
                          id: raceResult.winnerHorseId,
                          name: raceResult.winnerHorseName,
                          color: raceResult.winnerHorseColor,
                      }
                    : null,
        });
    } catch (error) {
        console.error('Ошибка получения результатов гонки:', error);
        return res.status(500).json({
            message: 'Внутренняя ошибка сервера',
            error: error.message,
        });
    }
});

// Эндпоинт для получения истории игр пользователя
server.get('/userHistory', authMiddleware, (req, res) => {
    try {
        // Получаем userId из заголовка авторизации
        const userId = parseInt(req.headers.authorization.split(' ')[1]);

        if (!userId || isNaN(userId)) {
            return res.status(401).json({
                message: 'Некорректная авторизация',
                error: 'Unauthorized',
            });
        }

        const dbPath = path.resolve(__dirname, 'db.json');
        const dbData = JSON.parse(fs.readFileSync(dbPath, 'UTF-8'));

        // Проверяем наличие выборов пользователя
        if (!Array.isArray(dbData.userChoices) || dbData.userChoices.length === 0) {
            return res.json({
                success: true,
                totalWins: 0,
                totalSuccessful: 0,
                totalFail: 0,
                history: [],
            });
        }

        // Находим все выборы текущего пользователя
        const userChoices = dbData.userChoices.filter((choice) => choice.userId === userId);

        if (userChoices.length === 0) {
            return res.json({
                success: true,
                totalWins: 0,
                totalSuccessful: 0,
                totalFail: 0,
                history: [],
            });
        }

        // Счетчики для общей статистики
        let totalWins = 0;
        let totalSuccessful = 0;
        let totalFail = 0;

        // Получаем уникальные eventId из выборов пользователя
        const eventIds = [...new Set(userChoices.map((choice) => choice.eventId))];

        // Формируем историю для каждого события
        const history = eventIds
            .map((eventId) => {
                // Находим событие
                const event = dbData.event.find((e) => e.id === eventId);

                if (!event) {
                    return null;
                }

                // Находим выборы пользователя для этого события
                const eventChoices = userChoices.filter((choice) => choice.eventId === eventId);

                // Счетчики для события
                let winRaces = 0;
                let totalRaces = eventChoices.length;

                // Формируем список гонок, в которых участвовал пользователь
                const races = eventChoices
                    .map((choice) => {
                        // Находим данные о гонке
                        const race = event.raceData?.find((r) => r.id === choice.raceId);

                        if (!race) {
                            return null;
                        }

                        // Находим данные о выбранной лошади
                        const selectedHorse = race.horseData?.find((h) => h.id === choice.horseId);

                        // Проверяем, закончилась ли гонка
                        const currentTime = new Date();
                        const raceEndTime = new Date(race.endTime);
                        const raceEnded = currentTime > raceEndTime;

                        // Находим результат гонки
                        let raceResult = null;
                        let isWinner = false;

                        if (raceEnded && dbData.raceResults) {
                            raceResult = dbData.raceResults.find(
                                (result) => result.eventId === eventId && result.raceId === choice.raceId,
                            );

                            // Проверяем, победил ли пользователь
                            isWinner = raceResult && raceResult.winnerHorseId === choice.horseId;

                            // Обновляем счетчики
                            if (raceEnded) {
                                totalSuccessful++;
                                if (isWinner) {
                                    totalWins++;
                                    winRaces++;
                                } else {
                                    totalFail++;
                                }
                            }
                        }

                        // Формируем результат для этой гонки
                        return {
                            raceId: race.id,
                            title: race.title,
                            description: race.description,
                            startTime: race.startTime,
                            endTime: race.endTime,
                            isFinished: raceEnded,
                            userChoice: {
                                horseId: choice.horseId,
                                horseName: selectedHorse?.name,
                                horseColor: selectedHorse?.color,
                                horseStats: selectedHorse?.stats,
                                horsePosition: selectedHorse?.position,
                            },
                            result: raceEnded
                                ? {
                                      isWinner,
                                      winnerHorseId: raceResult?.winnerHorseId,
                                      winnerHorseName: raceResult?.winnerHorseName,
                                      winnerHorseColor: raceResult?.winnerHorseColor,
                                      finishTime: raceResult?.finishTime,
                                  }
                                : null,
                            timestamp: choice.timestamp,
                        };
                    })
                    .filter(Boolean); // Отфильтровываем null значения

                // Сортируем гонки по времени начала (от новых к старым)
                races.sort((a, b) => new Date(b.startTime) - new Date(a.startTime));

                // Формируем данные о событии
                return {
                    eventId: event.id,
                    location: event.location,
                    startTime: event.startTime,
                    endTime: event.endTime,
                    isActive: event.isActive,
                    totalRaces: totalRaces,
                    winRaces: winRaces,
                    races: races,
                };
            })
            .filter(Boolean); // Отфильтровываем null значения

        // Сортируем события по времени начала (от новых к старым)
        history.sort((a, b) => new Date(b.startTime) - new Date(a.startTime));

        return res.json({
            success: true,
            totalWins: totalWins,
            totalSuccessful: totalSuccessful,
            totalFail: totalFail,
            history: history,
        });
    } catch (error) {
        console.error('Ошибка получения истории игр пользователя:', error);
        return res.status(500).json({
            message: 'Внутренняя ошибка сервера',
            error: error.message,
        });
    }
});

// Эндпоинт для обновления статуса приза
server.post('/updatePrizeStatus', authMiddleware, (req, res) => {
    try {
        const { prizeId, status } = req.body;
        const userId = parseInt(req.headers.authorization.split(' ')[1]);
        // Проверка корректности параметров
        if (!prizeId || !status || !userId || isNaN(userId)) {
            return res.status(400).json({
                message: 'Некорректные параметры запроса',
                error: 'Bad Request',
            });
        }

        // Проверка допустимых значений для статуса
        const validStatuses = ['new', 'taked', 'noTaked'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({
                message: 'Некорректное значение статуса. Допустимые значения: new, taked, noTaked',
                error: 'Bad Request',
            });
        }

        const dbPath = path.resolve(__dirname, 'db.json');
        const dbData = JSON.parse(fs.readFileSync(dbPath, 'UTF-8'));

        // Находим пользователя
        const userIndex = dbData.users.findIndex((u) => u.id === userId);
        if (userIndex === -1) {
            return res.status(404).json({
                message: 'Пользователь не найден',
                error: 'Not Found',
            });
        }

        const user = dbData.users[userIndex];

        // Проверяем существование массива призов
        if (!Array.isArray(user.prizes) || user.prizes.length === 0) {
            return res.status(404).json({
                message: 'У пользователя нет призов',
                error: 'Not Found',
            });
        }

        // Находим приз с указанным ID
        const prizeIndex = user.prizes.findIndex((p) => p.id === prizeId);
        if (prizeIndex === -1) {
            return res.status(404).json({
                message: 'Приз с указанным ID не найден',
                error: 'Not Found',
            });
        }

        // Обновляем статус приза
        user.prizes[prizeIndex].status = status;
        user.prizes[prizeIndex].updateTime = new Date().toISOString();

        // Сохраняем изменения
        dbData.users[userIndex] = user;
        fs.writeFileSync(dbPath, JSON.stringify(dbData, null, 2), 'UTF-8');

        return res.json({
            success: true,
            message: 'Статус приза успешно обновлен',
            prize: user.prizes[prizeIndex],
        });
    } catch (error) {
        console.error('Ошибка обновления статуса приза:', error);
        return res.status(500).json({
            message: 'Внутренняя ошибка сервера',
            error: error.message,
        });
    }
});

// Эндпоинт для получения всех призов пользователя
server.get('/userPrizes', authMiddleware, (req, res) => {
    try {
        const userId = parseInt(req.headers.authorization.split(' ')[1]);

        if (!userId || isNaN(userId)) {
            return res.status(401).json({
                message: 'Некорректная авторизация',
                error: 'Unauthorized',
            });
        }

        const dbPath = path.resolve(__dirname, 'db.json');
        const dbData = JSON.parse(fs.readFileSync(dbPath, 'UTF-8'));

        // Находим пользователя
        const user = dbData.users.find((u) => u.id === userId);
        if (!user) {
            return res.status(404).json({
                message: 'Пользователь не найден',
                error: 'Not Found',
            });
        }

        // Проверяем наличие массива призов
        const prizes = Array.isArray(user.prizes) ? user.prizes : [];

        // Возвращаем все призы пользователя, сортируя по дате от новых к старым
        const sortedPrizes = [...prizes].sort((a, b) => {
            return new Date(b.timestamp) - new Date(a.timestamp);
        });

        return res.json({
            success: true,
            userId: userId,
            userName: user.username,
            prizes: sortedPrizes,
            totalPrizes: sortedPrizes.length,
        });
    } catch (error) {
        console.error('Ошибка получения призов пользователя:', error);
        return res.status(500).json({
            message: 'Внутренняя ошибка сервера',
            error: error.message,
        });
    }
});

// Эндпоинт для тестирования финализации события (требуется авторизация)
server.post('/finalizeEvent', authMiddleware, (req, res) => {
    try {
        const { eventId, forceActive } = req.body;

        // Проверка обязательных полей
        if (!eventId) {
            return res.status(400).json({
                message: 'Необходимо указать ID события',
                error: 'Bad Request',
            });
        }

        const dbPath = path.resolve(__dirname, 'db.json');
        const dbData = JSON.parse(fs.readFileSync(dbPath, 'UTF-8'));

        // Находим событие
        const eventIndex = dbData.event.findIndex((e) => e.id === eventId);
        if (eventIndex === -1) {
            return res.status(404).json({
                message: 'Событие не найдено',
                error: 'Not Found',
            });
        }

        const event = dbData.event[eventIndex];

        // Если указан параметр forceActive, устанавливаем событие как активное перед завершением
        if (forceActive) {
            event.isActive = true;
            console.log(`Принудительно устанавливаем событие ${event.id} как активное`);
        }

        // Сохраняем предыдущий статус для определения eventJustEnded
        const wasActive = event.isActive;

        // Принудительно делаем событие неактивным
        event.isActive = false;
        event.timeLeft = 0;

        // Симулируем завершение события (если оно было активно)
        const eventJustEnded = wasActive || forceActive;

        console.log(
            `Принудительное завершение события ${event.id}, было активно: ${wasActive}, forceActive: ${forceActive}`,
        );

        // Сохраняем изменения события
        dbData.event[eventIndex] = event;

        // Ручное начисление призов, если событие только что завершилось
        let processedUsers = [];

        if (eventJustEnded) {
            // Для каждого пользователя проверяем, участвовал ли он в событии
            if (dbData.users && Array.isArray(dbData.users)) {
                dbData.users.forEach((user) => {
                    console.log(`Проверяем пользователя: ${user.username} (ID: ${user.id})`);

                    // Проверяем, делал ли пользователь выборы в этом событии
                    const userChoices = Array.isArray(dbData.userChoices)
                        ? dbData.userChoices.filter(
                              (choice) => choice.userId === user.id && choice.eventId === event.id,
                          )
                        : [];

                    console.log(
                        `Пользователь ${user.username} (ID: ${user.id}) имеет ${userChoices.length} выборов в событии ${event.id}`,
                    );

                    // Если пользователь делал выборы, значит он участвовал в событии
                    if (userChoices.length > 0) {
                        console.log(
                            `Пользователь ${user.username} (ID: ${user.id}) участвовал в событии ${event.id}, обрабатываем результаты...`,
                        );

                        // Подсчитываем количество выигрышей
                        let winsCount = 0;
                        const totalRaces = event.raceData.length;

                        console.log(`Всего гонок в событии: ${totalRaces}`);

                        // Для каждой гонки проверяем, угадал ли пользователь победителя
                        userChoices.forEach((choice) => {
                            // Находим результат гонки
                            const raceResult = dbData.raceResults.find(
                                (r) => r.eventId === event.id && r.raceId === choice.raceId,
                            );

                            console.log(`Гонка ${choice.raceId}: пользователь выбрал лошадь ${choice.horseId}`);

                            if (raceResult) {
                                console.log(
                                    `Результат гонки ${raceResult.raceId}: победила лошадь ${raceResult.winnerHorseId}`,
                                );
                            } else {
                                console.log(
                                    `Результат гонки ${choice.raceId} не найден! Принудительно генерируем результат...`,
                                );

                                // Если результата еще нет, генерируем его (если это гонка из текущего события)
                                const race = event.raceData.find((r) => r.id === choice.raceId);
                                if (race && race.horseData && race.horseData.length > 0) {
                                    // Выбираем лошадь, которую выбрал текущий пользователь, чтобы он выиграл
                                    // Это только для тестирования - в реальной системе победитель выбирается случайно
                                    const winnerHorse =
                                        race.horseData.find((h) => h.id === choice.horseId) ||
                                        race.horseData[Math.floor(Math.random() * race.horseData.length)];

                                    // Добавляем результат гонки
                                    const resultId = dbData.raceResults ? dbData.raceResults.length + 1 : 1;
                                    if (!dbData.raceResults) dbData.raceResults = [];

                                    dbData.raceResults.push({
                                        id: resultId,
                                        eventId: event.id,
                                        raceId: choice.raceId,
                                        winnerHorseId: winnerHorse.id,
                                        winnerHorseName: winnerHorse.name,
                                        winnerHorseColor: winnerHorse.color || '',
                                        finishTime: new Date().toISOString(),
                                    });

                                    // Обновляем позиции лошадей в гонке
                                    // Победитель всегда на первой позиции
                                    winnerHorse.position = 1;

                                    // Генерируем оставшиеся позиции (начиная с 2)
                                    const remainingPositions = Array.from(
                                        { length: race.horseData.length - 1 },
                                        (_, i) => i + 2,
                                    );
                                    // Перемешиваем позиции
                                    remainingPositions.sort(() => 0.5 - Math.random());

                                    // Присваиваем перемешанные позиции оставшимся лошадям
                                    let posIndex = 0;
                                    race.horseData.forEach((horse) => {
                                        if (horse.id !== winnerHorse.id) {
                                            horse.position = remainingPositions[posIndex++];
                                        }
                                    });

                                    console.log(
                                        `Создан результат для гонки ${choice.raceId}: победила лошадь ${winnerHorse.name}`,
                                    );

                                    // Обновляем результат проверки (пользователь угадал победителя)
                                    if (winnerHorse.id === choice.horseId) {
                                        winsCount++;
                                        console.log(`Пользователь угадал победителя в гонке ${choice.raceId}!`);
                                    }
                                }
                            }

                            // Если есть результат и пользователь угадал победителя
                            if (raceResult && raceResult.winnerHorseId === choice.horseId) {
                                winsCount++;
                                console.log(`Пользователь угадал победителя в гонке ${choice.raceId}!`);
                            }
                        });

                        console.log(`Пользователь ${user.username} угадал ${winsCount} из ${totalRaces} гонок`);

                        // Определяем приз в зависимости от количества выигрышей
                        let prizeText = '';
                        if (winsCount === 3) {
                            prizeText = '5 000 $';
                        } else if (winsCount === 2) {
                            prizeText = '2 500 $';
                        } else if (winsCount === 1) {
                            prizeText = 'Free spin';
                        } else {
                            prizeText = 'no problem, you can try your luck on our website';
                        }

                        // Добавляем приз пользователю
                        if (!Array.isArray(user.prizes)) {
                            user.prizes = [];
                            console.log(`Создан массив призов для пользователя ${user.username}`);
                        }

                        // Формируем информацию о призе
                        const prize = {
                            id: user.prizes.length + 1,
                            eventId: event.id,
                            prizeText: prizeText,
                            winsCount: winsCount,
                            totalRaces: totalRaces,
                            status: 'new', // new, taked или noTaked
                            timestamp: new Date().toISOString(),
                        };

                        // Добавляем приз в список призов пользователя
                        user.prizes.push(prize);

                        console.log(
                            `Пользователь ${user.username} (ID: ${user.id}) получил приз: ${prizeText} (выиграл ${winsCount}/${totalRaces} гонок)`,
                        );

                        // Добавляем в список обработанных пользователей
                        processedUsers.push({
                            userId: user.id,
                            username: user.username,
                            winsCount: winsCount,
                            totalRaces: totalRaces,
                            prize: prizeText,
                        });
                    }
                });
            }
        }

        // Сохраняем изменения в базу данных
        fs.writeFileSync(dbPath, JSON.stringify(dbData, null, 2), 'UTF-8');

        return res.json({
            success: true,
            message: wasActive
                ? `Событие ${event.id} успешно завершено и призы начислены`
                : `Событие ${event.id} уже было завершено ранее`,
            event: {
                id: event.id,
                isActive: event.isActive,
                timeLeft: event.timeLeft,
            },
            processedUsers: processedUsers,
        });
    } catch (error) {
        console.error('Ошибка финализации события:', error);
        return res.status(500).json({
            message: 'Внутренняя ошибка сервера',
            error: error.message,
        });
    }
});

// Эндпоинт для обновления события (требуется авторизация)
server.post('/updateEvent', authMiddleware, (req, res) => {
    try {
        const dbPath = path.resolve(__dirname, 'db.json');
        const dbData = JSON.parse(fs.readFileSync(dbPath, 'UTF-8'));

        if (!Array.isArray(dbData.event)) {
            dbData.event = [];
        }

        const { location, startTime, endTime, raceData } = req.body;

        // Проверка обязательных полей
        if (!location || !startTime || !endTime || !raceData) {
            return res.status(400).json({
                message: 'Not all required fields are filled',
                error: 'Bad Request',
            });
        }

        // Деактивация всех предыдущих событий
        dbData.event.forEach((event) => {
            event.isActive = false;
        });

        // Проверка активности для нового события
        const currentTime = new Date();
        const newStartTime = new Date(startTime);
        const newEndTime = new Date(endTime);
        const isActive = currentTime >= newStartTime && currentTime <= newEndTime;

        // Расчет оставшегося времени в секундах
        const timeLeft = Math.max(0, Math.floor((newEndTime - currentTime) / 1000));

        // Создание нового события с новым id
        const newId = dbData.event.length > 0 ? Math.max(...dbData.event.map((e) => e.id)) + 1 : 1;

        const newEvent = {
            id: newId,
            isActive,
            location,
            startTime,
            endTime,
            timeLeft,
            raceData,
        };

        // Добавление нового события в конец массива
        dbData.event.push(newEvent);

        fs.writeFileSync(dbPath, JSON.stringify(dbData, null, 2), 'UTF-8');

        return res.json({
            success: true,
            message: 'New event added',
            event: newEvent,
        });
    } catch (error) {
        console.error('Error adding event:', error);
        return res.status(500).json({
            message: 'Error adding event',
            error: error.message,
        });
    }
});

// Эндпоинт для получения данных авторизованного пользователя
server.get('/user', authMiddleware, (req, res) => {
    try {
        console.log('Запрос к /user получен');
        console.log('Заголовок авторизации:', req.headers.authorization);

        // Получаем userId из заголовка авторизации
        const userId = parseInt(req.headers.authorization.split(' ')[1]);
        console.log('ID пользователя:', userId);

        const dbPath = path.resolve(__dirname, 'db.json');
        const dbData = JSON.parse(fs.readFileSync(dbPath, 'UTF-8'));
        const { users = [] } = dbData;
        console.log('Всего пользователей в БД:', users.length);

        const user = users.find((u) => u.id === userId);
        console.log('Найден пользователь:', user ? 'Да' : 'Нет');

        if (user) {
            const { password, ...userWithoutPassword } = user;

            // Получаем последнее событие для проверки userChoices
            let lastEvent = null;
            if (dbData.event && dbData.event.length) {
                lastEvent = dbData.event[dbData.event.length - 1];
            }

            // Получаем выборы пользователя
            let userChoices = [];
            if (lastEvent && dbData.userChoices) {
                userChoices = dbData.userChoices.filter(
                    (choice) => choice.userId === user.id && choice.eventId === lastEvent.id,
                );
            }

            return res.json({
                success: true,
                user: userWithoutPassword,
                userChoices,
            });
        } else {
            return res.status(404).json({
                success: false,
                message: 'Пользователь не найден',
            });
        }
    } catch (error) {
        console.error('Ошибка получения данных пользователя:', error);
        return res.status(500).json({
            success: false,
            message: 'Внутренняя ошибка сервера',
            error: error.message,
        });
    }
});

// Эндпоинт для запуска нового ивента (требуется авторизация)
server.post('/createEvent', authMiddleware, (req, res) => {
    try {
        const dbPath = path.resolve(__dirname, 'db.json');
        const dbData = JSON.parse(fs.readFileSync(dbPath, 'UTF-8'));

        // Деактивация всех предыдущих событий
        dbData.event.forEach((e) => {
            e.isActive = false;
        });

        // Создание новых временных рамок для события
        const currentTime = new Date();
        const startTime = new Date(currentTime.getTime() + EVENT_START_DELAY);
        const endTime = new Date(startTime.getTime() + EVENT_DURATION);

        // Генерация имен и характеристик лошадей
        const generateHorses = (raceId) => {
            const horseNames = [
                'Thunder',
                'Storm',
                'Lightning',
                'Shadow',
                'Spirit',
                'Arrow',
                'Blaze',
                'Wind',
                'Flash',
                'Star',
                'Champion',
                'Racer',
                'Victor',
                'Runner',
                'Winner',
            ];

            const colors = ['white', 'green', 'red', 'yellow', 'birch', 'blue', 'purple', 'pink', 'black'];

            return Array.from({ length: 10 }, (_, i) => {
                return {
                    id: i + 1,
                    name: horseNames[Math.floor(Math.random() * horseNames.length)],
                    age: Math.floor(Math.random() * 6) + 3,
                    color: colors[Math.floor(Math.random() * colors.length)],
                    weight: `${Math.floor(Math.random() * 100) + 450} kg`,
                    stats: `${Math.floor(Math.random() * 15) + 1}/${Math.floor(Math.random() * 5) + 1}`,
                    position: i + 1, // Начальные позиции по порядку
                };
            });
        };

        // Генерация данных о забегах
        const races = Array.from({ length: NUMBER_OF_RACES }, (_, index) => {
            // Рассчитываем время начала с учетом RACE_DURATION и RACE_INTERVAL
            const totalRaceTime = RACE_DURATION + RACE_INTERVAL;
            const raceStartTime = new Date(startTime.getTime() + index * totalRaceTime);
            const raceEndTime = new Date(raceStartTime.getTime() + RACE_DURATION);

            return {
                id: index + 1,
                title: `Race ${index + 1}`,
                description: `Race ${index + 1} of the day`,
                startTime: raceStartTime.toISOString(),
                endTime: raceEndTime.toISOString(),
                horseData: generateHorses(index + 1),
            };
        });

        // Создаем новый ID для события
        const newId = dbData.event.length > 0 ? Math.max(...dbData.event.map((e) => e.id)) + 1 : 1;

        // Создаем новое событие
        const newEvent = {
            id: newId,
            isActive: true,
            location: 'Online',
            startTime: startTime.toISOString(),
            endTime: endTime.toISOString(),
            timeLeft: Math.floor(EVENT_DURATION / 1000), // время в секундах
            raceData: races,
        };

        // Добавляем новое событие в массив
        dbData.event.push(newEvent);

        // Сохраняем изменения в БД
        fs.writeFileSync(dbPath, JSON.stringify(dbData, null, 2), 'UTF-8');

        return res.json({
            success: true,
            message: 'Новое событие успешно создано',
            event: newEvent,
        });
    } catch (error) {
        console.error('Ошибка создания нового события:', error);
        return res.status(500).json({
            success: false,
            message: 'Внутренняя ошибка сервера',
            error: error.message,
        });
    }
});

// Используем маршрутизатор для остальных путей (авторизация не требуется)
server.use(router);

// Функция для установки времени события при запуске сервера
const initializeEventTime = () => {
    try {
        const dbPath = path.resolve(__dirname, 'db.json');
        const dbData = JSON.parse(fs.readFileSync(dbPath, 'UTF-8'));

        // Создаем историю прошлых событий
        const createHistoryEvents = () => {
            // Создаем прошлое событие, которое уже закончилось
            // Убедимся, что это действительно в прошлом, используя даты "год назад"
            // вместо "неделю назад", чтобы избежать проблем с датами в будущем
            const historyStartTime = new Date();
            historyStartTime.setFullYear(historyStartTime.getFullYear() - 1); // Год назад вместо недели
            const historyEndTime = new Date(historyStartTime.getTime() + EVENT_DURATION);

            // ID для прошлого события
            const historyEventId = 1;

            // Генерируем данные о гонках прошлого события
            const historyRaces = Array.from({ length: NUMBER_OF_RACES }, (_, index) => {
                const totalRaceTime = RACE_DURATION + RACE_INTERVAL;
                const raceStartTime = new Date(historyStartTime.getTime() + index * totalRaceTime);
                const raceEndTime = new Date(raceStartTime.getTime() + RACE_DURATION);

                // Генерируем лошадей для прошлой гонки
                const horseNames = [
                    'Thunder',
                    'Storm',
                    'Lightning',
                    'Shadow',
                    'Spirit',
                    'Arrow',
                    'Blaze',
                    'Wind',
                    'Flash',
                    'Star',
                ];

                const colors = ['white', 'green', 'red', 'yellow', 'birch', 'blue', 'purple', 'pink', 'black'];

                // Генерируем данные о лошадях с уже установленными позициями (гонка завершена)
                const horseData = Array.from({ length: 10 }, (_, i) => {
                    return {
                        id: i + 1,
                        name: horseNames[i],
                        age: Math.floor(Math.random() * 6) + 3,
                        color: colors[Math.floor(Math.random() * colors.length)],
                        weight: `${Math.floor(Math.random() * 100) + 450} kg`,
                        stats: `${Math.floor(Math.random() * 15) + 1}/${Math.floor(Math.random() * 5) + 1}`,
                        position: i + 1, // Временно устанавливаем позиции по порядку
                    };
                });

                return {
                    id: index + 1,
                    title: `Race ${index + 1}`,
                    description: `Race ${index + 1} of the past event`,
                    startTime: raceStartTime.toISOString(),
                    endTime: raceEndTime.toISOString(),
                    horseData: horseData,
                };
            });

            // Выберем победителей для гонок и перемешаем позиции других лошадей
            historyRaces.forEach((race) => {
                // Случайно выберем победителя для 1 и 2 гонки (admin должен угадать)
                // Для третьей гонки выбираем фиксированного победителя (которого admin не угадает)
                let winnerId;
                if (race.id === 1) {
                    winnerId = 3; // ID=3 будет победителем первой гонки
                } else if (race.id === 2) {
                    winnerId = 5; // ID=5 будет победителем второй гонки
                } else {
                    winnerId = 7; // ID=7 будет победителем третьей гонки
                }

                // Устанавливаем позицию 1 для победителя
                const winner = race.horseData.find((h) => h.id === winnerId);
                winner.position = 1;

                // Перемешиваем позиции других лошадей
                const positions = [2, 3, 4, 5, 6, 7, 8, 9, 10];
                positions.sort(() => 0.5 - Math.random());

                let posIndex = 0;
                race.horseData.forEach((horse) => {
                    if (horse.id !== winnerId) {
                        horse.position = positions[posIndex++];
                    }
                });
            });

            // Создаем прошлое событие
            const historyEvent = {
                id: historyEventId,
                isActive: false,
                location: 'Moscow',
                startTime: historyStartTime.toISOString(),
                endTime: historyEndTime.toISOString(),
                timeLeft: 0,
                raceData: historyRaces,
            };

            // Создаем выборы пользователя admin (ID=1) для прошлого события
            // Он угадывает 2 из 3 гонок
            const userChoices = [
                {
                    id: 1,
                    userId: 1, // ID пользователя admin
                    eventId: historyEventId,
                    raceId: 1,
                    horseId: 3, // Выбрал победителя первой гонки (угадал)
                    reOpen: false,
                    timestamp: new Date(historyStartTime.getTime() - 1000 * 60 * 5).toISOString(), // За 5 минут до начала
                },
                {
                    id: 2,
                    userId: 1,
                    eventId: historyEventId,
                    raceId: 2,
                    horseId: 5, // Выбрал победителя второй гонки (угадал)
                    reOpen: false,
                    timestamp: new Date(historyStartTime.getTime() - 1000 * 60 * 4).toISOString(), // За 4 минуты до начала
                },
                {
                    id: 3,
                    userId: 1,
                    eventId: historyEventId,
                    raceId: 3,
                    horseId: 2, // Выбрал НЕ победителя третьей гонки (не угадал)
                    reOpen: false,
                    timestamp: new Date(historyStartTime.getTime() - 1000 * 60 * 3).toISOString(), // За 3 минуты до начала
                },
            ];

            // Создаем результаты гонок для прошлого события
            const raceResults = historyRaces.map((race) => {
                const winner = race.horseData.find((horse) => horse.position === 1);
                const finishTime = new Date(race.endTime);
                // Добавляем случайное количество секунд, чтобы время финиша было чуть позже времени окончания гонки
                finishTime.setSeconds(finishTime.getSeconds() + Math.floor(Math.random() * 10) + 1);

                return {
                    id: race.id,
                    eventId: historyEventId,
                    raceId: race.id,
                    winnerHorseId: winner.id,
                    winnerHorseName: winner.name,
                    winnerHorseColor: winner.color,
                    finishTime: finishTime.toISOString(),
                };
            });

            // Создаем приз для пользователя admin (ID=1) за прошлое событие
            // Он угадал 2 из 3 гонок, поэтому получает приз "2 500 $"
            const adminPrize = {
                id: 1,
                eventId: historyEventId,
                prizeText: '2 500 $',
                winsCount: 2,
                totalRaces: 3,
                status: 'taked',
                timestamp: new Date(historyEndTime.getTime() + 1000 * 60).toISOString(), // Через минуту после завершения события
                updateTime: new Date(historyEndTime.getTime() + 1000 * 60 * 10).toISOString(), // Через 10 минут после завершения события
            };

            return {
                historyEvent,
                userChoices,
                raceResults,
                adminPrize,
            };
        };

        // Очистка массива выборов пользователей
        dbData.userChoices = [];
        console.log('Массив выборов пользователей очищен');

        // Очистка массива результатов гонок
        dbData.raceResults = [];
        console.log('Массив результатов гонок очищен');

        // Очистка прошлых событий
        dbData.event = [];
        console.log('Массив прошлых событий очищен');

        // Очистка призов у всех пользователей, кроме админа
        if (dbData.users && Array.isArray(dbData.users)) {
            dbData.users.forEach((user) => {
                if (user.id !== 1) {
                    // Очищаем призы у всех, кроме админа (ID=1)
                    user.prizes = [];
                } else {
                    // Для админа сохраняем пустой массив призов,
                    // а потом добавим исторический приз
                    user.prizes = [];
                }
            });
            console.log('Призы пользователей очищены');
        }

        // Создание нового события
        const currentTime = new Date();
        const startTime = new Date(currentTime.getTime() + EVENT_START_DELAY);
        const endTime = new Date(startTime.getTime() + EVENT_DURATION);

        // Генерация имен и характеристик лошадей
        const generateHorses = (raceId) => {
            const horseNames = [
                'Thunder',
                'Storm',
                'Lightning',
                'Shadow',
                'Spirit',
                'Arrow',
                'Blaze',
                'Wind',
                'Flash',
                'Star',
                'Champion',
                'Runner',
                'Racer',
                'Victor',
                'Winner',
            ];
            const colors = ['white', 'green', 'red', 'yellow', 'birch', 'blue', 'purple', 'pink', 'black'];

            // Функция для генерации случайных коэффициентов
            const generateOdds = () => {
                const numerator = Math.floor(Math.random() * 15) + 1; // 1-15
                const denominator = Math.floor(Math.random() * 5) + 1; // 1-5
                return `${numerator}/${denominator}`;
            };

            // Перемешиваем имена для разнообразия
            const shuffledNames = [...horseNames].sort(() => 0.5 - Math.random());

            return Array.from({ length: 10 }, (_, index) => ({
                id: index + 1,
                name: shuffledNames[index],
                age: Math.floor(Math.random() * 6) + 3, // 3-8 лет
                color: colors[Math.floor(Math.random() * colors.length)],
                weight: `${Math.floor(Math.random() * 100) + 450} kg`, // 450-550 kg
                stats: generateOdds(),
                position: null, // Добавляем позицию со значением null
            }));
        };

        // Генерация данных о забегах
        const races = Array.from({ length: NUMBER_OF_RACES }, (_, index) => {
            // Рассчитываем время начала с учетом RACE_DURATION и RACE_INTERVAL
            const totalRaceTime = RACE_DURATION + RACE_INTERVAL;
            const raceStartTime = new Date(startTime.getTime() + index * totalRaceTime);
            const raceEndTime = new Date(raceStartTime.getTime() + RACE_DURATION);

            return {
                id: index + 1,
                title: `Race ${index + 1}`,
                description: `Race ${index + 1} of the day`,
                startTime: raceStartTime.toISOString(),
                endTime: raceEndTime.toISOString(),
                horseData: generateHorses(index + 1),
            };
        });

        // Создание нового события
        const newEvent = {
            id: 2, // ID=2, так как ID=1 будет у исторического события
            isActive: true, // Делаем событие активным сразу при запуске
            location: 'Online',
            startTime: startTime.toISOString(),
            endTime: endTime.toISOString(),
            timeLeft: Math.floor(EVENT_DURATION / 1000), // время в секундах
            raceData: races,
        };

        // Создаем историю и текущие события
        const { historyEvent, userChoices, raceResults, adminPrize } = createHistoryEvents();

        // Добавляем историческое и текущее события
        dbData.event = [historyEvent, newEvent];

        // Добавляем выборы пользователя
        dbData.userChoices = userChoices;

        // Добавляем результаты гонок
        dbData.raceResults = raceResults;

        // Добавляем приз пользователю admin
        const adminUser = dbData.users.find((u) => u.id === 1);
        if (adminUser) {
            adminUser.prizes = [adminPrize];
        }

        fs.writeFileSync(dbPath, JSON.stringify(dbData, null, 2), 'UTF-8');
        console.log('Все временные данные очищены');
        console.log(`Новое событие настроено:`);
        console.log(`Начало: ${startTime}`);
        console.log(`Конец: ${endTime}`);
        console.log(`Создано ${races.length} забегов с ${races[0].horseData.length} лошадьми каждый`);
        console.log(`Создано историческое событие, где пользователь угадал 2 из 3 гонок`);
        console.log(`Добавлен приз пользователю admin за историческое событие: 2 500 $`);
    } catch (error) {
        console.error('Ошибка установки времени события:', error);
    }
};

// Инициализация времени при запуске сервера
initializeEventTime();

// Функция для обновления статуса события
const updateEventStatus = () => {
    try {
        const dbPath = path.resolve(__dirname, 'db.json');
        const dbData = JSON.parse(fs.readFileSync(dbPath, 'UTF-8'));

        if (!dbData.event || !dbData.event.length) return;

        const lastEvent = dbData.event[dbData.event.length - 1];
        const currentTime = new Date();
        const startTime = new Date(lastEvent.startTime);
        const endTime = new Date(lastEvent.endTime);

        const wasActive = lastEvent.isActive;
        const isActive = currentTime >= startTime && currentTime <= endTime;
        const timeLeft = Math.max(0, Math.floor((endTime - currentTime) / 1000));

        // Проверяем, завершилось ли событие (было активно, но теперь не активно)
        const eventJustEnded = wasActive && !isActive;

        if (lastEvent.isActive !== isActive || lastEvent.timeLeft !== timeLeft) {
            lastEvent.isActive = isActive;
            lastEvent.timeLeft = timeLeft;

            // Если событие только что завершилось, проверяем участие пользователей
            if (eventJustEnded) {
                console.log(`Событие ${lastEvent.id} завершилось, проверяем участие пользователей...`);

                // Для каждого пользователя проверяем, участвовал ли он в событии
                if (dbData.users && Array.isArray(dbData.users)) {
                    dbData.users.forEach((user) => {
                        console.log(`Проверяем пользователя: ${user.username} (ID: ${user.id})`);

                        // Проверяем, делал ли пользователь выборы в этом событии
                        const userChoices = Array.isArray(dbData.userChoices)
                            ? dbData.userChoices.filter(
                                  (choice) => choice.userId === user.id && choice.eventId === lastEvent.id,
                              )
                            : [];

                        console.log(
                            `Пользователь ${user.username} (ID: ${user.id}) имеет ${userChoices.length} выборов в событии ${lastEvent.id}`,
                        );

                        // Если пользователь делал выборы, значит он участвовал в событии
                        if (userChoices.length > 0) {
                            console.log(
                                `Пользователь ${user.username} (ID: ${user.id}) участвовал в событии ${lastEvent.id}, обрабатываем результаты...`,
                            );

                            // Подсчитываем количество выигрышей
                            let winsCount = 0;
                            const totalRaces = lastEvent.raceData.length;

                            console.log(`Всего гонок в событии: ${totalRaces}`);

                            // Для каждой гонки проверяем, угадал ли пользователь победителя
                            userChoices.forEach((choice) => {
                                // Находим результат гонки
                                const raceResult = dbData.raceResults.find(
                                    (r) => r.eventId === lastEvent.id && r.raceId === choice.raceId,
                                );

                                console.log(`Гонка ${choice.raceId}: пользователь выбрал лошадь ${choice.horseId}`);

                                if (raceResult) {
                                    console.log(
                                        `Результат гонки ${raceResult.raceId}: победила лошадь ${raceResult.winnerHorseId}`,
                                    );
                                } else {
                                    console.log(`Результат гонки ${choice.raceId} не найден!`);
                                }

                                // Если есть результат и пользователь угадал победителя
                                if (raceResult && raceResult.winnerHorseId === choice.horseId) {
                                    winsCount++;
                                    console.log(`Пользователь угадал победителя в гонке ${choice.raceId}!`);
                                }
                            });

                            console.log(`Пользователь ${user.username} угадал ${winsCount} из ${totalRaces} гонок`);

                            // Определяем приз в зависимости от количества выигрышей
                            let prizeText = '';
                            if (winsCount === 3) {
                                prizeText = '5 000 $';
                            } else if (winsCount === 2) {
                                prizeText = '2 500 $';
                            } else if (winsCount === 1) {
                                prizeText = 'Free spin';
                            } else {
                                prizeText = 'no problem, you can try your luck on our website';
                            }

                            // Добавляем приз пользователю
                            if (!Array.isArray(user.prizes)) {
                                user.prizes = [];
                                console.log(`Создан массив призов для пользователя ${user.username}`);
                            }

                            // Формируем информацию о призе
                            const prize = {
                                id: user.prizes.length + 1,
                                eventId: lastEvent.id,
                                prizeText: prizeText,
                                winsCount: winsCount,
                                totalRaces: totalRaces,
                                status: 'new', // new, taked или noTaked
                                timestamp: new Date().toISOString(),
                            };

                            // Добавляем приз в список призов пользователя
                            user.prizes.push(prize);

                            console.log(
                                `Пользователь ${user.username} (ID: ${user.id}) получил приз: ${prizeText} (выиграл ${winsCount}/${totalRaces} гонок)`,
                            );
                        }
                    });
                }
            }

            fs.writeFileSync(dbPath, JSON.stringify(dbData, null, 2), 'UTF-8');
            console.log(`Статус события обновлен: активно=${isActive}, времени осталось: ${timeLeft} сек.`);
        }

        // Вызываем функцию обновления результатов гонок
        updateRaceResults();
    } catch (error) {
        console.error('Ошибка обновления статуса события:', error);
    }
};

// Функция для обновления результатов гонок
const updateRaceResults = () => {
    try {
        const dbPath = path.resolve(__dirname, 'db.json');
        const dbData = JSON.parse(fs.readFileSync(dbPath, 'UTF-8'));

        // Инициализируем массив результатов гонок, если он не существует
        if (!dbData.raceResults) {
            dbData.raceResults = [];
        }

        // Проверяем все события
        if (dbData.event && dbData.event.length > 0) {
            const currentTime = new Date();
            let needToUpdateDb = false;

            dbData.event.forEach((event) => {
                // Проходим по всем гонкам события
                if (event.raceData && Array.isArray(event.raceData)) {
                    event.raceData.forEach((race) => {
                        // Используем сохраненное время окончания гонки
                        const raceEndTime = new Date(race.endTime);
                        const raceEnded = currentTime > raceEndTime;

                        // Если гонка завершилась и результата для неё ещё нет, генерируем его
                        const resultExists = dbData.raceResults.some(
                            (result) => result.eventId === event.id && result.raceId === race.id,
                        );

                        if (raceEnded && !resultExists && race.horseData && race.horseData.length > 0) {
                            // Случайно выбираем лошадь-победителя
                            const winnerIndex = Math.floor(Math.random() * race.horseData.length);
                            const winnerHorse = race.horseData[winnerIndex];

                            // Добавляем результат в массив
                            dbData.raceResults.push({
                                id: dbData.raceResults.length + 1,
                                eventId: event.id,
                                raceId: race.id,
                                winnerHorseId: winnerHorse.id,
                                winnerHorseName: winnerHorse.name,
                                winnerHorseColor: winnerHorse.color || '',
                                finishTime: currentTime.toISOString(),
                            });

                            // Назначаем позиции лошадям
                            // Победитель всегда на первой позиции
                            race.horseData.find((horse) => horse.id === winnerHorse.id).position = 1;

                            // Генерируем оставшиеся позиции (начиная с 2)
                            const remainingPositions = Array.from(
                                { length: race.horseData.length - 1 },
                                (_, i) => i + 2,
                            );
                            // Перемешиваем позиции
                            remainingPositions.sort(() => 0.5 - Math.random());

                            // Присваиваем перемешанные позиции оставшимся лошадям
                            let posIndex = 0;
                            race.horseData.forEach((horse) => {
                                if (horse.id !== winnerHorse.id) {
                                    horse.position = remainingPositions[posIndex++];
                                }
                            });

                            console.log(`Race ${race.id} of event ${event.id} finished. Winner: ${winnerHorse.name}`);
                            needToUpdateDb = true;
                        }
                    });
                }
            });

            // Сохраняем изменения в базу данных, если были добавлены новые результаты
            if (needToUpdateDb) {
                fs.writeFileSync(dbPath, JSON.stringify(dbData, null, 2), 'UTF-8');
                console.log('Race results updated in database');
            }
        }
    } catch (error) {
        console.error('Error updating race results:', error);
    }
};

// Запуск проверки каждую минуту
setInterval(updateEventStatus, 10000);

// Запуск первой проверки сразу при запуске сервера
updateEventStatus();

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
