# Проект Mesto бэкенд

## Директории

`/controllers` — папка с контроллерами для роутера
`/routes` — папка с файлами роутера  
  
Остальные директории вспомогательные, создаются при необходимости разработчиком

## Запуск проекта

Перед запуском нужно установить MongoDB, порт 27017
`npm run start` — запускает сервер с hot-reload при сохранении изменений

###V13 02/11/21
Для роутов: `/users/me, /users/me/avatar, /cards/:cardId/likes` параметр `req.user._id` - временно захардкожен
