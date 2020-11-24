<template>
  <div class="choseGroup ">
    <div v-for = "(groups, index) in dateBase" :key = "index">
      <div v-if="!groups.groups" class="group hover"> <!--якщо вона порожня-->
          <img v-if="!groups.groups" :src="hrefImageBlock" class="blocked" title="на етапі розробки">
          <img :src="groups.linkImage">
          <p>{{groups.name}}</p>
      </div>
      <!-- /:specialty/:group/magazines/:academicAttendance -->
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
      dbGroupsUrl: 'http://127.0.0.1:3000/dateBase',
      dbAuthorizUrl: 'http://127.0.0.1:3000/registeredUser',
      dateBase: [],
      hrefImageBlock: '../assets/blocked.png'
    }
  },
  mounted: function() {
    this. getDB()
  },
  methods: {
     getDB: function() {
      axios.get(this.dbGroupsUrl).then((response) => {
        this.dateBase = response.data
        console.log("Отримання даних з БД: Успішно")
      })
     },
     showDB: function(data) {
       console.log("on_click: ", this.dateBase)
     }
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