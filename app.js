const express = require('express')
const app = express()
const games = require('./Game.json')
app.use(express.json())

app.get('/', function (req, res) {
    res.send(games);
})

 app.post('/', function (req, res) {
   const game1 ={
       name: req.body.name,
       id:games.length +1
   }
   games.push(game1);
   res.send(game1);
})


app.delete('/', function (req, res) {
const game = games.filter((game)=>{ 
    return game.id === req.body.id
})
const index = games.indexOf(game[0])
games.splice(index, 1)

res.send('done')
})

app.put('/', function (req, res) {
    const game = games.filter((game)=>{ 
        return game.id === req.body.id
    })
    game[0].name = req.body.name
    
    res.send('done')
    })

app.listen(8080, function () {
console.log('Example app listening on port 8000!')
})