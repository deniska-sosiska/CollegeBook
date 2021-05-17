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
            :class="!lesson ? 'emptyPara' : '' "
          >
            {{ lesson }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(stud, index) in group.studentsList" :key="index">
          <td>{{index + 1}}</td><td>{{ stud }}</td>
          <td
            v-for="(lesson, index) in scheduleToday" :key="index"
            :class="lesson && !weekend ? 'para' : 'emptyPara'"
          >
            <p v-if="lesson">{{ para(true) }}</p>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- <div class="buttons"> -->
      <!-- <p class="hover" @click="submit"  v-if="getUser.role.name == 'Староста групи'">Відправити нові дані</p> -->
      <!-- <router-link class="hover" :to="'/' + specialty + '/' + group + '/AcademicAttendance/info'">Переглянути усю інформацію</router-link> -->
    <!-- </div> -->
  </div>
</template>

<script>
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
      nameDays: ["Понеділок","Вівторок","Середа","Четвер","П'ятниця","Субота", "Неділя"],
      months: ["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"],

      group: {},
      groupLoad: true,
      weekend: false
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


      scheduleToday() {
        if (this.getNowDay === this.nameDays[5] || this.getNowDay === this.nameDays[6]) {
          this.weekend = true
          return "Сьогодні вихідний"
        }

        return this.group.schedule[this.getNowDay]
      }
    },

    async created() {
      const currentGroup = await axiosApiInstanse({
        url: `group/${this.groupID}`,
        method: "get"
      })

      this.group = currentGroup
      this.groupLoad = false


      // let box = {"specialty": this.specialty, "group": this.group}
      // this.$store.dispatch('updateDataOfCurrentGroup', box)

      // this.getDataOfStud.forEach((elem, index) => {
      //   if (!elem.attandance[this.getNowDate]) {
      //     let data = {indexStud: index ,info: {"first": false, "second": false, "third": false, "fourth": false}}
      //     this.$store.dispatch('updateStud', data)
      //   }
      // })
      // setTimeout(() => {
      //   this.dataOfStud = this.getDataOfStud
      // }, 80)
    },

    methods: {
      para(data) {
        return !data ?  "✓" :  " "
      },
      changeAttandance(indexStud, indexPara) {
        this.dataOfStud[indexStud].attandance[this.getNowDate][indexPara] 
        = !this.dataOfStud[indexStud].attandance[this.getNowDate][indexPara]
      },
      submit() {
        this.$store.dispatch('changeAttandance', this.dataOfStud)
      },

      
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