const express = require("express");
const app = express();
const fs = require("fs");

let jsonData = fs.readFileSync("game.json");
let jsonObj = JSON.parse(jsonData);

app.use(express.json());

//GET
app.get("/", (req, res) => {
  res.send(jsonObj);
});
//POST
app.post("/", (req, res) => {
  //create new obj with data
  let postData = [
    {
      id: game.length + 1,
      name: req.body.name,
    },
  ];
  //  merge the current Obj with the new Obj
  Array.prototype.push.apply(jsonObj, postData);

  //push in the current json file
  fs.writeFile("game.json", JSON.stringify(jsonObj), (err) => {
    if (err) {
      throw err;
    }
  });
  //display message that indecate sucess
  res.send(jsonObj);
});

//PUT
app.put("/:id", (req, res) => {
  let index = jsonObj.findIndex((game) => game.id === parseInt(req.params.id));
  // if the user enter wrong id
  if (index == -1) return res.send("The id is not exsist");
  //else

  let newName = req.body.name;
  jsonObj[index].name = newName;
  fs.writeFile("game.json", JSON.stringify(jsonObj), (err) => {
    if (err) {
      throw err;
    }
  });
  res.send(jsonObj);
});
//DELETE
app.delete("/:id", (req, res) => {
  let index = jsonObj.findIndex((game) => game.id === parseInt(req.params.id));
  // if the user enter wrong id
  if (index == -1) return res.send("The id is not exsist");
  //else
  jsonObj.splice(index, 1);

  fs.writeFile("game.json", JSON.stringify(jsonObj), (err) => {
    if (err) {
      throw err;
    }
  });
  res.send(jsonObj);
});
app.listen(3000);
