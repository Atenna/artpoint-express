var express = require('express');
var router = express.Router();
var url = require('url');
const message = "ArtPoint Hamburg";

const queryWrapper = (statement) => {

    db.query(statement, (err, result) => {
        if(err) {
            res.redirect('/');
        }
        return result;
    });
};

const queryBuilder = (req) => {

    var points_query = "SELECT * FROM points_of_interest WHERE 1=1 ";
    var q = url.parse(req.url, true);
    var data = q.query;

    if (data.type != undefined && data.type != '0') {
        var type = data.type;
        points_query += " AND type = '" + type + "'";
    }
    if (data.parking != undefined && data.parking != '0') {
        var parking = 1;
        points_query += " AND parking = '" + parking + "'";
    }
    if (data.children_friendly != undefined && data.children_friendly != '0') {
        var children_friendly = 1;
        points_query += " AND children_friendly = '" + children_friendly + "'";
    }
    if (data.wifi != undefined && data.wifi != '0') {
        var wifi = 1;
        points_query += " AND wifi = '" + wifi + "'";
    }
    /*
     if(data.name != undefined) {
     var name = data.name;
     points_query += " AND name LIKE '%" + name + "%'";
     }
     */
    return points_query;
};

/*module.exports = {
    getHomePage: (req, res) => {
        var points_query = queryBuilder(req);
        var types_query = "SELECT * FROM types";
        const message = "ArtPoint Hamburg";

        Promise.all([
            queryWrapper(points_query),
            queryWrapper(types_query)
        ])
            .then(([points, types]) => {

                // if playing with node front-end
                res.render('index.ejs', {
                    title: message,
                    points,
                    types
                });
                // for the back-end part
                //res.send(points);
            })
            .catch(err => {
                console.error(err);
                res.redirect('/');
            })
    }
};*/

router.get('/', function(req, res, next) {
    res.render('index.pug', {
        title: message
    });
});

router.get('/data', function(req, res) {
    var points_query = queryBuilder(req);

    db.query(points_query, (err, result) => {
        if(err) {
            res.redirect('/');
        }
        console.log(result[1].lat);
        res.json(result);
    });

});

router.get('/map', function(req, res) {
    res.render('map.pug', {
        lat : 53.551086,
        lon : 9.993682
    });
});

module.exports = router;