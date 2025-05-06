.PHONY: install start build test lint fix

# Установка зависимостей
install:
	npm install

# Запуск разработки
start:
	npm run dev

# Запуск сервера разработки
start-server:
	npm run start:dev:server

# Сборка проекта
build:
	npm run build

# Тесты
test-unit:
	npm run test:unit

test-ui:
	npm run test:ui

test-ui-approve:
	npm run test:ui:ok

test-all:
	npm run test:unit && npm run test:ui

# Линтинг
lint-ts:
	npm run lint:ts

lint-scss:
	npm run lint:scss

# Исправление проблем
fix-ts:
	npm run lint:ts:fix

fix-scss:
	npm run lint:scss:fix

fix-format:
	npm run format

fix-all:
	make fix-ts && make fix-scss && make fix-format

# Storybook
storybook:
	npm run storybook

storybook-build:
	npm run storybook:build

# Отчет по ui тестам
test-ui-report:
	npm run test:ui:report
