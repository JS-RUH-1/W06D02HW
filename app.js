const express = require("express");
let app = express();
let bodyParser = require("body-parser");
const fs = require("fs");
const Foods = require("./Foods.json");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function (req, res, next) {
  console.log("Welcome");
  next();
});

app.get("/Foods", (req, res) => {
  res.send(Foods);
});

app.post("/Foods", (req, res) => {
  let newFood = { id: req.body.id, name: req.body.name };
  Foods.push(newFood);
  let newarr = JSON.stringify(Foods);
  console.log(newFood);
  res.json(newarr);
  fs.writeFile("Foods.json", newarr, (err) => {
    if (err) throw err;
    console.log("Data written to file");
  });
});

app.put("/Foods/:id", (req, res) => {
  let found = Foods.find(function (item) {
    return item.id === parseInt(req.params.id);
  });

  console.log(req.body);
  let id = req.params.id;
  fs.readFile("Foods.json", "utf-8", (err, data) => {
    let foodsjson = JSON.parse(data);
    foodsjson.forEach((e, index) => {
      if (id == e.id) {
        foodsjson.splice(index, 1, req.body);
      }
      let newarr = JSON.stringify(foodsjson);

      fs.writeFile("Foods.json", newarr, (err) => {
        if (err) throw err;
        res.json(newarr);
        console.log("Data written to file");
      });
    });
  });
});

app.delete("/Foods/delete/:id", (req, res) => {
  let id = req.params.id;
  fs.readFile("Foods.json", "utf-8", (err, data) => {
    let foodsjson = JSON.parse(data);
    foodsjson.forEach((e, index) => {
      if (id == e.id) {
        foodsjson.splice(index, 1);
      }
      let newarr = JSON.stringify(foodsjson);

      fs.writeFile("Foods.json", newarr, (err) => {
        if (err) throw err;
        res.json(newarr);
        console.log("Data written to file");
      });
    });
  });
});

app.listen(3000, () => {
  console.log("App listening on port 3000!");
});

//   if (found) {
//     let update = {
//       id: found.id,
//       name: req.body.name,
//     };
//     let targetIndex = Foods.indexOf(found);
//     Foods.splice(targetIndex, 1, update);
//     res.send(Foods);
//     fs.writeFile("Foods.json", Foods, (err) => {
//       if (err) throw err;
//       res.json(Foods);
//       console.log("Data written to file");
//     });
//   } else {
//     res.sendStatus(404);
//   }
