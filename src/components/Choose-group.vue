<template>
  <div class="group">
    <h2>Усі групи за спеціальністю: <span>{{groupsCurrentSpecialty.name}}</span></h2>
    <router-link 
      v-for="(group, name, index) in groupsCurrentSpecialty.groups"
      :key="index"
      :to = "'/' + groupsCurrentSpecialty.id + '/' + group.id + '/'">
        <p class="infoGroup hover">Група: {{name}} || Староста: {{group.headman}} || Класний керівник: {{group.leader}}</p>
    </router-link> 
  </div>
</template>

<script>
  import Vue from 'vue'
  import axios from 'axios'

  export default {
    data() {
      return {
        dbUrl: 'http://127.0.0.1:3000/dataOfGroups',
        groupsCurrentSpecialty: {}
      }
    },
    props: {
      specialty: ''
    },
    mounted: function(){
      axios.get(this.dbUrl + "/" + this.specialty + "/") 
        .then((res) => { this.groupsCurrentSpecialty = res.data })
    },
    methods: {
      getGroup: function(){}
    }
  }
</script>

<style  scoped>
  .infoGroup {
    font-size: 20px;
    padding: 15px 45px;
    text-align: center;
  }
  .group {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .group > h2 {
    text-align: center;
    margin: 10px 0px 35px 0px;
    font-weight: 500;
  }
  .group > h2 > span { font-weight: 800; }
</style>