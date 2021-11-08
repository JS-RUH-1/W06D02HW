const express=require('express')
const port =3030
const app=express()

const food=require('./Food.json')


const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())


 

//1 Done


//Q3
app.get('/',(req,res)=>{

    res.json(food)
})

//Add
app.post('/',(req,res)=>{

    const newFood ={
        id :req.body.id,
        foodName:req.body.foodName
    }

    food.push(newFood)
    res.send(food)
})
//Delete
app.delete('/FoodDelete/:id',(req,res)=>{

    const found =food.find((item)=>{
        return item.id === parseInt(req.params.id)
    })

    if(found){
        const targetIndex = food.indexOf(found)
        food.splice(targetIndex,1)
        res.send(food)
    }
    else{
        app.sendStatus(404)
    }
})

//PUT--->update
app.put('/FoodEdit/:id',(req,res)=>{
    //if id is there
 const found = food.find((item)=>{
        return item.id === parseInt(req.params.id)
    })

    if(found){
        const update = {

            id:found.id,
            foodName:req.body.foodName
        }
         const targetIndex=food.indexOf(found)

         food.splice(targetIndex,1,update)

         res.send(food)

    }
    else{
        app.sendStatus(404)
    }
})




app.listen(port,()=>{
    console.log('Server started at http://localhost:'+port)

})