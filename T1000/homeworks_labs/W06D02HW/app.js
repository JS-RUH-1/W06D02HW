const express = require('express')
const app = express()
const games = require('./game.json');
app.use(express.json())
const fs = require("fs");


app.get('/games', function ( req,res ) {
    res.send(games);
})

app.post('/games',(req,res)=>{
    let addedGame = {
        "id": games.length + 1,
        "name": req.body.name
    }
    games.push(addedGame)

    fs.writeFile("./game.json" , JSON.stringify(games,null,'\t'),(error)=>
    {
        if (error) throw error;
        res.send(addedGame)
    })
})

app.put('/gamesEdit/:id',(req,res)=>{
    let id = req.params.id
    games[id-1] = req.body

    fs.writeFile("./game.json" , JSON.stringify(games,null,'\t'),(error)=>
    {
        if (error) throw error;
        res.send( games[id-1])
    })
})

app.delete('/gamesDelete/:id',(req,res)=>{
    let id = req.params.id
    games.splice ( id - 1, 1 );

    fs.writeFile("./game.json" , JSON.stringify(games,null,'\t'),(error)=>
    {
        if (error) throw error;
        res.send( games )
    })
})


app.listen(8080)
