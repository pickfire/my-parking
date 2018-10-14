<template>
  <el-container class="mobile-container">
    <el-header>
    </el-header>
    <el-main class="content">  
      <div><img src="frontend\src\assets\logo.png" alt=""></div>  
      <div class="title">Hi, where're you heading to?</div>
      <el-autocomplete
           id="txtSearch"
           v-model="destination"
           clearable
           prefix-icon="el-icon-search"
           :fetch-suggestions="querySearch"
           placeholder="Enter Destination"
           :trigger-on-focus="false"
           @select="handleSelect"
           ></el-autocomplete>
    </el-main>
    <el-footer>
      <router-link to="/carpark">
        <el-button style="float: right" icon="el-icon-check" circle type="primary"></el-button>
      </router-link>
    </el-footer>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
        destination: ''
    };
  },
  methods: {
      querySearch(queryString, cb) {
        var links = this.links;
        var results = queryString ? links.filter(this.createFilter(queryString)) : links;
        // call callback function to return suggestions
        cb(results);
      },
      createFilter(queryString) {
        return (link) => {
          return (link.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      loadAll() {
        return [
          { "value": "UniKL Malaysian Institute of Information Technology" },
          { "value": "UniKL BMI, Jalan Sungai Pusu, Gombak, Selangor" },
          { "value": "UniKL Business School, Kampung Datuk Keramat, Kuala Lumpur, Federal Territory of Kuala Lumpur" }
         ];
      },
      handleSelect(item) {
        console.log(item);
      }
    },
    mounted() {
      this.links = this.loadAll();
    }

};
</script>

<style>
@import "./../css/global.css";
.title {
    font-size: 35px;-
    margin-top: 30px;
    margin-bottom: 30px;
    color: rgb(88, 230, 175);
}

#txtSearch {
  width: 300px;
}
</style>
