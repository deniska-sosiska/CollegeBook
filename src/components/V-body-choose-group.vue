<template>
  <div class="group">
    <h2 style="text-align: center;">It is => {{group}}</h2> 
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
      group: ''
    },
    mounted: function(){
      axios.get(this.dbUrl + "/" + this.group + "/") // <-- Помилка
        .then((res) => {
          console.log(res.data)
        })
    },
    methods: {
      getGroup: function(){}
    }
  }
</script>