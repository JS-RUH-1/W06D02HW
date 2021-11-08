const express = require('express')
const app = express()
const path = require('path');
const fileHandler = require('fs');
let jsonData = fileHandler.readFileSync('./json/games.json');
let jsonObject = JSON.parse(jsonData);

app.use(express.json())
  
app.get('/games',function(request,response){
    response.send(jsonObject); 
});

app.post('/games',function(request,response){
    let jsonLength = Object.keys(jsonObject).length
    if (request.body && request.body.name && request.body.name != "") {
        let gameObject = {
            ["Game"+(jsonLength+1)]: {
                id: jsonLength + 1,
                name: request.body.name
            }
        }
        if ( gameObject ){
            Object.assign(jsonObject,gameObject);
            fileHandler.writeFile ( './json/games.json', JSON.stringify(jsonObject,null, '\t'), (error) => 
                {
                    if ( error ) throw error; 
                    response.send(gameObject); 
                }
            )
        }
    }else{
        response.send({"message":"Error"}); 
    }
});

app.post('/gamesDelete',function(request,response){
    if (jsonObject["Game"+request.body.id]){
        if (request.body && request.body.id && request.body.id != "") {
            delete jsonObject["Game"+request.body.id];
            fileHandler.writeFile ( './json/games.json', JSON.stringify(jsonObject,null, '\t'), (error) => 
                {
                    if ( error ) throw error; 
                    response.send(jsonObject); 
                }
            )
        }else{
            response.send({"message":"Error"}); 
        }
    }else{
        response.send({"message":"Game not found"}); 
    }
});

app.post('/gamesEdit',function(request,response){
    if (jsonObject["Game"+request.body.id]){
        if (request.body && request.body.id && request.body.id != "" && request.body.name && request.body.name != "") {
            jsonObject["Game"+request.body.id].name = request.body.name
            fileHandler.writeFile ( './json/games.json', JSON.stringify(jsonObject,null, '\t'), (error) => 
                {
                    if ( error ) throw error; 
                    response.send(jsonObject["Game"+request.body.id]); 
                }
            )
        }else{
            response.send({"message":"Error"}); 
        }
    }else{
        response.send({"message":"Game not found"}); 
    }
});

app.get('/games',function(request,response){
    response.send(jsonObject);
});



app.listen(8080, () => {
  console.log(`Example app listening at http://localhost:8080`)
})
