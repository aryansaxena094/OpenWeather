const express = require("express");
const app = express();
const https = require("https");

const portnum = 2998;

app.listen(portnum, function(){
    console.log("The server is running on port "+portnum);
})

app.get("/", function(req, res){
    const url = "https://api.openweathermap.org/data/2.5/weather?q=Montreal&appid=fab67bbea0e85e30f76f85dda19ffcf2&units=metric";
    var a = "";
    
    https.get(url, function(response){
        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            imageURL = "https://openweatherapp.org/img/wn"+weatherData.weather[0].icon +"@2x.png";
            res.write("<html>");
            res.write("<h1> The weather in Montreal is currently "+weatherData.main.temp+" C. </h1>");
            res.write("<h2>The weather is currently: "+weatherData.weather[0].description+" </h2>");
            res.write("<img src="+imageURL+">");
            res.write("</html>");
            res.send();
        });
    });
});