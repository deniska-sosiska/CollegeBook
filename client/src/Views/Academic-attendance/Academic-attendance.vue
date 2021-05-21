<template>
  <div class="table">
    <div class="time">
      <p>Дата: {{getNowDate}}</p>
      <p>День тижня: {{getNowDay}}</p>
      <p>Поточний час: {{getCurrentTime}}</p>
    </div>
    <Preloader v-if="groupLoad" />

    <table v-else>
      <thead>
        <tr class="firstTR"><th>№</th><th>ПІБ</th>
          <th 
            v-for="(lesson, index) in scheduleToday"
            :key="index"
            :class="{ 'emptyPara': !lesson }"
          >
            {{ lesson }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(stud, studIndex) in students" :key="studIndex">
          <td>{{studIndex + 1}}</td><td>{{ stud.name }}</td>
          <td
            v-for="(lesson, paraIndex) in scheduleToday" :key="paraIndex"
            :class="lesson && !weekend ? 'para' : 'emptyPara'"
            @click="mark(studIndex, paraIndex)"
          >
            <p 
              v-if="lesson"
            >{{ students[studIndex].attandance[getNowDate][paraIndex] ?  "✓" :  " " }}</p>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="buttons">
      <p class="hover" @click="submitNewStudents()"  v-if="accountData.name == group.headman">Відправити нові дані</p>
      <router-link class="hover" :to="{ name: 'AcademicAttendanceInfo', params: { specialtyID, groupID }}">Переглянути усю інформацію</router-link>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import axiosApiInstanse from '../../services/axiosApiInstance'

  export default {
    name: "AcademicAttendance",

    props: {
      specialtyID: {
        type: String,
        required: true
      },
      groupID: {
        type: String,
        required: true
      }
    },

    data: () => ({
      nameDays: ["Неділя", "Понеділок","Вівторок","Середа","Четвер","П'ятниця","Субота"],
      months: ["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"],

      group: {},
      students: [],

      groupLoad: true,
      weekend: false,

      qwe: false
    }),

    computed: {
      ...mapGetters(['accountData']),

      getCurrentTime() {  
        let hours = new Date().getHours(); let min = new Date().getMinutes()
        hours < 10 ? hours = '0'+ hours : hours; min < 10 ? min = '0'+ min : min 
        return hours + ':' +  min
      },
      getNowDay() {
        return this.nameDays[new Date().getDay()]
      },
      getNowDate() {  
        let data = new Date().getDate() + '.' + (new Date().getMonth() + 1) + '.' + new Date().getFullYear()
        return data
      },


      scheduleToday() {
        if (this.getNowDay === this.nameDays[0] || this.getNowDay === this.nameDays[6]) {
          this.weekend = true
          return "Сьогодні вихідний"
        }
        return this.group.schedule[this.getNowDay]
      }
    },

    async created() {
      this.group = await axiosApiInstanse({
        url: `group/${this.groupID}`,
        method: "get"
      })

      this.students = await axiosApiInstanse({
        url: `student/studentsByGroup/${this.groupID}`,
        method: "get"
      })


      this.students.forEach(stud => {
        if (!stud.attandance) {
          stud['attandance'] = { "crutch": null }
          stud.attandance[this.getNowDate] = { 0: false, 1: false, 2: false, 3: false }
          delete stud['attandance']["crutch"]
        }

        if (!stud.attandance[this.getNowDate]) {
          stud.attandance[this.getNowDate] = { 0: false, 1: false, 2: false, 3: false }
        }
      })

      console.log(this.students)
      this.groupLoad = false
    },

    methods: {
      mark(studIndex, paraIndex) {
        if (this.accountData.name !== this.group.headman) return
        // якщо не староста

        let stud = this.students[studIndex]
        stud.attandance[this.getNowDate][paraIndex]
        stud.attandance[this.getNowDate][paraIndex] = !stud.attandance[this.getNowDate][paraIndex]
        
        this.$set(this.students, studIndex, stud)
      },

      submitNewStudents() {
        // console.log(this.students)
        for(let stud of this.students) {
          let elem = stud.attandance[this.getNowDate]
          for(let  key in elem) {
            if (!elem[key]) {
              delete elem[key]
            }
          }
          // console.log("elem: ", elem)
          if (Object.keys(elem).length == 0) {
            delete stud.attandance[this.getNowDate]
          }
        }
        
        console.log(this.students)
      }
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
    max-width: 210px;
  }
  .tr > th {
    padding-bottom: 0px;
    border-bottom: solid 1px #ccc;
  }
  td {  
    border-bottom: solid 1px #ccc;
    padding: 10px 10px 4px 10px;
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

    margin-top: 10px;
    padding: 15px;
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

  .emptyPara {
    display: none;
  }
</style>