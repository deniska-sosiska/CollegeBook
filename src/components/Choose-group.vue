<template>
  <div class="group">
    <h2>Усі групи за спеціальністю: <span>{{getDataOfCurrentGroup.name}}</span></h2>
    <router-link 
      v-for="(group, name, index) in getDataOfCurrentGroup.groups"
      :key="index"
      :to = "'/' + getDataOfCurrentGroup.id + '/' + group.id + '/'">
        <p class="infoGroup hover">Група: {{name}} || Староста: {{group.headman}} || Класний керівник: {{group.leader}}</p>
    </router-link> 
  </div>
</template>

<script>
  import Vue from 'vue'
  import axios from 'axios'

  export default {
    props: {
      specialty: ''
    },
    computed: {
      getDataOfCurrentGroup: function() {
        return this.$store.getters.getDataOfCurrentGroup
      }
    },
    mounted: function(){
      this.$store.dispatch('updateDataOfCurrentGroup', this.specialty)
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