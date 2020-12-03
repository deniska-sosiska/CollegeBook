<template>
  <div class="table">
    <table>
      <thead>
        <tr><th>№</th><th>ПІБ</th>
        <th>Математика</th><th>Дискретна математика</th><th>Лінійна алгебра</th><th>Математичний аналіз</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(student, index) in getDataOfCurrentGroup.students" :key="index">
          <td>{{index}}</td><td>{{student.name}}</td>
          <td class="para">✓</td>
          <td class="para">✓</td>
          <td class="para">✓</td>
          <td class="para">✓</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import Vue from 'vue'
  import axios from 'axios'

  export default {
    data () {
      return {
      }
    },
    props: {
      specialty: '',
      group: ''
    },
    computed: {
      getDataOfCurrentGroup(){
        return this.$store.getters.getDataOfCurrentGroup
      }
    },
    mounted: function(){
      let box = {"specialty": this.specialty, "group": this.group}
      this.$store.dispatch('updateDataOfCurrentGroup', box)
    }
  }
</script>

<style scoped>
  table {
    margin: 0px auto;
    margin-top: 30px;
    padding: 40px;
    border: 1px solid #ccc;
    border-radius: 25px;
  }
  th {
    padding: 0px 10px;
    padding-bottom: 20px;
  }
  td {  
    border-bottom: solid 1px #ccc;
    padding: 0 20px 5px 20px;
  }
  .para {
    padding: 0xp 0px;
    text-align: center;
  }
</style>