<template>
  <div class="body">
    <h2>Вибiр журналу</h2>
    <div class="magazines">
      <router-link class="imageBlock hover" :to = "'/'"> <!-- :specialty/:group/:academicAttendance -->
        <img :src="hrefAcademicAttendance">
        <p>Журнал відвідувань</p>
      </router-link>
      <div class="imageBlock hover">
        <img :src="hrefImageBlock" class="blocked" title="на етапі розробки">
        <img :src="hrefAcademicProgress">
        <p>Журнал успішності</p>
      </div>
    </div> 
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  data() {
    return {
      hrefAcademicAttendance: '../assets/hrefAcademicAttendance.jpg',
      hrefAcademicProgress: '../assets/hrefAcademicAttendance.jpg',
      hrefImageBlock: '../assets/blocked.png',

      dbUrl: 'http://127.0.0.1:3000/dateBase',
      groupsCurrentSpecialty: {}
      }
    },
    props: {
      // specialty: ''
    },
    mounted: function(){
      // axios.get(this.dbUrl + "/" + this.specialty + "/") 
        // .then((res) => { this.groupsCurrentSpecialty = res.data })
    }
  }
</script>

<style scoped>
  .body { text-align: center; }
  .body > h2 {
    margin: 15px 0px;
    font-weight: 500;
  }
  .magazines {
    display: flex;
    justify-content: center;
    width: 100%;
  }
  .imageBlock { 
    padding: 35px 35px 15px 35px;
    position: relative;
  }
  .imageBlock > p {
    font-size: 18px;
    margin-top: 15px;
    user-select: none;
  }
  .imageBlock > img {
    margin: 0px 0px;
    width: 400px;
  }
  .blocked {
    z-index: 100;
    position: absolute;
    top: 75px;
  }
</style>
