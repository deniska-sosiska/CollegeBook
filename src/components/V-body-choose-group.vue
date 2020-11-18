<template>
  <div class="group">
    <router-link 
      v-for="(group, name, index) in groupsCurrentSpecialty.groups"
      :key="index">
        {{name}}
    </router-link> 
  </div>
</template>

<script>
  import Vue from 'vue'
  import axios from 'axios'

  export default {
    data() {
      return {
        dbUrl: 'http://127.0.0.1:3000/dateBase',
        groupsCurrentSpecialty: {}
      }
    },
    props: {
      id: ''
    },
    mounted: function(){
      axios.get(this.dbUrl + "/" + this.id + "/") // <-- Помилка
        .then((res) => { this.groupsCurrentSpecialty = res.data })
    },
    methods: {
      getGroup: function(){}
    }
  }
</script>