const express = require("express");
const app = express();

app.use(express.json());

const games = require("./game.json");

app.get("/games", (req, res) => {
  res.send(games);
});

app.post("/post", (req, res) => {
  const game = {
    id: req.body.id,
    name: req.body.name,
  };
  games.push(game);
  res.send(games);
});

app.delete("/delete/:id", (req, res) => {
  id = req.params;
  let deletedGame = games.splice(id, 1);

  res.send(deletedGame);
});

app.put("/put/:id", (req, res) => {
  const game = {
    id: req.body.id,
    name: req.body.name,
  };

  game.name = req.body.name;
  res.send(game);
});

app.use((req, res) => {
  console.log("Sorry! Can’t find that resource. Please check your URL");
  res.send("Sorry! Can’t find that resource. Please check your URL");
});

app.listen(8080, function () {
  console.log("game express work");
  console.log(games);
});
