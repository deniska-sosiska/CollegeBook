<template>
  <div class="group">
    <h2 style="text-align: center;">It is => {{}}</h2> 
  </div>
</template>

<script>
  import Vue from 'vue'
  import axios from 'axios'

  export default {
    data() {
      return {
        dbUrl: 'http://127.0.0.1:3000/dateBase'
      }
    },
    props: {
      forLink: ''
    },
    mounted: function(){
      this.getGroup
    },
    methods: {
      getGroup: function(){
        axios.get(this.dbUrl + forLink).then((res) => {
          console.log(res.data)
        })
      }
    }
  }
</script>

<style scoped>

</style>