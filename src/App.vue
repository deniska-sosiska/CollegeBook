<template>
  <div id="app">
    <div class = "container">
      <vHeader />
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import vHeader from "./components/V-header.vue"

export default {
  name: 'App',
  components: {
    vHeader
  }

}
</script>

<style>
@font-face {
  font-family: 'Comfortaa';
  src:url('./fonts/Comfortaa-Regular.ttf');
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
</style>
