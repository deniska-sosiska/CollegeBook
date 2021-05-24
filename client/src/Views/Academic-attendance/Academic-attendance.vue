<template>
  <div class="wrapper">
    <div class="table">
    <div class="time">
      <p>Дата: {{getNowDate}}</p>
      <p>День тижня: {{getNowDay}}</p>
      <p>Поточний час: {{getCurrentTime}}</p>
    </div>
    
    <Preloader v-if="groupLoad && !errorMess" />
    <Preloader v-if="groupLoad && errorMess" str="Потрібно додати розклад занять" />

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
            >{{ students[studIndex].attendance[getNowDate][paraIndex] ?  "✓" :  " " }}</p>
          </td>
        </tr>
      </tbody>
    </table>
    </div>
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

      errorMess: false
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
        try {
          return this.group.schedule[this.getNowDay]
        } catch (err) {
          this.errorMess = true
          this.groupLoad = true
        }
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
        if (!stud.attendance) {
          stud['attendance'] = { "crutch": null }
          stud.attendance[this.getNowDate] = { 0: false, 1: false, 2: false, 3: false }
          delete stud['attendance']["crutch"]
        }

        if (!stud.attendance[this.getNowDate]) {
          stud.attendance[this.getNowDate] = { 0: false, 1: false, 2: false, 3: false }
        }
      })

      this.groupLoad = false
    },

    methods: {
      mark(studIndex, paraIndex) {
        if (this.accountData.name !== this.group.headman) return  
        // якщо не староста

        let stud = this.students[studIndex]
        stud.attendance[this.getNowDate][paraIndex]
        stud.attendance[this.getNowDate][paraIndex] = !stud.attendance[this.getNowDate][paraIndex]
        
        this.$set(this.students, studIndex, stud)
      },

      async submitNewStudents() {
        for(let stud of this.students) {
          let elem = stud.attendance[this.getNowDate]
          for(let  key in elem) 
            if (!elem[key]) 
              delete elem[key]

          if (Object.keys(elem).length == 0)
            delete stud.attendance[this.getNowDate]
        }
        this.groupLoad = true

        await axiosApiInstanse({
          url: 'student/studentsUpdate',
          data: this.students,
          method: "put"
        })

        this.$router.push({ name: "AcademicAttendanceInfo", params: { specialtyID: this.specialtyID, groupID: this.groupID }})
      },
    },
  }
</script>

<style scoped>
  .wrapper {
    min-height: 90vh;
    display: flex;
    flex-direction: column;
  }
  .table {
    flex: 1 0 auto;
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
  tr {
    line-height: 28px;
  }
  .para {
    text-align: center;
    font-size: 16px;
  }
  .para > p {
    font-size: 24px;
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
    flex: 0 0 auto;

    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    margin: 20px 80px;
  }
  .buttons > p,
  .buttons > a {
    padding: 14px 18px;
    cursor: pointer;
  }

  .emptyPara {
    display: none;
  }
</style>