<template>
  <div class="header">
    <div class="logo hover">
      <img :src="logo_src">
      <p class="">Запорізький електротехнічний фаховий коледж</p>
    </div>
    <nav class="menu">
      <div class="hover">Главная</div>
      <div class="hover">Авторизация</div>
    </nav>
  </div>
</template>

<script>
import Vue from 'vue'


export default {
  data() {
    return {
      logo_src: '../assets/logo-removebg-preview.png'
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
  }
  .logo > img {
    width: 60px;
    height: 60px;
    margin-right: 5px;
  }
  .logo > p {padding: 0px 20px;}
  .menu {
    display: flex;
    /* align-items: center; */
  }
  .menu > div {
    padding: 30px 20px;
    margin-left: 35px;
  }
  .hover:hover {
    padding: 30px 20px;
    cursor: pointer;
    background: #e6f7ff;
  }
</style>