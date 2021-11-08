const { error } = require("console");
const { generatePrimeSync } = require("crypto");
const express = require("express")
const app = express()
const game = require('../game.json')

app.use(express.json())
const fs = require("fs");

app.get("/game", function(req,res){
    res.send(game)
})

app.post("/game",(req,res)=>{
    let addedGame ={
        "id": game.length +1,
        "name": req.body.name
    }
    game.push(addedGame)
    fs.watchFile("./game.json", json.stringify(game,null,"\t"),(error)=>{
        if (error) throw error;
        res.send(addedGame)
    })
})

app.put("./gameEdit/:id",(req,res)=>{
    let id = req.params.id
    game[id-1] = req.body
    fs.watchFile("./game.json", json.stringify(game,null,"\t"),(error)=>{
        if (error) throw error;
        res.send(game[id-1])
    })
})

app.delete("/gameDelete/:id",(req,res)=>{
    let id = req.params.id
    game.splice(id - 1, 1);
    fs.watchFile("./game.json", json.stringify(game,null,"\t"),(error)=>{
        if (error) throw error;
        res.send(game)
    })
})


app.listen(8080)



