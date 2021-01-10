<template>
  <div>
    <table>
      <thead>
        <tr class="firstTR"><th>№</th><th>ПІБ</th><th>Число коли не було</th><th>Прогули у годинах</th><th>Загальна сума прогулів</th></tr>
      </thead>
      <tbody>
        <tr v-for="(stud, indexStud) in dataOfStud" :key="indexStud">
          <td>{{indexStud+1}}</td>
          <td>{{stud.name}}</td>
          <td class="para">
            <div v-for="(data, name, indexData) in stud.attandance" :key="indexData">
              <p v-if="data.first || data.second || data.third || data.fourth">{{name}}</p>
            </div>
          </td>
          <td class="para">
            <div v-for="(data, name, indexData) in stud.attandance" :key="indexData">
              <p v-if="data.first || data.second || data.third || data.fourth">{{output(data, indexStud)}}</p>
            </div>
          </td>
          <td class="para">
            <p>{{arrayAttandance[indexStud]}}</p>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="buttons">
      <router-link class="hover" :to="'/' + specialty + '/' + group + '/AcademicAttendance/'">Повернутись до журналу</router-link>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  data() {
    return {
      dataOfStud: [],
      answer: '',
      arrayAttandance: {}
    }
  },
  props: {
    specialty: '',
    group: ''
  },
  computed: {
    getDataOfStud(){
      return this.$store.getters.getDataOfStud
    }
  },
  mounted: function() {
    let box = {"specialty": this.specialty, "group": this.group}
    this.$store.dispatch('updateDataOfCurrentGroup', box)
    setTimeout(() => {      
      this.dataOfStud = this.getDataOfStud
    }, 100);
  },
  methods: {
    output(data, indexStud) {
      let countTime = 0;
      let answer = 0

      for ( let i in data) 
        if (data[i]) countTime++
      
      answer = countTime * 2

      if (!this.arrayAttandance[indexStud]) 
        this.arrayAttandance[indexStud] = answer
      else 
        this.arrayAttandance[indexStud] += answer

      return answer
    }
  }
}
</script>

<style scoped>
  .stud {
    display: flex;
    /* justify-content: space-around; */
  }
  .data {
    display: block;
    margin-left: 20px;
    margin-bottom: 5px;
  }
  table {
    margin: 0px auto;
    margin-top: 10px;
    padding: 20px 40px;
    border: 1px solid #ccc;
    border-radius: 25px;
    border-spacing: 0px;
  }
  th {
    font-size: 18px;
    padding: 0px 10px;
    padding-bottom: 15px;
  }
  .tr > th {
    padding-bottom: 0px;
    border-bottom: solid 1px #ccc;
  }
  td {  
    border-bottom: solid 1px #ccc;
    padding: 10px 20px 4px 20px;
    font-size: 20px;
  }
  .para {
    padding: 10px 0px 4px 0px;

    text-align: center;
    font-size: 16px;
  }
  .para:hover {
    background: #ccefff;
    cursor: pointer
  }
  tr:hover {
    background: #e6f7ff;
  }
  .firstTR:hover {
    background: #fff;
  }
  .buttons {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin: 20px 80px;
  }
  .buttons > a {
    padding: 4px 8px;
    cursor: pointer;
  }
</style>
