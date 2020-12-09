<template>
  <div class="table">
    <div class="time" style="padding-top: 10px;">
      <p>Дата: {{getNowDate}}</p>
      <p>День тижня: {{getNowDay}}</p>
      <p>Поточний час: {{getCurrentTime}}</p>
    </div>
    <table>
      <thead>
        <tr class="firstTR"><th>№</th><th>ПІБ</th>
        <th v-for="(i, index) in 4" :key="index">{{getCurrentLesson(i)}}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(stud, index) in getDataOfStud" :key="index">
          <td>{{index + 1}}</td><td>{{stud.name}}</td>
          <td class="para" style="display: none;">{{attandanceCurrentStud(index)}}</td>
           <!-- перевіряє чи є об'єкт для поточної дати, якщо ні - створює -->
          <td class="para">{{stud.attandance[getNowDate].first}}</td>
          <td class="para">{{stud.attandance[getNowDate].second}}</td>
          <td class="para">{{stud.attandance[getNowDate].third}}</td>
          <td class="para">{{stud.attandance[getNowDate].fourth}}</td>
           
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
        nameDays: ["Неділя","Понеділок","Вівторок","Середа","Четвер","П'ятниця","Субота"],
        months: ["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"],
        qwe: [true, false, false, false]
      }
    },
    computed: {
      getCurrentTime() {  
        let hours = new Date().getHours(); let min = new Date().getMinutes()
        hours < 10 ? hours = '0'+ hours : hours; min < 10 ? min = '0'+ min : min 
        return hours + ':' +  min
      },
      getNowDay() {  return this.nameDays[new Date().getDay()]  },
      getNowDate() {  
        let data = new Date().getDate() + '.' + (new Date().getMonth() + 1) + '.' + new Date().getFullYear()
        return data
      },
      getDataOfCurrentGroup(){  
        return this.$store.getters.getDataOfCurrentGroup
      },
      getDataOfStud(){
        return this.$store.getters.getDataOfStud
      }
    },
    mounted: function() {
      let box = {"specialty": this.specialty, "group": this.group}
      this.$store.dispatch('updateDataOfCurrentGroup', box)
    },
    methods: {
      attandanceCurrentStud(indexStud) {
        if (!this.getDataOfStud[indexStud].attandance[this.getNowDate]) {
          let data = {indexStud: indexStud ,info: {first: false, second: false, third: false, fourth: false}}
          this.$store.dispatch('updateStud', data)
        }
      },
      qwe2(index) {
        if (this.qwe[index]) {
          return "✓"
        }
        else {
          console.log("false")
          return " "
        }
      },
      click(index) {
        Vue.set(this.qwe, index, !this.qwe[index])
        console.log(`index: ${index}`, this.qwe[index])
      },
      getCurrentLesson(index) {
        if (new Date().getDay() == 0 || new Date().getDay() == 6)
          return "Сьогодні вихідний"
        else {
          let currentDay = this.nameDays[new Date().getDay()]
          let answer = this.getDataOfCurrentGroup.schedule[currentDay][index]
          // if (answer == "Вікно") {}
          // else
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
  .time {
    display: flex;
    justify-content: space-around;
  }
  .firstTR:hover {
    background: #fff;
  }
</style>