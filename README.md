# Polymath
## Описание

Это порт оригинального проекта Polymath (https://github.com/oraxen/polymath), работающий на Bun.sh + Elysia.

Совместим с:

- oraxen.com
- nexomc.com

## Важное примечание

Используйте **1 бинарник на 1 Minecraft-сервер**.
Не подключайте несколько серверов к одному хранилищу.

## Быстрый старт

1. Скачайте бинарник из релизов:

   https://github.com/sileanhell/polymath-js/releases

2. Создайте файл `.env` рядом с бинарником:

   ```env
   PORT=
   DOMAIN=
   SECRET_KEY=
   ```

3. Запустите бинарник.

4. Настройте доступ по HTTPS (nginx + certbot, caddy и т.д.).

   **Плагин не будет работать без HTTPS.**

5. Обновите ссылку и секретный ключ в конфигурации плагина:

   ```yaml
   polymath:
     server: pack.example.com
     secret: USXJKJBzJrz2xLPCqRWTf4z1PKMJ7PD6
   ```

6. Запустите Minecraft-сервер.

## Вклад в проект

Если вы считаете, что нужно дополнить функционал, создавайте форки этого репозитория, чтобы другие могли найти вас через вкладку форков.