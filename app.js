const express = require('express')
const app = express()
const games = require('./game.json')
app.use(express.json());

app.get('/games' , function(req , res){
    res.send(games)
  })
//   _________________________
  app.post('/games/post', function (req, res) {
      const newgame={
          id : req.body.id,
          name:req.body.name
      }
      games.push(newgame);
      res.send(games)
  })
// ________________________________________
app.delete('/games/:id',(req,res)=>{
    let found =games.find(function(item){
        return item.id ===parseInt(req.params.id)
    })
    if (found){
        let targetIndex=games.indexOf(found)
        games.splice(targetIndex,1)
        res.send(games)
    } else {
        res.sendStatus(404);
    }
})
//   ___________________________
app.put('/games/:id' ,(req, res)=>{
    let found =games.find((item)=>{
        return item.id ===parseInt(req.params.id)
    })
    if (found){
        let update ={
            id :found.id,
            name:req.body.name
        }
        let targetIndex =games.indexOf(found)
        games.splice(targetIndex,1,update)
        res.send(games)
    } else {
        res.sendStatus(404);
    }
})
// __________________________________________
  app.listen(8080,function(){
    console.log('Example app listening on port 8080!')
})
