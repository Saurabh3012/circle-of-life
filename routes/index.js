var express = require('express');
var router = express.Router();
var config = require('../config/config.json');
var async = require('async-foreach');


var Processed = require('../Models/Processed');
// load mongoose package
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var connectionString =  'mongodb://'+
    config.mongodb.host+':'+config.mongodb.port+'/circle-of-life';

mongoose.connect(connectionString)
    .then(function(){
        console.log('connection succesful');
    })
    .catch(function(err){
        console.error(err);
    });


/* GET home page. */
router.post('/', function(req, res, next) {

    var obj = {
        status: req.body.cod,
        sizeOfData: req.body.cnt,
        callNumber: req.body.uniq
    };
    var innerObj = {
        name: req.body.city.name,
        country: req.body.city.country
    };

    let temp = data.list[0].main.temp_max;

    async.forEach(req.body.data.list, function (item, callback){
        console.log(item); // print the key
        if(temp < item.main.temp_max){
            temp = item.main.temp_max;
        }
        // tell async that that particular element of the iterator is done
        callback();

    }, function(err) {
        innerObj['temp'] = temp;
        obj['city'] = innerObj;
        Processed.insert(obj, function (e,d) {
            if (e){
                console.error(e);
                res.send({
                    success:false
                })
            } else{
                console.log(d);
                res.send({
                    success:true
                })
            }
        });

    });
});

module.exports = router;
