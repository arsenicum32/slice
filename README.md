#slice rest API

Написанна на изи очень легко масштабируется и переиспользуется...

!!!всё GET :metal:

Итак.. У нас есть три коллекции:

`users` `party` `circle`

проверить их наличие можно здесь:

```javascript
http://85.143.209.210:20000/api
```

Для каждой коллекции (будем использовать [:model]) есть методы:

```javascript
//взять все записи
http://85.143.209.210:20000/:model/all?query
//взять запись по id
http://85.143.209.210:20000/:model/get/:id
//добавить запись
http://85.143.209.210:20000/:model/add?query
//апдейтнуть запись по id из query строки
http://85.143.209.210:20000/:model/upd/:id?query
//удалить запись по id
http://85.143.209.210:20000/:model/rem/:id
```
Пример:

```javascript
http://85.143.209.210:20000/circle/all
```

###Теперь что есть что:

####users :

```javascript
  uid: String // его id полученный от банка открытия при регистрации
  balance: Number // баланс пользователя
  desc: String // описание в профиле
  data: Object // эта штука есть в каждой коллекции на всякий случай
  time : время системное
```

####circle :

```javascript
name: String // имя спора
title: String // титл.. логично
desc: String // описание
owner: String // uid создателя
data: Object
party: Array // массив id из коллекции party
vote: Object // объект где { uid рефери из коллекции users : выбор победителя (id из party) }
referee: Array // массив uid рефери из коллекции users
win: String, // id победителя из коллекции party
tags: Array, // теги спора
deadline: Date, // дата завершения
time: { type : Date, default: Date.now }
```

####party :

```javascript
members: Object // объект где { uid из коллекции users : его ставка }
data: Object
time: { type : Date, default: Date.now }
```

*но всё это внутреннее api для хардкода...*
