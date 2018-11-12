var url = require('url');

module.exports = {
    getHomePage: (req, res) => {

        var q = url.parse(req.url, true);
        var data = q.query;

        let query = "SELECT * FROM points_of_interest WHERE 1=1 "; // query database to get all the points

        if(data.type != undefined) {
            var type = data.type;
            query += " AND type = '" + type + "'";
        }
        if(data.parking != undefined) {
            var parking = 1;
            query += " AND parking = '" + parking + "'";
        }
        if(data.children_friendly != undefined) {
            var children_friendly = 1;
            query += " AND children_friendly = '" + children_friendly + "'";
        }
        if(data.wifi != undefined) {
            var wifi = 1;
            query += " AND wifi = '" + wifi + "'";
        }
        /*
        if(data.name != undefined) {
            var name = data.name;
            query += " AND name LIKE '%" + name + "%'";
        }
        */

        // execute query
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            res.render('index.ejs', {
                title: "Welcome to Hamburg Map | View Points"
                ,points: result
            });
        });
    }
};