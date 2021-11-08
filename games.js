const express = require('express')
const app = express()
const g = require('./games.json')


app.use(express.json())

app.get('/games', (req,res) => {
    res.send(g)
})
app.post('/games', (req,res) => {
   let newGame = {
       id: g.length + 1,
       name: req.body.name
   }
   g.push(newGame)
   res.send(g)
})

app.put('/updated/:id',function(req,res){
    let found = g.find(function(item){
        return item.id === parseInt(req.params.id)
    })
    if(found){
        let update = {
            id: found.id,
            name : req.body.name
        }
        let tID = g.indexOf(found)  
        g.splice(tID , 1, update)
        res.send(g)
    }
})

app.delete('/deleteGames/:id', function(req,res){
    let found = g.find(function (item){
        return item.id === parseInt(req.params.id)
    })
    if(found){
        let tt = g.indexOf(found)
        let theDeletedGame=g.splice(tt,1)
        res.send(theDeletedGame)
    }
    else{res.sendStatus(404)}
})
app.listen(8080)
