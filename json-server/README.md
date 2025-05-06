# API документация для MiniFhr

## Общая информация

- **Аутентификация**: Большинство эндпоинтов требуют аутентификации через Bearer-токен в заголовке `Authorization`. В качестве токена используется ID пользователя (например, `Authorization: Bearer 1`).
- **База данных**: Используется `json-server` с файлом `db.json`.
- **Задержка**: Искусственная задержка в 800 мс добавлена ко всем запросам для симуляции реальной сети.
- **Запуск сервера**: `cd json-server && node index.cjs`

## Эндпоинты API

### 1. Аутентификация и данные пользователя

#### `POST /login`

- **Описание**: Аутентификация пользователя по имени и паролю.
- **Аутентификация**: Не требуется.
- **Тело запроса**:
    ```json
    {
        "username": "admin",
        "password": "123"
    }
    ```
- **Пример ответа (Успех)**:
    ```json
    {
        "id": 1,
        "username": "admin",
        "prizes": [
            {
                "id": 1,
                "eventId": 1,
                "prizeText": "2 500 $",
                "winsCount": 2,
                "totalRaces": 3,
                "status": "taked",
                "timestamp": "2024-07-28T10:00:00.000Z",
                "updateTime": "2024-07-28T10:10:00.000Z"
            }
        ],
        "userChoices": [
            {
                "raceId": 1,
                "horseId": 3,
                "reOpen": false
            },
            {
                "raceId": 2,
                "horseId": 5,
                "reOpen": false
            },
            {
                "raceId": 3,
                "horseId": 2,
                "reOpen": false
            }
        ]
    }
    ```
- **Пример ответа (Ошибка)**:
    ```json
    {
        "message": "Invalid credentials",
        "error": "Unauthorized"
    }
    ```

#### `GET /user`

- **Описание**: Получение данных авторизованного пользователя.
- **Аутентификация**: Требуется (Bearer Token).
- **Пример ответа (Успех)**:
    ```json
    {
        "success": true,
        "user": {
            "id": 1,
            "username": "admin",
            "prizes": [
                {
                    "id": 1,
                    "eventId": 1,
                    "prizeText": "2 500 $",
                    "winsCount": 2,
                    "totalRaces": 3,
                    "status": "taked",
                    "timestamp": "2024-07-28T10:00:00.000Z",
                    "updateTime": "2024-07-28T10:10:00.000Z"
                }
            ]
        },
        "userChoices": [
            {
                "raceId": 1,
                "horseId": 3,
                "reOpen": false
            },
            {
                "raceId": 2,
                "horseId": 5,
                "reOpen": false
            },
            {
                "raceId": 3,
                "horseId": 2,
                "reOpen": false
            }
        ]
    }
    ```
- **Пример ответа (Ошибка - не найден)**:
    ```json
    {
        "success": false,
        "message": "Пользователь не найден"
    }
    ```

### 2. Выборы пользователя (ставки)

#### `POST /saveUserChoice`

- **Описание**: Сохранение или обновление выборов пользователя для одного или нескольких забегов в рамках события.
- **Аутентификация**: Требуется (Bearer Token).
- **Тело запроса**:
    ```json
    {
        "userId": 1,
        "eventId": 2,
        "choices": [
            { "raceId": 1, "horseId": 5, "reOpen": false },
            { "raceId": 2, "horseId": 8, "reOpen": true }
        ]
    }
    ```
- **Пример ответа (Успех)**:
    ```json
    {
        "success": true,
        "message": "Выборы пользователя сохранены",
        "userChoices": [
            {
                "id": 4,
                "userId": 1,
                "eventId": 2,
                "raceId": 1,
                "horseId": 5,
                "reOpen": false,
                "timestamp": "2024-07-29T12:30:15.123Z"
            },
            {
                "id": 5,
                "userId": 1,
                "eventId": 2,
                "raceId": 2,
                "horseId": 8,
                "reOpen": true,
                "timestamp": "2024-07-29T12:30:15.123Z"
            }
        ]
    }
    ```

#### `GET /myChoices`

- **Описание**: Получение всех выборов пользователя с детальной информацией о гонках и лошадях.
- **Аутентификация**: Требуется (Bearer Token).
- **Параметры Query**: `eventId` (опционально, Integer) - фильтрация по ID события.
- **Пример ответа (Успех)**:
    ```json
    {
        "success": true,
        "userChoices": [
            {
                "id": 1,
                "userId": 1,
                "eventId": 1,
                "raceId": 1,
                "horseId": 3,
                "reOpen": false,
                "timestamp": "2024-07-28T09:55:00.000Z",
                "horseName": "Lightning",
                "horseColor": "pink",
                "horseStats": "15/4",
                "horsePosition": 1,
                "raceTitle": "Race 1",
                "raceDescription": "Race 1 of the past event",
                "raceStartTime": "2024-07-28T10:00:00.000Z",
                "raceEndTime": "2024-07-28T10:01:00.000Z",
                "raceStatus": "finished",
                "raceEnded": true,
                "raceInProgress": false,
                "raceResult": {
                    "winnerHorseId": 3,
                    "winnerHorseName": "Lightning",
                    "winnerHorseColor": "pink",
                    "isUserWinner": true,
                    "finishTime": "2024-07-28T10:01:05.000Z"
                }
            }
            // ... другие выборы
        ]
    }
    ```

#### `GET /myActiveEventChoices`

- **Описание**: Получение выборов пользователя только для текущего активного события (или последнего, если активного нет).
- **Аутентификация**: Требуется (Bearer Token).
- **Параметры Query**: `eventId` (опционально, Integer) - ID конкретного события для поиска.
- **Пример ответа (Успех)**:
    ```json
    {
        "success": true,
        "userChoices": [
            {
                "id": 4,
                "userId": 1,
                "eventId": 2,
                "raceId": 1,
                "horseId": 5,
                "reOpen": false,
                "timestamp": "2024-07-29T12:30:15.123Z",
                "horseName": "Shadow",
                "horseColor": "red",
                "horseStats": "2/2",
                "horsePosition": null, // Позиция будет null до завершения гонки
                "raceTitle": "Race 1",
                "raceDescription": "Race 1 of the day",
                "raceStartTime": "2024-07-29T13:01:00.000Z",
                "raceEndTime": "2024-07-29T13:02:00.000Z",
                "raceStatus": "upcoming",
                "raceEnded": false,
                "raceInProgress": false,
                "raceResult": null,
                "isActiveEvent": true
            }
            // ... другие выборы для активного/последнего события
        ]
    }
    ```

### 3. События и Гонки

#### `GET /lastEvent`

- **Описание**: Получение информации о последнем созданном событии.
- **Аутентификация**: Не требуется, но если передан валидный Bearer Token, в ответ добавится поле `userChoices` для этого события.
- **Пример ответа**:
    ```json
    {
        "success": true,
        "event": {
            "id": 2,
            "isActive": true,
            "location": "Online",
            "startTime": "2024-07-29T13:01:00.000Z",
            "endTime": "2024-07-29T13:06:00.000Z", // Примерное время
            "timeLeft": 240, // Примерное оставшееся время в секундах
            "raceData": [
                {
                    "id": 1,
                    "title": "Race 1",
                    "description": "Race 1 of the day",
                    "startTime": "2024-07-29T13:01:00.000Z",
                    "endTime": "2024-07-29T13:02:00.000Z",
                    "horseData": [
                        {
                            "id": 1,
                            "name": "Thunder",
                            // ... другие поля лошади
                            "position": null
                        }
                        // ... другие лошади
                    ]
                }
                // ... другие гонки
            ]
        },
        "userChoices": [
            // Поле будет `undefined` если пользователь не авторизован
            {
                "raceId": 1,
                "horseId": 5,
                "reOpen": false
            }
            // ... другие выборы пользователя для этого события
        ]
    }
    ```

#### `GET /raceResult/:id`

- **Описание**: Получение детальных результатов конкретной гонки (включая всех лошадей, их позиции и выбор пользователя).
- **Аутентификация**: Требуется (Bearer Token).
- **Параметры Path**: `:id` (Integer) - ID гонки.
- **Параметры Query**: `eventId` (опционально, Integer) - ID события, в рамках которого искать гонку (по умолчанию ищет в активном/последнем).
- **Пример ответа (Успех, гонка завершена)**:
    ```json
    {
        "success": true,
        "raceData": {
            "id": 1,
            "title": "Race 1",
            "description": "Race 1 of the past event",
            "startTime": "2024-07-28T10:00:00.000Z",
            "endTime": "2024-07-28T10:01:00.000Z",
            "isFinished": true,
            "finishTime": "2024-07-28T10:01:05.000Z"
        },
        "userChoice": {
            "raceId": 1,
            "horseId": 3,
            "horseName": "Lightning",
            "horseColor": "pink",
            "horseStats": "15/4",
            "position": 1,
            "isWinner": true
        },
        "horses": [
            {
                "id": 3,
                "name": "Lightning",
                "age": 3,
                "color": "pink",
                "weight": "514 kg",
                "stats": "15/4",
                "position": 1
            },
            {
                "id": 8,
                "name": "Wind",
                // ... другие поля
                "position": 2
            }
            // ... все остальные лошади, отсортированные по позиции
        ],
        "winnerHorse": {
            "id": 3,
            "name": "Lightning",
            "color": "pink"
        }
    }
    ```
- **Пример ответа (Успех, гонка еще не завершена)**:
    ```json
    {
        "success": true,
        "raceData": {
            "id": 1,
            "title": "Race 1",
            "description": "Race 1 of the day",
            "startTime": "2024-07-29T13:01:00.000Z",
            "endTime": "2024-07-29T13:02:00.000Z",
            "isFinished": false,
            "finishTime": null
        },
        "userChoice": {
            "raceId": 1,
            "horseId": 5,
            "horseName": "Shadow",
            "horseColor": "red",
            "horseStats": "2/2",
            "position": null,
            "isWinner": null
        },
        "horses": [
            {
                "id": 1,
                "name": "Thunder",
                // ... другие поля
                "position": null
            }
            // ... все остальные лошади (позиция null)
        ],
        "winnerHorse": null
    }
    ```

#### `GET /userHistory`

- **Описание**: Получение истории всех событий, в которых участвовал пользователь, с результатами его выборов.
- **Аутентификация**: Требуется (Bearer Token).
- **Пример ответа (Успех)**:
    ```json
    {
        "success": true,
        "totalWins": 2, // Общее кол-во выигранных гонок
        "totalSuccessful": 3, // Общее кол-во завершившихся гонок, в которых участвовал
        "totalFail": 1, // Общее кол-во проигранных гонок
        "history": [
            {
                "eventId": 1,
                "location": "Moscow",
                "startTime": "2024-07-28T10:00:00.000Z",
                "endTime": "2024-07-28T10:05:00.000Z", // Примерное время
                "isActive": false,
                "totalRaces": 3, // Кол-во гонок в событии, где был выбор
                "winRaces": 2, // Кол-во выигранных гонок в событии
                "races": [
                    {
                        "raceId": 3,
                        "title": "Race 3",
                        "description": "Race 3 of the past event",
                        "startTime": "2024-07-28T10:04:00.000Z", // Примерное время
                        "endTime": "2024-07-28T10:05:00.000Z", // Примерное время
                        "isFinished": true,
                        "userChoice": {
                            "horseId": 2,
                            "horseName": "Storm",
                            "horseColor": "white",
                            "horseStats": "9/2",
                            "horsePosition": 5 // Позиция выбранной лошади
                        },
                        "result": {
                            "isWinner": false,
                            "winnerHorseId": 7,
                            "winnerHorseName": "Blaze",
                            "winnerHorseColor": "pink",
                            "finishTime": "2024-07-28T10:05:08.000Z" // Примерное время
                        },
                        "timestamp": "2024-07-28T09:57:00.000Z" // Время выбора
                    }
                    // ... другие гонки этого события (от новых к старым)
                ]
            }
            // ... другие события (от новых к старым)
        ]
    }
    ```

### 4. Призы пользователя

#### `GET /userPrizes`

- **Описание**: Получение списка всех призов пользователя.
- **Аутентификация**: Требуется (Bearer Token).
- **Пример ответа (Успех)**:
    ```json
    {
        "success": true,
        "userId": 1,
        "userName": "admin",
        "prizes": [
            {
                "id": 1,
                "eventId": 1,
                "prizeText": "2 500 $",
                "winsCount": 2,
                "totalRaces": 3,
                "status": "taked",
                "timestamp": "2024-07-28T10:06:00.000Z", // Время начисления
                "updateTime": "2024-07-28T10:10:00.000Z" // Время последнего обновления статуса
            }
            // ... другие призы (от новых к старым по timestamp)
        ],
        "totalPrizes": 1
    }
    ```

#### `POST /updatePrizeStatus`

- **Описание**: Обновление статуса конкретного приза пользователя.
- **Аутентификация**: Требуется (Bearer Token).
- **Тело запроса**:
    ```json
    {
        "prizeId": 1,
        "status": "taked" // Допустимые значения: "new", "taked", "noTaked"
    }
    ```
- **Пример ответа (Успех)**:
    ```json
    {
        "success": true,
        "message": "Статус приза успешно обновлен",
        "prize": {
            "id": 1,
            "eventId": 1,
            "prizeText": "2 500 $",
            "winsCount": 2,
            "totalRaces": 3,
            "status": "taked",
            "timestamp": "2024-07-28T10:06:00.000Z",
            "updateTime": "2024-07-29T14:00:00.123Z" // Новое время обновления
        }
    }
    ```

### 5. Управление Событиями (Административное/Тестовое)

#### `POST /finalizeEvent`

- **Описание**: Тестовый эндпоинт для принудительного завершения события, генерации результатов гонок (если их нет) и начисления призов.
- **Аутентификация**: Требуется (Bearer Token).
- **Тело запроса**:
    ```json
    {
        "eventId": 2,
        "forceActive": false // Опционально: установить isActive=true перед завершением
    }
    ```
- **Пример ответа (Успех)**:
    ```json
    {
        "success": true,
        "message": "Событие 2 успешно завершено и призы начислены",
        "event": {
            "id": 2,
            "isActive": false,
            "timeLeft": 0
        },
        "processedUsers": [
            {
                "userId": 1,
                "username": "admin",
                "winsCount": 1, // Кол-во угаданных гонок
                "totalRaces": 3, // Общее кол-во гонок в событии
                "prize": "Free spin" // Начисленный приз
            }
            // ... другие пользователи, участвовавшие в событии
        ]
    }
    ```

#### `POST /createEvent`

- **Описание**: Создает и запускает новое событие со случайно сгенерированными гонками и лошадьми. Деактивирует все предыдущие события.
- **Аутентификация**: Требуется (Bearer Token).
- **Тело запроса**: Не требуется.
- **Пример ответа (Успех)**:
    ```json
    {
        "success": true,
        "message": "Новое событие успешно создано",
        "event": {
            "id": 3, // ID нового события
            "isActive": true,
            "location": "Online",
            "startTime": "2024-07-29T14:05:00.000Z", // Время начала (текущее + EVENT_START_DELAY)
            "endTime": "2024-07-29T14:10:00.000Z", // Время окончания (startTime + EVENT_DURATION)
            "timeLeft": 300, // Длительность события в секундах
            "raceData": [
                {
                    "id": 1,
                    "title": "Race 1",
                    // ... другие поля гонки
                    "horseData": [
                        {
                            "id": 1,
                            "name": "Blaze",
                            // ... другие поля лошади
                            "position": null
                        }
                        // ... 9 других случайно сгенерированных лошадей
                    ]
                }
                // ... еще NUMBER_OF_RACES-1 гонок
            ]
        }
    }
    ```

#### `POST /updateEvent`

- **Описание**: Не используется! Позволяет вручную добавить новое событие с заданными параметрами. Деактивирует все предыдущие события.
- **Аутентификация**: Требуется (Bearer Token).
- **Тело запроса** (все поля обязательны):
    ```json
    {
      "location": "Custom Event Location",
      "startTime": "2024-08-01T10:00:00.000Z",
      "endTime": "2024-08-01T10:30:00.000Z",
      "raceData": [
        {
          "id": 1,
          "title": "Custom Race 1",
          "description": "My custom race",
          "startTime": "2024-08-01T10:00:00.000Z",
          "endTime": "2024-08-01T10:05:00.000Z",
          "horseData": [
            { "id": 1, "name": "Custom Horse 1", "color": "red", ... },
            { "id": 2, "name": "Custom Horse 2", "color": "blue", ... }
          ]
        }
        // ... другие гонки
      ]
    }
    ```
- **Пример ответа (Успех)**:
    ```json
    {
        "success": true,
        "message": "New event added",
        "event": {
            "id": 4, // ID нового события
            "isActive": false, // Рассчитывается на основе startTime, endTime и текущего времени
            "location": "Custom Event Location",
            "startTime": "2024-08-01T10:00:00.000Z",
            "endTime": "2024-08-01T10:30:00.000Z",
            "timeLeft": 0, // Рассчитывается
            "raceData": [
                // ... переданные данные о гонках
            ]
        }
    }
    ```

## Структура данных (Основные поля)

### Пользователи (`db.json -> users`)

```json
{
    "id": 1,
    "username": "admin",
    "password": "123",
    "prizes": [
        /* массив объектов призов */
    ]
}
```

### События (`db.json -> event`)

```json
{
    "id": 2,
    "isActive": true,
    "location": "Online",
    "startTime": "...",
    "endTime": "...",
    "timeLeft": 300,
    "raceData": [
        /* массив объектов гонок */
    ]
}
```

### Гонки (внутри `event.raceData`)

```json
{
    "id": 1,
    "title": "Race 1",
    "description": "Race 1 of the day",
    "startTime": "...",
    "endTime": "...",
    "horseData": [
        /* массив объектов лошадей */
    ]
}
```

### Лошади (внутри `raceData.horseData`)

```json
{
    "id": 1,
    "name": "Thunder",
    "age": 6,
    "color": "purple",
    "weight": "472 kg",
    "stats": "8/4",
    "position": null // или число от 1 до 10 после завершения гонки
}
```

### Выборы пользователя (`db.json -> userChoices`)

```json
{
    "id": 1,
    "userId": 1,
    "eventId": 1,
    "raceId": 1,
    "horseId": 3,
    "reOpen": false, // Флаг для возможности переоткрытия выбора (не используется?)
    "timestamp": "..."
}
```

### Призы (внутри `users.prizes`)

```json
{
    "id": 1,
    "eventId": 1,
    "prizeText": "2 500 $",
    "winsCount": 2,
    "totalRaces": 3,
    "status": "taked", // "new", "taked", "noTaked"
    "timestamp": "...", // Время начисления
    "updateTime": "..." // Время последнего изменения статуса
}
```

### Результаты гонок (`db.json -> raceResults`)

```json
{
    "id": 1,
    "eventId": 1,
    "raceId": 1,
    "winnerHorseId": 3,
    "winnerHorseName": "Lightning",
    "winnerHorseColor": "pink",
    "finishTime": "..."
}
```
