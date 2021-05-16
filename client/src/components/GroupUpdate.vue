<template>
  <div class="update__group">
      <h2>Оновити дані по групі</h2>

      <form @submit.prevent="updateGroup()">
        <div>
          <label for="">Спецiальнiсть: </label>
          <select v-model.trim="group.specialtyID" @change="fetchGroups()" required>
            <option disabled value="">Варiанти</option>
            <option 
              v-for="(specialty) in allSpecialties" :key="specialty._id"
              :value="specialty.abbreviation"
            >{{ specialty.name }}</option>
          </select>
        </div>
        <div>
          <label for="">Група: </label>
          <select v-model.trim="groupID" @change="setDataByCurrentGroup()" required :disabled="disabledSelect">
            <option disabled value="">Варiанти</option>
            <option 
              v-for="(group) in groupsByCurrentSpecialty" :key="group._id"
              :value="group.abbreviation"
            >{{ group.name }}</option>
          </select>
        </div>


        <div class="mt">
          <label for="">Керiвник групи: </label>
          <input v-model.trim="group.leader" type="text" placeholder="Короткий О.В." required>
        </div>
        <div>
          <label for="">Староста: </label>
          <input v-model.trim="group.headman" type="text" placeholder="Короткий О.В." required>
        </div>
        <!--  -->
        <!--  -->
        <div class="studAndSheduleList mt">
          <p id="title">Список студентiв</p>
          <div class="list">
            <div
              v-for="(student, index) in sortedStud" :key="index"
              class="stud hover"
            >
              <span class="number">{{ index + 1 }}.</span>
              <p>{{ student }}</p>
              <span @click="changeStud(index)" class="icons" style="color: green;">✏</span>
              <span @click="deleteStud(index)" class="icons">×</span>
            </div>
          </div>
          <form  @submit.stop="pushStud()" class="addStud">
            <input v-model.trim="student" type="text" placeholder="Берков Денис Сергійович">
            <input class="hover" type="submit" :value="inputPlaceholder">
          </form>
        </div>
        <!--  -->
        <!--  -->
        <div class="studAndSheduleList mt">
          <p id="title">Розклад занять</p>
          <div class="list">
            <div
              v-for="(value, day) in schelude" :key="day"
              class="schedule"
            >
              <p class="dayName">{{ day }}</p>
              <div
                v-for="(lesson, index) in value" :key="index"
                class="stud hover"
              >
                <span class="number">{{ index + 1 }}.</span>
                <p>"{{ lesson }}"</p>
                <span @click="changeStud(index)" class="icons" style="color: green;">✏</span>
                <!-- <span @click="deleteStud(index)" class="icons">×</span> -->
              </div>
              
              <!-- <p>{{ student }}</p> -->
             
            </div>
          </div>
          <form  @submit.stop="pushStud()" class="addStud">
            <input v-model.trim="student" type="text" placeholder="Берков Денис Сергійович">
            <input class="hover" type="submit" :value="inputPlaceholder">
          </form>
        </div>
        <!--  -->
        <!--  -->
        <div class="mt">
          <input class="hover" type="submit" value="Підтвердити">
        </div>
        <div 
          v-if="errorMessage"
          class="isError"
          :class="isSucc ? 'succes': '' "
        ><p>{{ errorMessage }}</p>
        </div>
      </form>
    </div>
</template>

<script>
  import axiosApiInstanse from '../services/axiosApiInstance'
  import { mapActions, mapGetters } from "vuex"
  

  export default {
    name: "GroupUpdate",

    data: () => ({
      student: '',
      indexChange: '',
      inputPlaceholder: 'Додати',
      groupID: '',

      isSucc: false,
      isError: false,
      notFoundGroupsMes: 'Ця спеціальність на даний момент не має груп',
      errorMessage: '',

      schelude: {
        "Понеділок": [ '', '', '', '' ],
        "Вівторок": [ '', '', '', '' ],
        "Середа": [ '', '', '', '' ],
        "Четверг": [ '', '', '', '' ],
        "П'ятниця": [ '', '', '', '' ]
      },

      group: {
        specialtyID: '',
        name: '',
        abbreviation: '',
        leader: '',
        headman: '',

        studentsList: []
      }
    }),

    computed: {
      ...mapGetters(['allSpecialties', 'groupsByCurrentSpecialty']),

      sortedStud() {
        return this.group.studentsList.sort((a, b) => {
          if (a > b) return 1
          if (a == b) return 0
          if (a < b) return -1
        })
      },

      disabledInput() {
        return !this.group.abbreviation && !this.group.name
      },
      disabledSelect() {
        return !this.group.specialtyID || this.isError
      }
    },

    methods: {
      ...mapActions(['fetchGroupsBySpecialtyID']),

      async fetchGroups() {
        this.isError = false
        this.group.leader = this.group.headman = this.groupID = ''
        this.group.studentsList = []

        try {
          await this.fetchGroupsBySpecialtyID(this.group.specialtyID)
        } catch (err) {
          this.throwErrorMessage(this.notFoundGroupsMes)
          this.isError = true
        }
      },

      setDataByCurrentGroup() {
        this.group = this.groupsByCurrentSpecialty.find(elem => elem.abbreviation === this.groupID)
      },

      async updateGroup() {
        this.group.__v += 1

        await axiosApiInstanse({
          url: `group/${this.group._id}`,
          data: this.group,
          method: "put"
        })

        this.cleanForm()

        this.throwErrorMessage("Групу успішно оновлено")
        this.isSucc = true
        setTimeout(() => {
          this.isSucc = false
        }, 4000)
      },

      pushStud() {
        if (!this.student) 
          return 

        if (this.inputPlaceholder !== "Додати") {
          this.inputPlaceholder = "Додати"
          this.$set( this.group.studentsList, this.indexChange, this.student)
        }
        else {
          this.$set( this.group.studentsList, this.group.studentsList.length, this.student)
        }
        this.student = ''
      },
      
      changeStud(index) {
        this.inputPlaceholder = "Замiнити"
        this.indexChange = index
        this.student = this.group.studentsList[index]
      },

      deleteStud(index) {
        this.inputPlaceholder = "Додати"
        this.student = ''
        this.$delete(this.group.studentsList, index)
      },


      prefix() {
        const res = this.allSpecialties.find(spec => spec.abbreviation === this.group.specialtyID)
        this.group.name = `${res.abbreviation_ua} `
        this.group.abbreviation = `${res.abbreviation}`
      },

      cleanForm() {
        this.group.specialtyID = '',
        this.groupID = '',
        this.group.name = '',
        this.group.abbreviation = '',
        this.group.leader = '',
        this.group.headman = '',
        this.group.studentsList = []
      },

      throwErrorMessage(mes) {
        this.errorMessage = ''
        this.errorMessage = mes
        setTimeout(() => {
          this.errorMessage = ''
        }, 4000)
      },
    }
  }
</script>

<style scoped>
  @import url("../assets/style.css");

  form.addStud {
    border: 0px; 
    margin: 0;
    padding: 0;
    width: 100%;
  }

  .studAndSheduleList {
    display: block;
  }
  .studAndSheduleList input {
    width: 100%;
  }
  .studAndSheduleList p#title {
    text-align: center;
    font-size: 21px;
    margin-bottom: 10px;
  }

  .studAndSheduleList > .list {
    padding: 10px 10px 5px 10px;
  }
  .studAndSheduleList > .addStud {
    display: flex;
  }
  .studAndSheduleList > .addStud input {
    font-size: 18px;
    outline: none;
    padding: 4px 6px;
  }
  .studAndSheduleList > .addStud input[type="text"] {
    border: 1px solid #ccc;
  }
  .studAndSheduleList > .addStud input[type="submit"] {
    width: 120px;
  }



  .stud {
    font-size: 18px;
    /* border: 1px solid red; */
    display: flex;
    line-height: 22px;
  }
  .stud > span.number {
    min-width: 25px;
    /* font-size: 18px; */
    display: inline-block;
  }
  
  .stud > .icons {
    font-size: 30px;
    color: red;
    cursor: pointer;
    margin-left: 5px;
    line-height: 22px;
  }
  .stud p {
    flex-grow: 2;
    font-size: 18px;
  }
  .stud p:last-child {
    margin-bottom: 0px;
  }

  .mt {
    margin-top: 30px !important;
  }
  .hover {
    padding: 4px 6px;
    cursor: default;
  }
  .isError.succes p {
    color: green 
  }

  .dayName {
    text-align: center;
    font-size: 18px;
    margin: 5px 0px 10px 0px;
  }
</style>