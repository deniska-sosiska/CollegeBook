<template>
  <div class="table">
    <table>
      <thead>
        <tr><th>№</th><th>ПІБ</th>
        <th>{{getCurrentLesson(0)}}</th>
        <th>{{getCurrentLesson(1)}}</th>
        <th>{{getCurrentLesson(2)}}</th>
        <th>{{getCurrentLesson(3)}}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(student, index) in getDataOfCurrentGroup.students" :key="index">
          <td>{{++index}}</td><td>{{student.name}}</td>
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
        dayNow: '',
        nameDays: [
          "Неділя",
          "Понеділок",
          "Вівторок",
          "Середа",
          "Четвер",
          "friday",
          "Субота",
        ],
        currentPara: [
          "1","2","3","4"
        ]
      }
    },
    computed: {
      getDataOfCurrentGroup(){
        return this.$store.getters.getDataOfCurrentGroup
      }
    },
    mounted: function() {
      // this.dayNow = new Date().getDate() + '.' + new Date().getMonth() + '.' + new Date().getFullYear()
      // console.log(this.dayNow)
      let box = {"specialty": this.specialty, "group": this.group}
      this.$store.dispatch('updateDataOfCurrentGroup', box)
    },
    methods: {
      getCurrentLesson(index) {
        if (new Date().getDay() == 0 || new Date().getDay() == 6)
          return "Сьогодні вихідний"
        else {
          let currentDay = this.nameDays[new Date().getDay()]
          let currentLesson = this.currentPara[index]
          let answer = this.getDataOfCurrentGroup.schedule[currentDay][currentLesson]
          if (answer == "Вікно") {}
          else 
            return answer
        } 
      }
    },
    props: {
      specialty: '',
      group: ''
    },
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