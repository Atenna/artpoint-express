var express = require('express');
var router = express.Router();
var url = require('url');
const message = "ArtPoint Hamburg";

const queryWrapper = (statement) => {

    return new Promise((resolve, reject) => {

        db.query(statement, (err, result) => {
            if(err)
                return reject(err);

            resolve(result);
        });

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

const queryBuilderCallPoi = (req) => {
    var procedure = "CALL get_poi(";
    var q = url.parse(req.url, true);
    var data = q.query;

    var type = data.type;
    procedure += type;

    var parking = data.parking;
    procedure += ", " + parking;

    var children_friendly = data.children_friendly;
    procedure += ", " + children_friendly;

    var wifi = data.wifi;
    procedure += ", " + wifi;

    // TODO
    var name = 'NULL';
    procedure += ", " + name + ')';

    return procedure;
}

const queryBuilderCallTypes = (req) => {
    var procedure = "CALL getTypes()";
    return procedure;
}

router.get('/data', function (req, res) {
    var call = queryBuilderCallPoi(req);

    db.query(call, (err, result) => {
        if (err) {
            res.redirect('/');
        }
        //console.log(result);
        res.json(result[0]);
    });
});

router.get('/types', function (req, res) {
    var call = queryBuilderCallTypes(req);

    db.query(call, (err, result) => {
        if (err) {
            res.redirect('/');
        }
        //console.log(result);
        res.json(result[0]);
    });
});

router.get('/map', function(req, res) {
    res.render('map.pug', {
        lat : 53.551086,
        lon : 9.993682
    });
});

module.exports = router;