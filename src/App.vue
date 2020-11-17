<template>
  <div id="app">
    <div class = "container">
      <vHeader />
      
      <vContent />
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import vHeader from "./components/V-header.vue"
import vContent from "./components/V-body-content.vue"

export default {
  name: 'App',
  components: {
    vHeader,
    vContent
  }

}
</script>

<style>
@font-face {
  font-family: 'Comfortaa';
  src:url('./assets/Comfortaa-Regular.ttf');
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
.hover:hover {
  cursor: pointer;
  background: #e6f7ff;
}
</style>
