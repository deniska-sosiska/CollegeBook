<template>
  <div id="app">
    <div class = "container">
      <vHeader />
       <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import vHeader from "./components/V-header.vue"
import vChooseMagazines from "./components/V-body-choose-magazines.vue"

export default {
  name: 'App',
  data() {
    return {
    }
  },
  components: {
    vHeader,
    vChooseMagazines
  }

}
</script>

<style>
  @font-face {
    font-family: 'Comfortaa';
    src:url('./assets/Comfortaa-Regular.ttf');
  }
  a {
    text-decoration: none;
  }
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    color: #2c3e50;
    font-family: "Comfortaa";
  }
  .container {
    width: 1200px;
    margin: 0 auto;
  }
  .myBorder {
    border: solid 1px;
  }
  .hover {
    user-select: none;
    border: 1px solid #fff;
  }
  .hover:hover {
    cursor: pointer;
    background: #e6f7ff;
    box-sizing: border-box;
    border: 1px solid #e6e6e6;
  }
</style>
