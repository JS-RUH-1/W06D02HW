const express = require("express")
const games = require('./games')
const app = express()
const fileHandler = require('file-system')
app.use(express.json())


app.get('/', function (req, res) {
    res.send(`${JSON.stringify(games)}`)
})

app.post('/', function (req, res) {
   let game = {
       name: req.body.name,
       id: games.length + 1
   }
   games.push(game)
   res.send('done')
})

app.put('/', function (req, res) {
    let obj = games.filter((game) => {
        return game.id === req.body.id
    })
    obj[0].name = req.body.name
    res.send(obj[0])
 })

 app.delete('/', function (req, res) {
    let obj = games.filter((game) => {
        return game.id === req.body.id
    })
    const index = games.indexOf(obj[0])
    games.splice(index,1)
    res.send(`${JSON.stringify(games)}`)
 })

app.listen(5000, () => {
	console.log("Server has started!")
})