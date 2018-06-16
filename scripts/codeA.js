const axios = require("axios");
const uniqid = require('uniqid');
const config = require("../config/config.json");
const cities = ["delhi,in", "london,uk", "pittsburg,us", "mumbai,in", "singapore,my"];
const CronJob = require('cron').CronJob;
const uniq = uniqid();

cities.forEach(function (item) {

    axios({
        method:'get',
        url:'http://samples.openweathermap.org/data/2.5/forecast',
        params: {
            q: item,
            appid: config.openWeatherApi.key
        }
    })
        .then(function(response) {

            var obj = {
                data: response.data,
                uniq: uniq
            };

            axios({
                method: 'post',
                url: 'http://localhost:3000/',
                data: obj
            }).then(function (resp) {
                console.log(resp);
            }).catch(function (e) {
                console.error(e)
            })

        })
        .catch(function (err) {
            console.error(err);
        });
});