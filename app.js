const express = require('express');
const app = express();
const fs = require('fs');
const port = 3000;
let content = "";

fs.readFile('./foods.json', 'utf8', (err, data) => {
    if(err){
        console.log(err);
        return
    }
    content = JSON.parse(data);
})

app.use(express.json())

app.get('/', (req, res) => {
    res.send(content)
})

app.post('/', (req, res) => {
    content.foods.push(req.body)
    fs.writeFile('./foods.json', JSON.stringify(content), err => {
        if(err){
            console.log(err);
            return
        }
    })
})

app.delete(`/foodsDelete/[1-9]`, (req, res) => {
    let item = req.path[req.path.length-1];
    let new_content = []
    for(let i=0; i<content.foods.length; i++){
        if(content.foods[i].id != item){
            new_content.push(content.foods[i])
        }
    }
    content.foods = new_content;
    fs.writeFile('./foods.json', JSON.stringify(content), err => {
        if(err){
            console.log(err);
            return
        }
    })
})

app.put(`/foodsEdit/[1-9]`, (req, res) => {
    let item = req.path[req.path.length-1];
    for(let i=0; i<content.foods.length; i++){
        if(content.foods[i].id == item){
            content.foods[i].name = req.body.name
        }
    }
    fs.writeFile('./foods.json', JSON.stringify(content), err => {
        if(err){
            console.log(err);
            return
        }
    })
})


app.listen(port, () => {
    console.log(`Server running at port ${port}`);
})