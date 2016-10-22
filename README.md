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
name: String,
title: String,
desc: String,
owner: String,
data: Object,
yes: Object, // {uid : ставка}
no: Object, // {uid : ставка}
referee: String, // uid рефери
vote: Object,
amount: Object, // {all : капитализация спора, yes: капитализация yes, no: капитализация no}
winco: {yes: {type:Object,default:{}}, no: {type:Object,default:{}}},
win: {type: String, default: 'active'},
tags: Array,
deadline: Date,
time: { type : Date, default: Date.now }
```


*но всё это внутреннее api для хардкода...*

## дополнительное API

Сделать ставку:

`/circle/vote` с query `['uid' = uid пользователя, 'vote' = колличество денег, 'cid' = id спора, 'party' = yes или no]`


Создать спор:

`/circle/new` c query `['owner' = uid владельца, 'referee' = uid рефери, 'name' = имя , 'desc' = описание]`
