const express =require('express')
const app = express()
const gemes = require('./game.json')

const fs = require('fs')
let bodyPareser = require('body-parser');
app.use(bodyPareser.urlencoded({extended : true}));
app.use(bodyPareser.json())

// app.use(express.json());

app.get('/', (req , res) =>{
    res.send(gemes)
} )

app.post('/' ,function(req,res){
    let newGame={
        id:req.body.id , 
       name : req.body.name
    
    };
    
    gemes.push(newGame);
    res.JSON(gemes)
 
})
 


app.put('/:id' , function(req , res){
    let found = gemes.find(function(item){

        return item.id === parseInt(req.params.id)
    }) 
    console.log(req.body)

    if(found){
        let update={
            id : found.id,
            name : req.body.name
        }

        let targeIndex = gemes.indexOf(found)

        gemes.splice(targeIndex , 1 , update)
        res.send(gemes)
    }
    else{
        res.sendStatus(444)
    }
    res.send(found)
})




app.delete('/:id' , function(req , res){
    let found = gemes.find(function(item){
        return item.id === parseInt(req.params.id)
    })
    if (found){
        let targetIndex = gemes.indexOf(found)
        gemes.splice(targetIndex , 1)
        res.send(gemes)

    }else {
        res.sendStatus(404)
    }
})







app.listen(8080)

