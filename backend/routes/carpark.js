var express = require('express');
var router = express.Router();
var carparkDb = require('./../mockDb/carparkDb');

router.get('/all', function(req, res, next) {
    let parkingList = carparkDb;

    //return JSON response
    let response = {
        errCode: "00",
        errDesc: "",
        body: parkingList
    };
    res.json(response);
    // res.send(JSON.stringify(response));
});

router.get('/nearest', function(req, res, next) {

    try {

        let myLocLat = req.query.lat;
        let myLocLng =req.query.lng;
        let hours =req.query.duration;

        let nearestCarParkIds = [1,3,5];
        let parkingList = carparkDb;
        let newList = [];
        for (let carpark of parkingList) {
            if (nearestCarParkIds.includes(carpark.id)) {
                //calculate distance from
                let targetLat = carpark.lat;
                let targetLng = carpark.lng;

                let distanceLat = Math.abs(targetLat-myLocLat);
                let distanceLng = Math.abs(targetLng-myLocLng);
                let distance = Math.pow(distanceLat, 2) * Math.pow(distanceLng, 2);
                distance = distance * Math.pow(10,10) * 250;

                carpark["distanceMetres"] = distance;
                carpark["duration"] = hours;
                carpark["price"] = "RM " + (carpark.parkingRatePerHour * hours).toFixed(2);

                newList.push(carpark);
            }
        }

        //return JSON response
        let response = {
            errCode: "00",
            errDesc: "",
            body: newList
        };
        res.json(response);
        // res.send(JSON.stringify(response));
    } catch (err) {
        let response = {
            errCode: "01",
            errDesc: "Missing parameters",
            body: []
        };
        res.json(response);
    }
});

module.exports = router;
