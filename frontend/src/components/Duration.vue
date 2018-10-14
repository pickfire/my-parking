<template>
<el-container class="mobile-container">
    <el-header>
    <router-link to="/search" replace>
      <el-button style="float: left" icon="el-icon-back" circle type="secondary"></el-button>
    </router-link>
    </el-header>
    <el-main class="content">
        <div class="current">Current Time:</div>
        <div>
          <label class="title" style="margin-bottom: 20px">{{time}}</label>
        </div>
        <br>
        <el-date-picker
            type="date"
            placeholder= "2018-10-14"
            readonly>

        </el-date-picker>
        <br>
        <el-time-select
          v-model="value1"
          placeholder="Select time">
        </el-time-select>

        <div class="duration">Duration:</div>
        <label>{{durian}}</label>
    </el-main>
    <el-footer>
        <el-button style="float: left" type="text"></el-button>
      <router-link to="/carpark" replace>
        <el-button style="float: right" icon="el-icon-check" circle type="primary"></el-button>
      </router-link>
    </el-footer>
</el-container>
</template>

<script>
export default {
  data() {
    const d = new Date();
    return {
      since: d,
      time: `${("0" + d.getHours()).slice(-2)}:${("0" + d.getMinutes()).slice(-2)}`,
      value1: ""
    };
  },
  computed: {
    durian: function () {
      if (this.time && this.value1) {
        const d = (this.value1.split(':')[0] - this.time.split(':')[0]) * 60 + (this.value1.split(':')[1] - this.time.split(':')[1])

        let s = d > 60 ? `${parseInt(d / 60)} hours` : ''
        if (s % 60 !== 0) {
          s += ` ${d % 60} minutes`
        }
        return s
      } else {
        return ''
      }
    }
  }
};
</script>

<style>


.input-label {
  width: 130px;
}
.head {
  margin-top: 20px;
}
.duration {
  margin-top: 50px;
  font-size: 25px;
}
.current {
  font-size: 15px;

}

</style>
