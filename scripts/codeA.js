const axios = require("axios");
const config = require("../config/config.json");
const cities = ["delhi,in", "london,uk", "pittsburg,us", "mumbai,in", "singapore,my"];
const CronJob = require('cron').CronJob;
const fs = require('fs');
const async = require('async');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const connectionString =  'mongodb://'+
    config.mongodb.host+':'+config.mongodb.port+'/circle-of-life';

mongoose.connect(connectionString)
    .then(function(){
        console.log('connection succesful');
    })
    .catch(function(err){
        console.error(err);
    });

const uniqid = require('uniqid');
const Processed = require('../Models/Processed');

const job = new CronJob('* * */2 * *', function() {

        const uniq = uniqid();
        // call
        let list = [];
        // cities.forEach(function (item) {
        let obj = {};

        async.forEach(cities, function (item, cb) {

            obj = {};
            obj['call'] = uniq;

            axios({
                method:'get',
                url:'http://api.openweathermap.org/data/2.5/forecast',
                params: {
                    q: item,
                    appid: config.openWeatherApi.key
                }
            })
                .then(function(response) {

                    let d = new Date(response.headers.date);
                    let rTime = d.getTime();
                    console.log("Request time ",rTime);
                    obj['rTime'] = rTime;
                    // rTime

                    fs.writeFile("../data/"+item.substring(0, 4)+".json",JSON.stringify(response.data), function(err) {
                        if(err) {
                            return console.log(err);
                        }

                        // console.log("The file was saved!");
                        cb();

                    });
                })
                .catch(function (err) {
                    console.error(err);
                });
        }, function (err) {


            let cTime = Date.now();
            obj['cTime'] = cTime;
            // cTime
            // console.log("Process 1 complete: ", cTime);
            async.forEach(cities, function (city, callback) {
                const data = require("../data/"+city.substring(0,4)+".json");

                let innerObj = {
                    'city' : data.city.name,
                    'country' : data.city.country,
                    'status' : data.cod
                };
                obj['numCols'] = Object.keys(data).length;
                obj['numRows'] = data.cnt;
                const stats = fs.statSync("../data/"+city.substring(0, 4)+".json");
                // console.dir(stats.size/1000000.0 + " MB, " + Math.trunc(stats.ctimeMs));
                innerObj['fileSize'] = stats.size/1000000.0;
                // stats.size
                // stats.cTimeMs

                let temp = data.list[0].main.temp_max;
                async.forEach(data.list, function (tp, callback1) {
                    if(temp < tp.main.temp_max){
                        temp = tp.main.temp_max;
                    }
                    callback1();
                }, function (err) {
                    // console.log("max temp: ", temp);
                    innerObj['maxTemp'] = temp;
                    //max_temp
                    list.push(innerObj);
                    callback();
                });

            }, function (err) {

                let p2Finish = Date.now();
                console.log("Process 2 finish: ", p2Finish);
                obj['p2Finish'] = p2Finish;
                console.log(list);
                obj.results = list;
                //p2Finish

                Processed.insertMany([obj], function (e, d) {
                    if(e){
                        console.error(e);
                    }
                    // console.log(d);

                });

            });


        });

    }, function () {
        /* This function is executed when the job stops */
        console.log("I'm done")
    },
    true /* Start the job right now */
    /* Time zone of this job. */
);




// });