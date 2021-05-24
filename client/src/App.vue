<template>
  <div id="app" class = "container">
    <Header />
      <router-view></router-view>
  </div>
</template>

<script>
  import Header from "/components/Header.vue"
  import { mapMutations } from "vuex"

  export default {
    name: 'App',
    components: {  Header  },

    async created() {
      if (localStorage.accountData) {
        const accountData = JSON.parse(localStorage.accountData)
        this.setAccountData(accountData)
      }
      
      await this.$store.dispatch("fetchAllSpecialties")
    },

    methods: mapMutations(['setAccountData', 'clearAccountData'])
  }
</script>

<style>
  @font-face {
    font-family: 'Comfortaa';
    src:url('./assets/Comfortaa-Regular.ttf');
  }

  html, body {
    height: 100vh;
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
  a {
    text-decoration: none;
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
