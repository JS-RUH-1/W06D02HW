const express = require('express')
const app = express()
const fileHandler = require('fs');
let jsonData = fileHandler.readFileSync('./json/games.json');
let jsonObject = JSON.parse(jsonData);

app.use(express.json())
  
app.get('/games',function(request,response){
    response.send(jsonObject); 
});

function getFreeGameNumber (){
    for ( let i = 1; i < 50; i++ ){
        if ( !jsonObject[`Game${i}`] ){
            return i;
        }
    }
}

app.post('/games',function(request,response){
    let jsonLength = Object.keys(jsonObject).length
    let freeGameID = getFreeGameNumber();
    if (request.body && request.body.name && request.body.name != "") {
        let gameObject = {
            ["Game" + freeGameID]: {
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

app.delete('/gamesDelete',function(request,response){
    if (jsonObject["Game"+request.body.id]){
        delete jsonObject["Game"+request.body.id];
        fileHandler.writeFile ( './json/games.json', JSON.stringify(jsonObject,null, '\t'), (error) => 
            {
                if ( error ) throw error; 
                response.send(jsonObject); 
            }
        )
    }else{
        response.send({"message":"Game not found"}); 
    }
});

app.put('/gamesEdit',function(request,response){
    if (jsonObject["Game"+request.body.id]){
        jsonObject["Game"+request.body.id].name = request.body.name
        fileHandler.writeFile ( './json/games.json', JSON.stringify(jsonObject,null, '\t'), (error) => 
            {
                if ( error ) throw error; 
                response.send(jsonObject["Game"+request.body.id]); 
            }
        )
    }else{
        response.send({"message":"Game not found"}); 
    }
});

app.listen(8080, () => {
  console.log(`Example app listening at http://localhost:8080`)
})
