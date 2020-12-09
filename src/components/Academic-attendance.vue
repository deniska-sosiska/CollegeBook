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
        <tr v-for="(stud, index) in dataOfStud" :key="index">
          <td>{{index + 1}}</td><td>{{stud.name}}</td>
          <td class="para" @click="changeAttandance(index, 'first')">{{zxc(stud.attandance[getNowDate].first)}}</td>
          <td class="para" @click="changeAttandance(index, 'second')">{{zxc(stud.attandance[getNowDate].second)}}</td>
          <td class="para" @click="changeAttandance(index, 'third')">{{zxc(stud.attandance[getNowDate].third)}}</td>
          <td class="para" @click="changeAttandance(index, 'fourth')">{{zxc(stud.attandance[getNowDate].fourth)}}</td>
        </tr>
      </tbody>
    </table>
    <div class="buttons">
      <p class="hover" @click="submit"  v-if="getUser.role.name == 'Староста групи'">Відправити нові дані</p>
      <router-link class="hover" :to="'/' + specialty + '/' + group + '/AcademicAttendance/info'">Переглянути усю інформацію</router-link>
    </div>
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
        qwe: [true, false, false, false],
        dataOfStud: []
      }
    },
    computed: {
      getUser() {
        return this.$store.getters.getUser 
      },
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
      getDataOfCurrentGroup(){  //для пар
        return this.$store.getters.getDataOfCurrentGroup
      },
      getDataOfStud(){
        return this.$store.getters.getDataOfStud
      }
    },
    mounted: function() {
      let box = {"specialty": this.specialty, "group": this.group}
      this.$store.dispatch('updateDataOfCurrentGroup', box)

      this.getDataOfStud.forEach((elem, index) => {
        if (!elem.attandance[this.getNowDate]) {
          let data = {indexStud: index ,info: {"first": false, "second": false, "third": false, "fourth": false}}
          this.$store.dispatch('updateStud', data)
        }
      })
      setTimeout(() => {
        this.dataOfStud = this.getDataOfStud
      }, 80)
    },
    methods: {
      zxc(data) {
        let response  = data ?  "✓" :  " "
        return response
      },
      changeAttandance(indexStud, indexPara) {
        this.dataOfStud[indexStud].attandance[this.getNowDate][indexPara] 
        = !this.dataOfStud[indexStud].attandance[this.getNowDate][indexPara]
      },
      submit() {
        this.$store.dispatch('changeAttandance', this.dataOfStud)
      },
      getCurrentLesson(index) {
        if (new Date().getDay() == 0 || new Date().getDay() == 6)
          return "Сьогодні вихідний"
        else {
          let currentDay = this.nameDays[new Date().getDay()]
          
          let answer = this.getDataOfCurrentGroup.schedule[currentDay][index]
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
  .buttons {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin: 20px 20px;
  }
  .buttons > p,
  .buttons > a {
    padding: 4px 8px;
    cursor: pointer;
  }
</style>