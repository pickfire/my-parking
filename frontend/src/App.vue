<template>
  <div id="app">

    <section v-if="errored">
      <p>We're sorry, we're not able to retrieve this information at the moment, please try back later</p>
    </section>

    <section v-else>
      <div v-if="loading">Loading...</div>
      <div
      v-else
      v-for="currency in info"
      class="currency"
      >
      {{ currency.description }}:
      <span class="lighten">
        <span v-html="currency.symbol"></span>{{ currency.rate_float | currencydecimal }}
      </span>
    </div>
    </section>

    <parking-map></parking-map>
  </div>
</template>

<script>
import ParkingMap from './components/ParkingMap'
import axios from 'axios';

export default {
  components: {
    ParkingMap
  },
  methods: {
  },
  data () {
    return {
      info: null,
      loading: true,
      errored: false
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
      .catch(error => {
        console.log(error)
        this.errored = true
      })
      .finally(() => this.loading = false)
.catch
  }
}
</script>

<style>
#app {
  font-family: Helvetica, sans-serif;
  text-align: center;
}
</style>
