const express = require("express");
const app = express();
const fs = require("fs");
// "THIS IS NO NEEDED FOR NEW VERSION"
//
// var bodyParser = require("body-parser");
// app.use(bodyParser.json());
app.use(express.json());
app.get("/games", (req, res) => {
  fs.readFile("./games.json", "utf-8", (err, data) => {
    if (err) console.log(err);
    data = JSON.parse(data);
    res.send(data);
    res.end();
  });
});

app.post("/add", (req, res) => {
  let mydata;
  let newData;
  fs.readFile("./games.json", "utf-8", (err, data) => {
    if (err) console.log(err);
    mydata = JSON.parse(data);

    newData = [...mydata, req.body];
    fs.writeFile("games.json", JSON.stringify(newData), (err) => {
      if (err) console.log(err);
      res.json(newData);
    });
  });
});

app.delete("/gamesDelete/:id", (req, res) => {
  let id = req.params.id;
  console.log(id);
  fs.readFile("./games.json", "utf-8", (err, data) => {
    if (err) console.log(err);
    let mydata = JSON.parse(data);
    // let id = req.body.id;

    newData = mydata.filter((el) => {
      return el.id != id;
    });
    fs.writeFile("games.json", JSON.stringify(newData), (err) => {
      if (err) console.log(err);
      res.json(newData);
    });
  });
});

app.put("/gamesEdit/:id", (req, res) => {
  let id = req.params.id;
  let userData = req.body;
  fs.readFile("./games.json", "utf-8", (err, data) => {
    if (err) console.log(err);
    let mydata = JSON.parse(data);
    mydata.forEach((el, i) => {
      if (el.id == id) {
        mydata.splice(i, 1, userData);
      }
    });
    fs.writeFile("games.json", JSON.stringify(mydata), (err) => {
      if (err) console.log(err);
      res.json(mydata);
    });
  });
});
app.listen(8080);
