var CronJob = require('cron').CronJob;
var job = new CronJob('* */1 * * *', function() {
        console.log("Yes, I ran");
    }, function () {
        /* This function is executed when the job stops */
        console.log("I'm done")
    },
    true /* Start the job right now */
     /* Time zone of this job. */
);