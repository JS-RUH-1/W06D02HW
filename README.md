### W06D02 HW
* Create a json file that contain list of Game or Foods or anything you love it
* Create a Restful API using Express that will allow the user to store a list of
‘Game, Foods, ....’ items.
* When the user navigates to http://localhost:8080/games list of items should be returned. E.g.:

```
{
  "Game1": {
    "id": 1,
    "name": "Tic Tac Toe"
  },
  "Game2": {
    "id": 2,
    "name": "Uno"
  }
}
```

* The user should be able to use Postman to make an HTTP **post** request that adds an additional item to the list of items, use req.body to send the data you want to add it (make sure you add the item to the previous list so it should be now 3 items in the list).

and the file should be updated:
```
{
  "Game1": {
    "id": 1,
    "name": "Tic Tac Toe"
  },
  "Game2": {
    "id": 2,
    "name": "Uno"
  },
  "Game3": {
    "id": 3,
    "name": "Soccer table"
  }
}
```

* The user should be able to use Postman to make an HTTP **delete** request that deletes an item with a specific id from the list of items, you will use req.params
for example if I want to delete an item with id 1, the request url should be: http://localhost:3000/gamesDelete/1

the output in postman should be the item that was deleted:
```
{
"id": 1,
"name": "Tic Tac Toe"
}
```
and the file should be updated:
```
{
  "Game2": {
    "id": 2,
    "name": "Uno"
  },
  "Game3": {
    "id": 3,
    "name": "Soccer table"
  }
}
```

* The user should be able to make an HTTP **put** request to update the name of an item on the list of items using Postman, use req.body to send the data you want to update it.
for example if I want to update the item with id 1, the link will be like this: http://localhost:3000/gamesEdit/1
the body in request will be like this:
```
{
    "id":1,
    "name":"Test Edit"
}
```
the output in Postman will look like this:
``` 
{
"Game1": {
"id": 1,
"name": "Test Edit"
},
"Game2": {
"id": 2,
"name": "Uno"
},
"Game3": {
"id": 3,
"name": "Soccer table"
}
}
```
and the file should be updated.