let express = require('express');
let router = express.Router();
const config = require('../config/config.json');
const Processed = require('../Models/Processed');


/* GET home page. */
router.get('/list', function(req, res) {

    Processed.find({} , function (e, d) {
       if (e){
           res.send({
               success: false,
               message: "Db connection error"
           });
       }
       else {
           console.log(d);
           res.send({
               success: true,
               data: d
           })
       }
    });

});


module.exports = router;