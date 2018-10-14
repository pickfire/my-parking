<template>
  <div id="app">
    <div id="navigation">
      <router-link to="/search" replace>Search Destination</router-link>
      <router-link to="/carpark" replace>Carpark</router-link>
      <router-link to="/nearest" replace>Nearest</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      info: null
    }
  },
  filters: {
    currencydecimal (value) {
      return value.toFixed(2)
    }
  },
  mounted () {
    axios
      .get('localhost:3000/carpark/all')
      .then(response => (this.info = response.data.bpi))
  }
}
</script>

<style>
@import "./css/global.css";
@import "../node_modules/leaflet/dist/leaflet.css";

#app {
  /* font-family: Helvetica, sans-serif; */
  text-align: center;
  /* color: white !important; */
}

#navigation a {
  margin-right: 10px;
}

#full {
  position: absolute;
  overflow-x: auto;
  top: 0;
  right: 0;
  left: 208px;
  bottom: 0;
  padding-left: 8px;
  border-left: 1px solid #ccc;
}
</style>
