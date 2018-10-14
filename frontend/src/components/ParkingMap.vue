<template>
  <div>
    <l-map id="map" :zoom="zoom" :center="loc">
      <l-tile-layer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></l-tile-layer>
      <l-marker :lat-lng="loc"></l-marker>
      <l-marker v-for="marker in markers"
        :key="marker.id" :lat-lng="[marker.lat, marker.lng]">
        <l-popup>
          <div @click="popupClick">
            Popup data
          </div>
        </l-popup>
      </l-marker>
    </l-map>

    <el-container class="list sticky-bottom center app-width">
      <el-main style="padding: 0">
        <el-collapse v-if="carparks && carparks.length" accordion>
          <el-collapse-item class="list-heading"
           :key="'nearestParkingList'" :title="'Nearest Car Parks'">
            <div class="list-item" v-for="carpark of carparks" :key="carpark.id" @click="dialogVisible = true">
              <span class="list-carpark">{{carpark.name}}</span>
              <span class="list-distance">{{carpark.distance}}</span>
              <el-tag class="list-status" :type="carpark.availabilityColor">{{carpark.availability}}</el-tag>
              <div class="list-pricing-group">
                <span class="list-currency">MYR</span>
                <span class="list-price">{{carpark.price}}</span>
              </div>
            </div>
          </el-collapse-item>
        </el-collapse>
      </el-main>
    </el-container>

    <el-dialog
       title=""
       :visible.sync="dialogVisible"
        width="70%"
      :before-close="handleClose">
        <span>Navigate Now</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">Cancel</el-button>
              <el-button type="primary" @click="dialogVisible = false">Confirm</el-button>
            </span>
          </el-dialog>


    <!--
    <div class="list">
      <div class="list-heading">Nearest Car Parks</div>
      <div class="list-item">
        <span class="list-carpark">Car Park 1</span>
        <span class="list-distance">500m</span>
        <el-tag class="list-status" type="success">Available</el-tag>
        <span class="list-currency">RM</span>
        <span class="list-price">8.00</span>
      </div>
      <div class="list-item">
        <span class="list-carpark">Car Park 2</span>
        <span class="list-distance">700m</span>
        <el-tag class="list-status" type="danger">Full</el-tag>
        <span class="list-currency">RM</span>
        <span class="list-price">10.00</span>
      </div>
      <div class="list-item">
        <span class="list-carpark">Car Park 3</span>
        <span class="list-distance">1.2km</span>
        <el-tag class="list-status" type="warning">Limited</el-tag>
        <span class="list-currency">RM</span>
        <span class="list-price">7.50</span>
      </div>
      <div class="list-item">
        <span class="list-carpark">Car Park 4</span>
        <span class="list-distance">2.5km</span>
        <el-tag class="list-status" type="danger">Full</el-tag>
        <span class="list-currency">RM</span>
        <span class="list-price">17.50</span>
      </div>
    </div>
    -->
  </div>
</template>

<script>
import { LMap, LTileLayer, LMarker, LPopup } from "vue2-leaflet";
import { carparkAll } from "../mocks/parking.js";
import axios from "axios";

import "leaflet/dist/leaflet.css";

var toggle = true;
export default {
  name: "parking-map",
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup
  },
  data() {
    return {
      zoom: 13,
      markers: carparkAll,
      loc: L.latLng(3.0934, 101.6794),
      carparks: [],
      dialogVisible: false
    }
  },
  methods: {
    popupClick() {
      this.$notify({
        title: "It works!",
        type: "success",
        message:
          "We've laid the ground work for you. It's time for you to build something epic!",
        duration: 5000
      })
    },
    handleClose(done) {
      this.$confirm("Are you sure to close this dialog?")
        .then(_ => { done(); })
        .catch(_ => {})
    }
  },
  created() {
    let dur = "6";
    if (toggle) {
      dur = "1";
      toggle = !toggle;
    }
    axios
      .get("http://localhost:3000/carpark/nearest?lat=3.161299&lng=101.701799&duration=" + dur)
      .then(res => this.carparks = res.data.body)
      .catch(err => console.error(err))
  }
};
</script>

<style>
.leaflet-fake-icon-image-2x {
  background-image: url(../../node_modules/leaflet/dist/images/marker-icon-2x.png);
}
.leaflet-fake-icon-shadow {
  background-image: url(../../node_modules/leaflet/dist/images/marker-shadow.png);
}
@import "../../node_modules/leaflet/dist/leaflet.css";
#map {
  height: 100vh;
  width: 100%;
  margin: auto;
  /* margin-top: 10px; */
}
.list {
  z-index: 1000;
  position: absolute;
  bottom: 0;
  width: 800px;
  margin-bottom: -217px;
  max-height: 400px;
  /* overflow-y:scroll; */
  /* padding-right: 17px; */
  /* max-height: 300px; */
}
/* .list div {
  background-color: white;
} */
.list-heading div[role=button] {
  text-align: center;
  font-size: 23px;
  border-top-right-radius: 15px;
  border-top-left-radius: 15px;
  border-top: solid 1px gray;
  padding: 10px;
  overflow: hidden;
}
.list-item {
  cursor: pointer;
  padding: 13px 20px;
  min-height: 40px;
  text-align: left;
  display: block;
  border-top: 1px gray solid;
  /* border-bottom: 1px gray solid; */
}
.list-item:hover {
  background-color: rgb(235, 235, 235);
}
.list-status {
  font-size: 16px;
  width: 88px;
  margin-left: 10px;
  text-align: center;
  height: 28px;
  line-height: 1.8em;
}
.list-pricing-group {
  text-align: right;
  position: relative;
  float: right;
  display: inline-grid;
  margin-top: -5px;
}
.list-currency {
  font-size: 20px;
  position: relative;
  /* right: 0; */
  margin-top: -36px;
  margin-right: -4px;
  font-weight: 700;
  /* float: right; */
  /* display: grid; */
}
.list-price {
  font-size: 35px;
  font-weight: 700;
  position: relative;
  /* float: right; */
  margin-top: -21px;
  margin-right: -6px;
  /* text-align: right; */
  /* display: grid; */
}
.list-carpark {
  font-size: 20px;
  max-width: 262px;
  margin-bottom: 8px;
  line-height: 1.1em;
  display: block;
}
.list-distance {
  font-size: 16px;
  width: 60px;
  color: darkgray;
}
.sticky-bottom {
  position: absolute;
  bottom: 0;
  z-index: 1000;
}
.center {
  margin: 0 auto;
}
.app-width {
  width: 100vw;
  max-width: 800px;
}
.dimension{
  width: 500px;
  height: 5px;
}
</style>
