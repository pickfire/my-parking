<template>
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
</template>

<script>
import { LMap, LTileLayer, LMarker, LPopup } from "vue2-leaflet"
import { carparkAll } from '../mocks/parking.js'

export default {
  name: "parking-map",
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup
  },
  data() {
    console.log(carparkAll)
    return {
      zoom: 13,
      markers: carparkAll,
      loc: L.latLng(3.0934, 101.6794),
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
  }
}
</script>

<style>
#map {
  height: 80%;
  overflow: auto;
}
</style>
