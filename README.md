### Solution description

Code A: To download a dataset from an api

    -  The approach is to use the [Forecast API](https://openweathermap.org/forecast5) to fetch the data
       and store it in json files.
    -  Capture the time the requests were made and the time when the last file of data is written. The
       difference will give us time taken by Process 1 to finish.

Code B: To process the data and store it on a local database (mongodb, in this case)

    - The json data is read from those files. Certain stats like file size, time of creation is captured.
      Code is written in such a way that Process 2 runs as soon as Process 1 finishes.
    - Processing is done to find out more data (like the size of data (no. of columns and number of rows),
      city, country, max temperature associated to the city etc.) and once it's done, data is stored on
      the mongodb instance running locally.

#### To run the processes periodically, I am using [the cron npm package](https://www.npmjs.com/package/cron)

#### To keep the process running, I am using [pm2](http://pm2.keymetrics.io/), a process manager used to run nodejs apps.  


### How to run the app

 - Clone the Github Repo to your local system.
 - Make sure nodejs version > 8 is installed.

 - Make a repository config and create a file config.json with the following format.
 ```javascript
 {
   "openWeatherApi" : {
     "key": "xxxxxxxxxxxxxxxxxxxxxxxxxx"
   },
   "mongodb": {
     "host": "xxxxxxxxxxxxxxx",
     "port": xxxxx
   }
 }
 ```

 - Change the directory to cirle-of-life, then run:
  ```shell
    npm install
    npm start
  ```
  This will run the api used to fetch ananlysed data from the local database.

  - Change the directory to dashboard, then run:
  ```shell
    npm install
    npm start
  ```
  A prompt will appear. Press Y and press enter. This will run the dashboard on localhost:3001/

  - To collect data, change the directory to scripts. Run codeA.js with node. This will run a process which collects data periodically.
  ```shell
    node codeA.js
  ```
