<template>
  <div class="choseGroup ">
    <router-link  v-for = "(groups, name, index) in dateBase"
    @click = "showDB(groups)"
    :to = "'/' + groups.forLink"
    :key = "index"
    class="group hover">
        <img :src="groups.linkImage" alt="">
        <p>{{name}}</p>
    </router-link>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'

export default {
  data(){
    return {
      dbUrl: 'http://127.0.0.1:3000/dateBase',
      dateBase: [],
      chooseGroup: ''
    }
  },
  mounted: function() {
    this. getDB()
  },
  methods: {
     getDB: function() {
      axios.get(this.dbUrl).then((response) => {
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
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .group > p {
    text-align: center;
    margin-top: 10px;
  }

</style>