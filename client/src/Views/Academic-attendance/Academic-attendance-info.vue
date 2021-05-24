<template>
  <div class="wrapper">
    <div class="table">
      <div class="time">
        <p>Дата: {{getNowDate}}</p>
        <p>День тижня: {{getNowDay}}</p>
        <p>Поточний час: {{getCurrentTime}}</p>
      </div>

      <Preloader v-if="groupLoad" />
      <table v-else>
        <thead>
          <tr class="firstTR"><th>№</th><th>ПІБ</th><th>Число коли не було</th><th>Прогули у годинах</th><th>Загальна сума прогулів</th></tr>
        </thead>
         <tbody>
          <tr v-for="(stud, studIndex) in students" :key="stud._id">
            <td>{{ studIndex + 1}}</td><td>{{ stud.name }}</td>
            <td class="para">
              <div v-for="(value, key) in stud.attendance" :key="key">
                <p v-if="key">{{ key }}</p>
              </div>
            </td>
            <td class="para">
              <div v-for="(value, key) in stud.attendance" :key="key">
                <p v-if="key">{{ Object.keys(value).length * 2}}</p>
              </div>
            </td>
            <td class="para">
              <p>{{ showAllHours(studIndex) }}</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="buttons">
      <router-link class="hover" :to="{ name: 'AcademicAttendance', params: { specialtyID, groupID }}">Повернутись до журналу</router-link>
    </div>
  </div>
</template>

<script>
  import axiosApiInstanse from '../../services/axiosApiInstance'


  export default {
    name: "AcademicAttendanceInfo", 

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
      students: [],
      groupLoad: true,

      
      dataOfStud: [],
      answer: '',
      arrayAttandance: {}
    }),

    computed: {
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
    },

    async created() {
      this.students = await axiosApiInstanse({
        url: `student/studentsByGroup/${this.groupID}`,
        method: "get"
      })
      this.groupLoad = false
    },

    methods: {
      showAllHours(studIndex) {
        let amountHours = 0
        let attendance = this.students[studIndex].attendance

        if(attendance) {
          for(let day of Object.values(attendance)) {
            amountHours += Object.keys(day).length 
          }
        }
      

        return amountHours * 2
      }
    }
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

    .time {
    display: flex;
    justify-content: space-around;

    margin-top: 10px;
    padding: 15px;
  }


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
  .buttons > p,
  .buttons > a {
    padding: 14px 18px;
    cursor: pointer;
  }
</style>
