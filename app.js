const express = require('express')
const app = express()
const games = require('./game.json')
const fs = require('file-system')

app.use(express.json())

app.get('/games', (req, res) =>{
    res.send(games)
})

app.post('/games', (req, res) =>{
    console.log(req.body)
   let game ={
       id: games.length +1,
       name: req.body.name,
   }

   games.push(game)
   fs.writeFile("game.json", `${JSON.stringify(games)}`,(err)=>{
       if(err) throw err;
       res.send(game)
   })
})




app.put('/games', (req, res) =>{
   let game = games.filter((game)=>{
       return(
           game.id == req.body.id
       )
   })
  game[0].name=req.body.name

  fs.writeFile("game.json", `${JSON.stringify(games)}`,(err)=>{
    if(err) throw err;
    res.send(game)
})
})



app.delete('/games', (req, res) =>{
   let game = games.filter((game)=>{
       return(
           game.id == req.body.id
       )
   })
   const index = games.indexOf(game[0])
   games.splice(index, 1)

   fs.writeFile("game.json", `${JSON.stringify(games)}`,(err)=>{
    if(err) throw err;
    res.send(game)
})
})




app.listen(8080)