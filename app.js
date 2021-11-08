const express = require("express");
const app = express();

let fs = require("fs");
app.use(express.json());

app.get("/games", (req, res) => {
  fs.readFile("games.json", "utf8", (err, data) => {
    res.send(data);
  });
});

app.post("/games", (req, res) => {
    console.log("req.body", req.body);
    fs.readFile("games.json", "utf8", (err, data) => {
      let arr = JSON.parse(data);
  
      let updated = [...arr,{id: arr.length + 1, name: req.body.name,},];
      fs.writeFile("games.json", JSON.stringify(updated), (err) => {
        res.json(updated);
      });
    });
  });

app.delete("/gamesDelete/:id", (req, res) => {
  const id = parseInt(req.params.id);

  fs.readFile("games.json", "utf8", (err, data) => {
    let arr = JSON.parse(data);
    arr = arr.filter((obj) => {
      return obj.id !== id;
    });

    fs.writeFile("games.json", JSON.stringify(arr), (err) => {
      res.json(arr);
    });
  });
});

app.put("/gamesEdit/:id", (req, res) => {
  const id = parseInt(req.params.id);
  //   console.log(id)
  fs.readFile("games.json", "utf8", (err, data) => {
    let arr = JSON.parse(data);
    let edit = arr.findIndex((obj) => obj.id == id);
    arr[edit] = {
      id: id,
      name: req.body.name,
    };

    fs.writeFile("games.json", JSON.stringify(arr), (err) => {
      res.json(arr);
    });
  });
});

app.listen(8080);
