<template>
  <div class="mobile-container">
    <div>
      <l-map id="map" :zoom="zoom" :center="loc">
        <l-tile-layer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></l-tile-layer>
        <l-marker v-for="marker in markers" :key="marker.id" :lat-lng="[marker.lat, marker.lng]">
          <l-popup>
            <div @click="popupClick">
              Popup data
            </div>
          </l-popup>
        </l-marker>
      </l-map>
    </div>

    <!--
    <el-container>
      <el-header>Nearest Car Parks</el-header>
      <el-main>
        <el-collapse v-if="carparks && carparks.length" accordion>
          <el-collapse-item v-for="(carpark, index) of carparks" :key="carpark.id"
            :title="carpark.name" :name="carpark.id">
          </el-collapse-item>
        </el-collapse>
      </el-main>
    </el-container>
    -->

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
  </div>
</template>

<script>
import { LMap, LTileLayer, LMarker, LPopup } from "vue2-leaflet"
import { carparkAll } from '../mocks/parking.js'
import axios from 'axios'

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
      zoom: 15,
      markers: carparkAll,
      loc: L.latLng(3.0934, 101.6794),
      carparks: []
    }
  },
  methods: {
    popupClick () {
      this.$notify({
        title: 'It works!',
        type: 'success',
        message: 'We\'ve laid the ground work for you. It\'s time for you to build something epic!',
        duration: 5000
      })
    }
  },
  created () {
    this.$http.get('http://localhost:3000/carpark/nearest')
      .then(res => this.carparks = res.data.body)
      .catch(err => console.error(err))
  }
}
</script>

<style>
@import "./../css/global.css";
#map {
  height: 800px;
  width: 100%;
  margin: auto;
  /* margin-top: 10px; */
}
.list {
  z-index: 1000;
  position: absolute;
  bottom: 0;
  width: 420px;
  margin-bottom: -217px;
}
.list div {
  background-color: white;
}
.list-heading {
  text-align: center;
  font-size: 25px;
  border-top-right-radius: 15px;
  border-top-left-radius: 15px;
  border-top: solid 1px gray;
  padding: 10px;
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
.list-price {
  font-size: 27px;
  font-weight: 700;
  position: relative;
  float: right;
  margin-top: -7px;
  margin-right: -6px;
  text-align:right;
  display: grid;
}
.list-status {
  width: 76px;
  margin-left: 10px;
  text-align: center;
  height: 27px;
  line-height: 2.2em;
}
.list-currency {
  font-size: 16px;    
  position: absolute;
  right: 0;
  margin-top: -24px;
  margin-right: 15px;
  font-weight: 700;
}
.list-carpark {
  font-size: 20px;
  margin-bottom:5px;
  display:block;
}
.list-distance {
  width: 60px;
  color: darkgray;
}
</style>
