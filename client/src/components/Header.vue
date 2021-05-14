<template>
  <div class="header">
    <a 
      :href='collegeLinkUrl'
      class="logo hover"
      target="_blank"
    >
      <img :src="logo_src">
      <p>Запорізький електротехнічний фаховий коледж</p>
    </a>
    <nav class="menu">
      <router-link :to = "'/'" class="hover">Головна</router-link>
      <!--  -->
      <router-link v-if="accountData === null" :to ="{ name: 'SignIn' }" class="hover">Авторизацiя</router-link>

      <div v-else class="dropdown">
        <div class="hover" :class=' flag ? "headerHover": "" '>Меню аккаунту</div>
        <div 
          class="dropdown-content"
          @mouseover="flag = !flag"
          @mouseout="flag = !flag"
        >
          <div
            class="hover"
          >Логiн: {{ accountData.login }}</div>
          <router-link
            v-if="accountData.role === 'Admin'"
            :to="{ name: 'AdminPanel' }"
            class="hover"
          >Адмiн панель</router-link>
          <a 
            :href="myGit"
            class="hover"
            target="_blank"
          >Техпідтримка</a>
          <div 
            @click="clearAccountData()"
            class="hover"
          >Вийти з аккаунту</div>
        </div>
      </div>
      <!--  -->
    </nav>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: "Header",

  data: () => ({
    flag: false,
    
    logo_src: '../assets/logo.png',
    collegeLinkUrl: "http://zetk.com.ua/",

    myGit: "https://github.com/deniska-sosiska/CollegeBook-MEVN-stack"
  }),

  computed: {
    ...mapGetters(['accountData'])
  },
  methods: {
    clearAccountData: function() {
      this.$store.commit('clearAccountData')
      this.$router.push("/").catch(() => {})
      this.flag = false
    }
  }
}
</script>

<style scodep>
  .header {
    display: flex;
    justify-content: space-between;
    height: 80px;
    /* border: 1px solid; */

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
    /* border: 1px solid; */
  }

  .menu  .hover {
    font-size: 18px;
    padding: 29px 20px;
    user-select: none;
    /* border: 1px solid; */
  }

  .dropdown {
    position: relative;
    display: inline-block;
  }

  .dropdown-content {
    padding-top: 2px;
    width: 322px;
    display: none;
    position: absolute;
    left: -125px;
    z-index: 10;
    background: #fff;

  }
  .dropdown-content > div.hover,
  .dropdown-content > a.hover {
    border: 4px solid #e6f7ff;
    border-bottom: 0px;
    display: block;
    font-size: 20px;
    padding: 20px;
  }
  .dropdown-content > div.hover:last-child {
    border-bottom: 4px solid #e6f7ff;
  }

  .dropdown:hover .dropdown-content {display: block;}

  .headerHover {
    background: #e6f7ff;
    border: 1px solid #e6e6e6 !important;
  }
  
</style>