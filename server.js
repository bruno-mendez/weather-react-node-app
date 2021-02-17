const express = require('express');
const https = require('https');
const bodyParser = require ('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: 'true'}));

app.get("/", function(req, res){

    res.sendFile(__dirname + "/index.html");
    
})

app.post("/api/weather", function(req, res){
    console.log(req.body);
    const query = req.body.cityName;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&APPID=2db14349cb3ec9d6324cca8280cb51cb&units=metric&lang=es`;
    https.get(url, function (response){
        console.log(response.data);

        response.on("data", function(data){
        const weatherData = JSON.parse(data);
        const temp = weatherData.main.temp;
        const description = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon;
        const min = weatherData.main.temp_min;
        const max = weatherData.main.temp_max;
        const feels = weatherData.main.feels_like;
        const icon_url = `http://openweathermap.org/img/wn/${icon}@2x.png`;
        console.log(temp);
        console.log(description);
/*         res.write(`<h1>El tiempo en ${query} actualmente es: ${description}</h1>`);
        res.write("<h1>La temperatura es: " + temp + " celcius. </h1>");
        res.write(`<img src=${icon_url} width="100">`); */
        res.json({temp: temp, desc: description, city: query, icon_url: icon_url, max: max, min: min, feels: feels,
            });
        })
    }); 
})

if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, 'client/build')));
      
    // Handle React routing, return all requests to React app
    app.get('*', function(req, res) {
      res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
  }

app.listen(8080, function (){
    console.log("listening on port 8080");
});