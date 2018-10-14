<template>
<el-container class="mobile-container">
    <el-header class="head">
        <el-button style="float: left" icon="el-icon-back" circle type="secondary"></el-button>
    </el-header>
    <el-main class="content">
        <label v-bind="time">   </label>

        <el-date-picker
            type="date"
            placeholder="Pick a date"
            default-value="new Date().getDate()">
        </el-date-picker>

        <el-time-picker
            v-model="value1"
            minTime="new Date().getTime()"
            placeholder="Choose a time">
        </el-time-picker>

    </el-main>
    <el-footer>
        <el-button style="float: left" type="text">SKIP</el-button>
        <el-button style="float: right" icon="el-icon-check" circle type="primary"></el-button>
    </el-footer>
</el-container>
</template>

<script>
export default {
    data() {
        return {
            time: new Date().getTime(),
            value1: ''
        }
    }
}
</script>

<style>
@import "./../css/global.css";

.head {
    margin-top: 20px;
}
</style>
