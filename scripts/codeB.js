const config = require('../config/config.json');
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
const uniq = uniqid();
const Processed = require('../Models/Processed');
const files = ["delh", "lond", "pitt", "mumb", "sing"];

let list = [];

files.forEach(function (item) {
    const data = require('../data/'+item+'.json');
    console.log(data.name + data.main.temp_max);
    let obj = {};
    obj['city'] = data.name;
    obj['max_temp'] = data.main.temp_max;
    obj['call'] = uniq;
    list.push(obj);
});

console.log(list);
Processed.insertMany(list, function (e, d) {
   if (e){
       console.error(e);
   }  else {
       console.log(d);
       mongoose.connection.close();
   }
});

