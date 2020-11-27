<template>
  <div class="header">
    <a :href=linkToCollege target="_blank" class="logo hover">
      <img :src="logo_src">
      <p>Запорізький електротехнічний фаховий коледж</p>
    </a>
    <nav class="menu">
      <router-link :to = "'/'" class="hover">Головна</router-link>
      <router-link v-if="getUser === null" :to = "'/Authorization/'" class="hover">Авторизацiя</router-link>
      <div v-else class="hover" @click="clearCurrentUser">Вийти з аккаунту: {{getUser.login}}</div>
    </nav>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  data() {
    return {
      logo_src: '../assets/logo.png',
      linkToCollege: "http://zetk.com.ua/"
    }
  },
  computed: {
    getUser() {
      return this.$store.getters.getUser
    }
  },
  methods: {
    clearCurrentUser: function() {
      this.$store.commit('clearCurrentUser')
      if (document.URL != "http://localhost:9999/#/")
        this.$router.push('/')
    }
  }
}
</script>

<style scodep>
  .header {
    display: flex;
    justify-content: space-between;
    height: 80px;
  }
  .logo {
    padding: 0px 20px;
    display: flex;
    align-items: center;
    text-decoration: none;
  }
  .logo > img {
    width: 60px;
    height: 60px;
    margin-right: 5px;
  }
  .logo > p {
    padding: 0px 20px;
    font-size: 18px;
  }
  .menu {
    display: flex;
    /* align-items: center; */
  }
  .menu > .hover {
    font-size: 18px;
    padding: 31px 20px;
    user-select: none;
  }
</style>