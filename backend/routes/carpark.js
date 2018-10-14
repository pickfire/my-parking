var express = require('express');
var router = express.Router();
var carparkDb = require('./../mockDb/carparkDb');
var locationUtil = require('./../util/locationUtil');
var numberUtil = require('./../util/numberUtil');
var NUMBER_OF_NEAREST_CARPARKS_TO_SHOW = 4;

router.get('/all', function (req, res, next) {

    let parkingList = carparkDb;

    //return JSON response
    let response = {
    errCode: "00",
    errDesc: "",
    body: parkingList
    };
    res.json(response);
});

router.get('/nearest', function (req, res, next) {

    try {

        //get values from request
        let myLocLat = req.query.lat;
        let myLocLng = req.query.lng;
        let duration = req.query.duration;

        let parkingList = carparkDb;
        let newList = [];
        for (let carpark of parkingList) {

            //1.calculate distance from destination
            let targetLat = carpark.lat;
            let targetLng = carpark.lng;
            let distance = locationUtil.getDistanceFromLatLonInKm(myLocLat, myLocLng, targetLat, targetLng);
            carpark["distanceKm"] = distance;
            if (distance < 1) {
                distance = numberUtil.formatFloat(numberUtil.roundOff(distance, 3) * 1000, 0) + "m";
            } else {
                distance = numberUtil.formatFloat(distance, 1) + "km";
            }
            carpark["distance"] = distance;

            //2.calculate hours
            let newDuration = numberUtil.roundOff(duration, 1);
            let fractionalHour = newDuration % 1;
            let hours = Math.floor(newDuration);
            let minutes = numberUtil.roundOff(fractionalHour * 60, 0);
            if (minutes >= 30) {
                hours += 1;
            } else if (minutes > 0) {
                hours += 0.5;
            }
            carpark["duration"] = numberUtil.formatHourMinute(hours);

            //3.calculate pricing
            let price = 0;
            if (Boolean(carpark.parkingRate.flatRate) || carpark.parkingRate.flatRate == 0) {
                price = carpark.parkingRate.flatRate;
                price = numberUtil.formatFloat(price, 2);
            } else {
                price = carpark.parkingRate.firstHour;
                hours -= 1;
                if (hours > 0) {
                    price += carpark.parkingRate.nextHours * hours;
                }
                price = Math.min(price, carpark.parkingRate.max);
                price = numberUtil.roundOff(price, 2);
            }
            carpark["price"] = numberUtil.formatFloat(price, 2, '??');
            carpark["priceRm"] = "RM " + numberUtil.formatFloat(price, 2);

            //4. calculate status
            let totalSlot = carpark.totalParkingLot;
            let emptySlot = carpark.availableParkingLot;
            let usedSlot = totalSlot - emptySlot;
            let percentageUsed = numberUtil.roundOff(usedSlot/totalSlot, 2);
            let availabilityStatus = "Available";
            let availabilityLabel = "success";
            if (percentageUsed > 0.95) {
                availabilityStatus = "Full";
                availabilityLabel = "danger";
            }
            else if (percentageUsed > 0.75) {
                availabilityStatus = "Limited";
                availabilityLabel = "warning";
            }
            carpark["availability"] = availabilityStatus;
            carpark["availabilityColor"] = availabilityLabel;

            newList.push(carpark);
        }

        //sort result by shortest distance first
        newList.sort(function(a, b) {
            const priceA = a.price;
            const priceB = b.price
            const distanceA = a.distanceKm;
            const distanceB = b.distanceKm;
            let comparison = 0;

            let distance = distanceA - distanceB;
            // 150meter 50sens
            let maxExpensiveAllowed = Math.abs(distance) / 0.15 * 0.5;

            // A is closer
            if (distance < 0) {
                let priceDiff = priceA - priceB;
                if (priceDiff > maxExpensiveAllowed) {
                    comparison = 1;
                } else {
                    comparison = -1;
                }
            }
            // B is closer
            else {
                let priceDiff = priceB - priceA;
                if (priceDiff > maxExpensiveAllowed) {
                    comparison = -1;
                } else {
                    comparison = 1;
                }
            }
            return comparison;
        });

        //limit results to return
        newList = newList.slice(0, NUMBER_OF_NEAREST_CARPARKS_TO_SHOW);

        //return JSON response
        let response = {
            errCode: "00", errDesc: "", body: newList
        };
        res.json(response);

    } catch (err) {
        let response = {
            errCode: "01", errDesc: err.message, body: []
        };
        res.json(response);
    }
});

module.exports = router;
