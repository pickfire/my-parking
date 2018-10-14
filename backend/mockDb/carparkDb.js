/*
    parkingRate: {
        flatRate: 0,
        firstHour: 0,
        nextHours: 0,
        max: 0
    }
*/
var carparkDb = [{
    id: 1,
    name: "UniKL MIIT Basement Parking Lot",
    address: "Universiti Kuala Lumpur, Bandar Wawasan, 50300 Kuala Lumpur, Wilayah Persekutuan Kuala Lumpur",
    lat: 3.161299,
    lng: 101.701799,
    totalParkingLot: 200,
    availableParkingLot: 56,
    parkingRate: {
        flatRate: 0
    }
}, {
    id: 2,
    name: "Open Space Parking Lot",
    address: "E12, Kuala Lumpur, 50300 Kuala Lumpur, Wilayah Persekutuan Kuala Lumpur",
    lat: 3.156763, 
    lng: 101.702738,
    totalParkingLot: 300,
    availableParkingLot: 4,
    parkingRate: {
        flatRate: 6
    }
}, {
    id: 3,
    name: "Red by Sirocco Automated Car Park",
    address: "Lorong Kamunting 2, Chow Kit, 50300 Kuala Lumpur, Wilayah Persekutuan Kuala Lumpur",
    lat: 3.156627, 
    lng: 101.700545,
    totalParkingLot: 30,
    availableParkingLot: 25,
    parkingRate: {
        firstHour: 2,
        nextHours: 3,
        max: 50
    }
}, {
    id: 4,
    name: "1018, Jalan Sultan Ismail Garage",
    address: "1018, Jalan Sultan Ismail, Bandar Wawasan, 50250 Kuala Lumpur, Federal Territory of Kuala Lumpur",
    lat: 3.160451,
    lng: 101.700565,
    totalParkingLot: 300,
    availableParkingLot: 10,
    parkingRate: {
        firstHour: 2.5,
        nextHours: 1,
        max: 10
    }
}, {
    id: 5,
    name: "Parking Depan Balai Polis Dang Wangi",
    address: "67, Jalan Dang Wangi, Chow Kit, 50100 Kuala Lumpur, Wilayah Persekutuan Kuala Lumpur",
    lat: 3.156959,
    lng: 101.698000,
    totalParkingLot: 100,
    availableParkingLot: 20,
    parkingRate: {
        firstHour: 0.5,
        nextHours: 0.5,
        max: 5
    }
}, {
    id: 6,
    name: "239 Jalan Tuanku Abdul Rahman Parking",
    address: "239 Jalan Tuanku Abdul Rahman, Chow Kit, 50250 Kuala Lumpur, Federal Territory of Kuala Lumpur",
    lat: 3.158020,
    lng: 101.696592,
    totalParkingLot: 50,
    availableParkingLot: 33,
    parkingRate: {
        firstHour: 3,
        nextHours: 0.5,
        max: 15
    }
}, {
    id: 7,
    name: "Secure Parking - Menara Liberty",
    address: "1008, Jalan Sultan Ismail, Chow Kit, 50250 Kuala Lumpur, Wilayah Persekutuan Kuala Lumpur",
    lat: 3.160829, 
    lng: 101.695766,
    totalParkingLot: 100,
    availableParkingLot: 88,
    parkingRate: {
        firstHour: 5,
        nextHours: 1,
        max: 12
    }
}, {
    id: 8,
    name: "Quill City Mall Parking Basement",
    address: "1018, Jalan Sultan Ismail, Bandar Wawasan, 55100 Kuala Lumpur, Wilayah Persekutuan Kuala Lumpur",
    lat: 3.159902, 
    lng: 101.700058,
    totalParkingLot: 100,
    availableParkingLot: 88,
    parkingRate: {
        firstHour: 1,
        nextHours: 1,
        max: 10
    }
}, {
    id: 9,
    name: "City Parking",
    address: "Jalan Tugu, City Centre, 50050 Kuala Lumpur, Wilayah Persekutuan Kuala Lumpur",
    lat: 3.142734, 
    lng: 101.693345,
    totalParkingLot: 400,
    availableParkingLot: 279,
    parkingRate: {
        firstHour: 2,
        nextHours: 0.9,
        max: 20
    }
}
];

module.exports = carparkDb;
