const express = require('express')
const app = express()
const fs = require('fs')
const games = require('./game.json')
app.use(express.json())


app.get('/games',(req,res)=>{
    res.send(games)
})

app.post('/games',(req,res)=>{
  
  let newP = {id:games.length+1 , name:req.body.name }
   games.push(newP)
   res.send(games)
    
   fs.writeFile('./game.json',JSON.stringify(games),(err,data)=>{
       if(err) throw err;
       res.send(data)
   })

})

app.put('/games/:id',(req,res)=>{
    
    let found = games.find((item)=>{
        return item.id === parseInt(req.params.id)
    })
    if(found){
        let update ={
            id:found.id,
            name:req.body.name
        }
        let targetIndex = games.indexOf(found)

        games.splice(targetIndex,1,update)
        
        res.send(games)
        fs.writeFile('games.json',JSON.stringify(games))
    }else{
        res.sendStatus(404)
    }
    

})




 

app.listen(3000,()=>{
    console.log('Done');
})


app.delete('/games/:id',(req,res)=>{
    let found = games.find((item)=>{
        return item.id === parseInt(req.params.id)
    })
    if(found){
        let targetIndex = games.indexOf(found)
        games.splice(targetIndex,1)
        res.send(games)
    }else{
        res.sendStatus(404)
    }
})