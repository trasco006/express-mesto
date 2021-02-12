# Проект Mesto бэкенд

## Директории

`/controllers` — папка с контроллерами для роутера

`/routes` — папка с файлами роутера  

`/models` — папка с файлами описывающими модели коллекции базы данных 
  
Остальные директории вспомогательные, создаются при необходимости разработчиком

## Запуск проекта

Перед запуском нужно установить MongoDB, порт 27017

`npm run start` — запускает сервер с hot-reload при сохранении изменений


## Контроль версий
###### v1.3 02/11/21
Для роутов: `/users/me, /users/me/avatar, /cards/:cardId/likes` параметр `req.user._id` - временно захардкожен

###### v1.31 02/12/21
Добавлено распознование ошибок `400, 404, 5000 `в роутах запросов.
Добавлен helmet.
Изменена проверка url аватара пользователя и изображения карточки.
Перенастроен ESlint.
