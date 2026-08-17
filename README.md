# Polymath-js

Это форк проекта [Polymath](https://github.com/oraxen/polymath) переписанный на Bun.sh + Elysia.
Совместим с [oraxen](https://oraxen.com/) и [nexo](https://nexomc.com/).

> [!NOTE]
> Один экземпляр polymath-js может обслуживать **несколько Minecraft-серверов**.
> Отдельный инстанс на каждый сервер не нужен.

## Быстрый старт

1. Скачайте бинарник из [релизов](https://github.com/sileanhell/polymath-js/releases)
2. Создайте файл `.env` рядом с бинарником:

   ```env
   # Порт сервера
   PORT=3000

   # Домен или IP куда будет обращаться игрок сервера для скачивания текстурпака
   DOMAIN=packs.example.com

   # Общий префикс ключа. Не используйте его как secret плагина целиком
   SECRET_KEY=USXJKJBzJrz2xLPCqRWTf4z1
   ```

3. Запустите бинарник.
4. Настройте доступ по HTTPS (nginx + certbot, caddy и т.д.).
   > [!CAUTION]
   > **Плагин не будет работать без HTTPS.**
5. В конфигурации плагина укажите домен и секрет в формате `SECRET_KEY` + уникальный суффикс сервера:
   ```yaml
   polymath:
     server: pack.example.com
     secret: USXJKJBzJrz2xLPCqRWTf4z1-survival
   ```
6. Запустите Minecraft-сервер.
