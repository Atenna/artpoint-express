/**
 * Created by lieska on 09/11/2018.
 */

const fs = require('fs');

module.exports = {
    addPointPage: (req, res) => {
        res.render('add_point.ejs', {
            title: "Welcome to Hamburg Map | Add a new point"
            ,message: ''
        });
    },
    addPoint: (req, res) => {

        let message = '';
        let id = req.body.id;
        let name = req.body.name;
        let parking = req.body.parking;
        let children_friendly = req.body.children_friendly;
        let wifi = req.body.wifi;
        let type = req.body.type;
        let lat = req.body.lat;
        let lon = req.body.lon;
        let nameQuery = "SELECT * FROM points_of_interest where name = '" + name + "'";

        db.query(nameQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            if (result.length > 0) {
                message = 'Point already exists';
                res.render('add-point.ejs', {
                    message,
                    title: "Welcome to Socka | Add a new point"
                });
            } else {
                let query = "INSERT INTO points_of_interest (id, name, parking, children_friendly, wifi, type, lat, lon) VALUES ('" +
                    id + "', '" + name + "', '" + parking + "', '" + children_friendly + "', '" + wifi + "', '" + type + "', '" + lat
                    + "', '" + lon + "')";
                console.log(query);
                db.query(query, (err, result) => {
                    if (err) {

                        return res.status(500).send(err);
                    }
                    res.redirect('/');
                });
            }
        });
    }
};