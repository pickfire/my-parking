var express = require('express');
var app = express();
var fs = require("fs");

app.get('/listParking', function (req, res) {

//    fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
//        console.log( data );
//        res.end( data );
//    });
    let example = {
        name: "UniKL Parking B1",
        address: "UniKL MIIT, 50500 Kuala Lumpur, Malaysia",
        totalParkingSlots: 100,
        totalAvailabelSlots: 90
    };
    res.json(example);
   
})

var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log("Example app listening at http://%s:%s", host, port);

})