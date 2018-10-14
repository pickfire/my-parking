<template>
  <div id="app">
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
@import "../node_modules/leaflet/dist/leaflet.css";

#app {
  font-family: 'Roboto', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif !important;
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
  /* overflow: hidden; */
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
