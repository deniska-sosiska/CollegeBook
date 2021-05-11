<template>
  <div id="app" class = "container">
    <Header />
      <router-view></router-view>
  </div>
</template>

<script>
  import Header from "/components/Header.vue"

  export default {
    name: 'App',
    components: {  Header  }
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
    max-width: 1200px;
    margin: 0 auto;
  }
  .myBorder {
    border: solid 1px;
  }
  .hover {
    user-select: none;
    border: 1px solid #fff;
    transition: ease-out 0.2s;
  }
  .hover:hover {
    cursor: pointer;
    background: #e6f7ff;
    box-sizing: border-box;
    border: 1px solid #e6e6e6;
  }
</style>
