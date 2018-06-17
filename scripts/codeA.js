const axios = require("axios");
const config = require("../config/config.json");
const cities = ["delhi,in", "london,uk", "pittsburg,us", "mumbai,in", "singapore,my"];
const CronJob = require('cron').CronJob;
const fs = require('fs');

cities.forEach(function (item) {

    axios({
        method:'get',
        url:'http://api.openweathermap.org/data/2.5/weather',
        params: {
            q: item,
            appid: config.openWeatherApi.key
        }
    })
        .then(function(response) {

            fs.writeFile("../data/"+item.substring(0, 4)+".json",JSON.stringify(response.data), function(err) {
                if(err) {
                    return console.log(err);
                }

                console.log("The file was saved!");
            });
        })
        .catch(function (err) {
            console.error(err);
        });
});