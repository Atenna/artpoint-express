# Map | Filtered Points of Interest

## Technolgoies

- MySQL
- Node.js Express 
- Pug
- Leaflet map

## Node.js | Express app

app.js
``` 
const express = require('express');
const mysql = require('mysql');
const app = express();
const config = require('./config.js');
``` 

config.js
``` 
var config = {
    host: "localhost",
    user: "root",
    password: "yourpass",
    database: "artpointdb"
};
``` 

## MySQL | Stored Procedures

``` 
CREATE PROCEDURE `getTypes`()
BEGIN
	SET @sql = 'SELECT type FROM types';
    PREPARE stmt FROM @sql;
	EXECUTE stmt;
	DEALLOCATE PREPARE stmt;
END
``` 
Calling this procedure would look like this:
``` 
Call getTypes();
``` 

## Chart.js | Doughnut chart

map.pug
``` 
var ctx = document.getElementById("chart").getContext('2d');
            var myChart = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: ['Selected', 'All'],
                    datasets: [{
                        data: [displayed, all - displayed],
                        backgroundColor: [
                            ...
                        ]
                    }]
                },
                options: {
                    ...
                }
            });
``` 
