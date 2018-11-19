# Map | Filtered Points of Interest

## Technolgoies

- MySQL
- Node.js Express 
- Pug
- Leaflet map

![alt text](https://github.com/Atenna/artpoint-express/blob/master/public/assets/img/screenshot.png)

## Node.js | Express app

app.js | Setup
``` 
const express = require('express');
const mysql = require('mysql');
const app = express();
const config = require('./config.js');
``` 

config.js | Config for connecting to your DB
``` 
var config = {
    host: "localhost",
    user: "root",
    password: "yourpass",
    database: "artpointdb"
};
```

index.js | Getting data
```
router.get('/data', function (req, res) {
    var call = ..;

    db.query(call, (err, result) => {
        if (err) {
            res.redirect('/');
        }
        res.json(result[0]);
    });
});
```

## MySQL | Stored Procedures

Create a stored procedure
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

map.pug | Create a doughnut chart
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
