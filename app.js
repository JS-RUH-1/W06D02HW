const express = require("express");
const app = express();
const fs = require("fs");
const games = require("./games.json");
let lngth = games.length+1;
app.use(express.json())
// let body_parser = require("body-parser");
// app.use(body_parser.urlencoded({ extended: true }));
// app.use(body_parser.json());

app.get("/", function (request, response) {
  response.status(200).send(games);
  //response.json(arr)
});

app.post("/", function (request, response) {
  let newComer = {
      id:lngth,
    name: request.body.name,
  };
  fs.readFile("./games.json",'utf8', function (error, data) {
    let arr = JSON.parse(data);
    arr.push(newComer);
    let ddd= JSON.stringify(arr)
    
    //  response.write(data)
    //  response.end
    fs.writeFile('games.json',ddd,function(error,data){
       // response.send
     //  response.json()
    })
  });

  
 
  
  //response.json(fruits)
  response.status(200).send(games);
  // response.status(418).send({status:DIDNT})
  //response.status(200).send({status:Worked})
  // fileHandler.writeFile('fruits.json',`{name: ${req.body.name},\ncolor: ${req.body.color}}`)
  //if(error) throw error;
  //response.send({"messafe":"File created!"})
});

app.delete("/:id", function (request, response) {
    fs.readFile("./games.json",'utf8', function (error, data) {
      let arr = JSON.parse(data);
      arr=arr.filter((word) => parseInt(request.params.id)!==word.id);
      let ddd= JSON.stringify(arr)
      
      //  response.write(data)
      //  response.end
      fs.writeFile('games.json',ddd,function(error,data){
       //   response.send
      })
    });
    response.status(200).send(games);
});

app.put("/:id", function (request, response) {
    fs.readFile("./games.json",'utf8', function (error, data) {
      let arr = JSON.parse(data);
      arr[parseInt(request.params.id)-1].name=request.body.name;
      let ddd = JSON.stringify(arr)
      console.log('arr',arr)
      //  response.write(data)
      //  response.end
      fs.writeFile('games.json',ddd,function(error,data){
       //   response.send
      })
    });
    response.status(200).send(games);
});

app.listen(8080, function () {});
