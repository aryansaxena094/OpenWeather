const express = require("express");
const app = express();
const https = require("https");
const portnum = 2998;
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname+"/index.html");
});

app.listen(portnum, function(){
    console.log("The server is running on port "+portnum);
})

app.post("/", function(req, res){
    const query = req.body.cityName;
    const appid = "fab67bbea0e85e30f76f85dda19ffcf2";
    const unit = "metric";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${appid}&units=${unit}`;

    https.get(url, function(response){
        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temperature = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = `https://openweatherapp.org/img/wn${icon}@2x.png`;
            
            const message = `
            <html>
                <head>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossorigin="anonymous"></head>
                </head>
                <body>
                    <div class="container text-center mt-5">
                        <h1>Current Weather in ${query}</h1>
                        <div class="card my-5">
                            <div class="card-body">
                                <p class="card-text"><strong>Temperature:</strong> ${temperature} C</p>
                                <p class="card-text"><strong>Description:</strong> ${description}</p>
                            </div>
                            <img src="${imageURL}" class="card-img-bottom" alt="weather icon">
                        </div>
                    </div>
                    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js" integrity="sha384-w76AqPfDkMBDXo30jS1Sgez6pr3x5MlQ1ZAGC+nuZB+EYdgRZgiwxhTBTkF7CXvN" crossorigin="anonymous"></script>    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNS3tx" crossorigin="anonymous"></script>
                </body>
            </html>
        `;

            
            res.send(message);
        });
    });
});
