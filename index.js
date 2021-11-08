const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");

const app = express();
const port = 8080;
app.use(bodyParser.json());

app.get("/games", (req, res) => {
  fs.readFile("games.json", (err, data) => {
    res.send(data);
  });
});

app.post("/games", (req, res) => {
  //console.log("req.body",req.body);
  fs.readFile("games.json", "utf8", (err, fileData) => {
    let data = JSON.parse(fileData);
    let newData = [
      ...data,
      {
        id: req.body.id || data[data.length - 1].id + 1,
        name: req.body.name,
      }
    ];
    fs.writeFile("games.json", JSON.stringify(newData), (err) => {
      res.json(newData);
    });
  });
});

app.put("/gamesEdit/:id", (req, res) => {
  if (!req.params.id) return res.json({ error: "id must be entered" });
  fs.readFile("games.json", { encoding: "utf8" }, (err, fileData) => {
    let data = JSON.parse(fileData);
    let index = data.findIndex((game) => game.id === parseInt(req.params.id));
    if(index < 0) return res.status(404).json({error:"game coudn't found"})
    data[index] = req.body;
    fs.writeFile("games.json", JSON.stringify(data), (err) => {
      res.json(data);
    });
  });
});

app.delete("/gamesDelete/:id", (req, res) => {
  if (!req.params.id)
    return res.status(502).json({ error: "param is required" });

  fs.readFile("games.json", { encoding: "utf8" }, (err, fileData) => {
    let data = JSON.parse(fileData);
    let toDelete = data.find((game) => game.id === parseInt(req.params.id));
    if (!toDelete) return res.status(402).json({ error: "game not found" });
    delete data[req.params.id];
    fs.writeFile(
      "games.json",
      JSON.stringify(
        data.filter((game) => game.id !== parseInt(req.params.id))
      ),
      (err) => {
        res.json(toDelete);
      }
    );
  });
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
