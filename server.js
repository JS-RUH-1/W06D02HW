const express = require("express")
const app = express()
const gamesInfo = require('./games.json')
const fs = require('fs')


app.use(express.json());

app.get('/', (req, res) => {
    res.send("hi")
})

// get items
app.get("/games", (req, res) => {
    res.send(gamesInfo)
})

// add item
app.post("/addGame", (req, res) => {
    let newGmae = {
        id: gamesInfo.length + 1,
        name: req.body.name
    }
    gamesInfo.push(newGmae)
    let result = JSON.stringify(gamesInfo)
    fs.writeFile('games.json', result, (err, data) => {
        if(err) return err
        
        // 
        res.send(gamesInfo)
    })

})

// update item
app.put('/updateItem/:id', (req,res) => {
    let gameItem = gamesInfo.find(item => item.id === parseInt(req.params.id))
    try {
        let updateItem = {
            id: gameItem.id,
            name: req.body.name
        }
        let targetIndex = gamesInfo.indexOf(gameItem)
        gamesInfo.splice(targetIndex, 1, updateItem)
        fs.writeFile('games.json', JSON.stringify(gamesInfo), (err) => {
            if(err) return err
            res.send(gamesInfo)
        })
    } catch (err) {
        res.status(404).json(err)
    }
})

// delete item
app.delete('/deleteItem/:id', (req,res) => {
    let gameItem = gamesInfo.find(item => item.id === parseInt(req.params.id))

    try {
        let targetIndex = gamesInfo.indexOf(gameItem)
        gamesInfo.splice(targetIndex,1)
        fs.writeFile('games.json', JSON.stringify(gamesInfo), (err) => {
            if(err) return err
            res.send(gamesInfo)
        })
    } catch (err) {
        res.status(404).json(err)
    }
})

app.listen(8080, () => console.log("Server up to running"))