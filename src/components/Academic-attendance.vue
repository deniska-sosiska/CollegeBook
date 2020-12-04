<template>
  <div class="table">
    <div class="time" style="padding-top: 10px;">
      <p>Дата: {{getNowDate}}</p>
      <p>День неділі: {{getNowDay}}</p>
      <p>Поточний час: {{getCurrentTime}}</p>
    </div>
    <table>
      <thead>
          <!-- <tr class="tr"><th style="border: 0px;" colspan="2"> </th>
          <th>1 Пара</th><th>2 Пара</th><th>3 Пара</th><th>4 Пара</th> ✓-->
        <!-- </tr> -->
        <tr><th>№</th><th>ПІБ</th>
          <th>{{getCurrentLesson(1)}}</th>
          <th>{{getCurrentLesson(2)}}</th>
          <th>{{getCurrentLesson(3)}}</th>
          <th>{{getCurrentLesson(4)}}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(student, index) in getDataOfCurrentGroup.students" :key="index">
          <td>{{++index}}</td><td>{{student.name}}</td>
          <td class="para" @click="click(0)" v-if="qwe[0]">✓</td>
          <td class="para" @click="click(0)" v-else> </td>

          <td class="para" @click="click(1)" v-if="qwe[1]">✓</td>
          <td class="para" @click="click(1)" v-else> </td>

          <td class="para" @click="click(2)" v-if="qwe[2]">✓</td>
          <td class="para" @click="click(2)" v-else> </td>

          <td class="para" @click="qwe[3] = !qwe[3]" v-if="qwe[3]">✓</td>
          <td class="para" @click="qwe[3] = !qwe[3]" v-else> </td>



          <!-- <td class="para" @click="click(0)">{{qwe2(0)}}</td>
          <td class="para" @click="click(1)">{{qwe2(1)}}</td>
          <td class="para" @click="click(2)">{{qwe2(2)}}</td>
          <td class="para" @click="click(3)">{{qwe2(3)}}</td> -->

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
      getNowDate() {  return new Date().getDate() + '.' + new Date().getMonth() + '.' + new Date().getFullYear()  },
      getDataOfCurrentGroup(){  return this.$store.getters.getDataOfCurrentGroup  }
    },
    mounted: function() {
      let box = {"specialty": this.specialty, "group": this.group}
      this.$store.dispatch('updateDataOfCurrentGroup', box)
    },
    methods: {
      qwe2(index) {
        if (this.qwe[index]) {
          console.log(this.qwe[index])
          return "✓"
        }
        else {
          console.log("false")
          return " "
        }
      },
      click(index) {
        this.qwe[index] = !this.qwe[index]
        console.log(`index: ${index}`, this.qwe[index])
      },
      getCurrentLesson(index) {
        if (new Date().getDay() == 0 || new Date().getDay() == 6)
          return "Сьогодні вихідний"
        else {
          let currentDay = this.nameDays[new Date().getDay()]
          let answer = this.getDataOfCurrentGroup.schedule[currentDay][index]
          if (answer == "Вікно") 
            return answer
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
    margin-top: 10px;
    padding: 20px 40px;
    border: 1px solid #ccc;
    border-radius: 25px;
  }
  th {
    padding: 0px 10px;
    padding-bottom: 15px;
  }
  .tr > th {
    padding-bottom: 0px;
    border-bottom: solid 1px #ccc;
  }
  td {  
    border-bottom: solid 1px #ccc;
    padding: 0 20px 5px 20px;
  }
  .para {
    padding: 0xp 0px;
    text-align: center;
  }
  .time {
    display: flex;
    justify-content: space-around;
  }
</style>