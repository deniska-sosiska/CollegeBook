<template>
  <div class="choseGroup ">
    <div v-for = "(groups, index) in getDataOfSpecialty" :key = "index">
      <div v-if="!groups.groups" class="group hover"> <!--якщо вона порожня-->
          <img :src="hrefImageBlock" class="blocked" title="на етапі розробки">
          <img :src="groups.linkImage">
          <p>{{groups.name}}</p>
      </div>
      <router-link  v-else  
        :to = "'/' + groups.id + '/'"
        class="group hover">
          <img :src="groups.linkImage">
          <p>{{groups.name}}</p>
      </router-link>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'

export default {
  data(){
    return {
      hrefImageBlock: '../assets/blocked.png'
    }
  },
  computed: {
    getDataOfSpecialty: function() {
      return this.$store.getters.getDataOfSpecialty
    }
  },
  mounted() {
    this.$store.dispatch('updateDataOfSpecialty')
  }
}
</script>

<style scoped>
  .choseGroup {
    padding: 0px 0px;
    display: flex;
    /* justify-content: space-around; */
    flex-wrap: wrap;
  }
  .group {
    padding: 40px 20px 20px 20px;
    width: 400px;
    height: 360px;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
  }
  .group > p {
    text-align: center;
    margin-top: 10px;
  }
  .blocked {
    position: absolute;
    width: 250px;
    top: 65px;
  }

</style>