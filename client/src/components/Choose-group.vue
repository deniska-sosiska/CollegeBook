<template>
  <div class="group">
    <h2>Усі групи за спеціальністю: <span>{{getDataOfCurrentSpecialty.name}}</span></h2>
    <router-link 
      v-for="(group, index) in getDataOfCurrentSpecialty.groups"
      :key="index"
      :spesialty="getDataOfCurrentSpecialty.id"
      :group="group.id"
      :to = "'/' + getDataOfCurrentSpecialty.id + '/' + group.id + '/'">
        <p class="infoGroup hover">Група: {{group.nameGroup}} || Староста: {{group.headman}} || Класний керівник: {{group.leader}}</p>
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
      getDataOfCurrentSpecialty: function() {
        return this.$store.getters.getDataOfCurrentSpecialty
      }
    },
    mounted: function(){
      this.$store.dispatch('updateDataOfCurrentSpecialty', this.specialty)
    },
    methods: {}
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