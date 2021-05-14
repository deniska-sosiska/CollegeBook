<template>
  <div class="create_group">
      <h2>Додати нову группу</h2>
      <form @submit.prevent="createGroup()" class="signIn">
        <div>
          <label for="">Спецiальнiсть: </label>
          <select v-model.trim="group.specialtyID" @change="prefix()" required>
            <option disabled value="">Варiанти</option>
            <option 
              v-for="(specialty) in allSpecialties" :key="specialty._id"
              :value="specialty.abbreviation"
            >{{ specialty.name }}</option>
          </select>
        </div>

        <div class="mt">
          <label for="">Назва групи: </label>
          <input v-model.trim="group.name" type="text" :disabled="disabledInput" placeholder="Приклад: РПЗ 17 2/9"  spellcheck="false" required>
        </div>
        <div>
          <label for="">Абревіатура: </label>
          <input v-model.trim="group.abbreviation" :disabled="disabledInput" type="text" placeholder="Приклад: RPZ17_2-9" required>
        </div>

        <div class="mt">
          <label for="">Керiвник групи: </label>
          <input v-model.trim="group.leader" type="text" placeholder="Короткий О.В." required>
        </div>
        <div>
          <label for="">Староста: </label>
          <input v-model.trim="group.headman" type="text" placeholder="Короткий О.В." required>
        </div>
        <div class="studList mt">
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
        <div class="mt">
          <input class="hover" type="submit">
        </div>
        <div 
          v-if="isSucc"
          class="isError"
        ><p> Нову групу успішно додано </p>
        </div>
      </form>
    </div>
</template>

<script>
  import axiosApiInstanse from '../services/axiosApiInstance'
  import { mapGetters } from "vuex"
  

  export default {
    name: "CreateGroup",

    data: () => ({
      student: '',
      indexChange: '',
      inputPlaceholder: 'Додати',

      isSucc: false,

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
      ...mapGetters(['allSpecialties']),

      sortedStud() {
        return this.group.studentsList.sort((a, b) => {
          if (a > b) return 1
          if (a == b) return 0
          if (a < b) return -1
        })
      },

      disabledInput() {
        return !this.group.abbreviation && !this.group.name
      }
    },

    methods: {
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

      async createGroup(form) {
        // console.log("submit: ", this.group )
        await axiosApiInstanse({
          url: "group",
          data: this.group,
          method: "post"
        })

        this.cleanForm()
        this.isSucc = true
        setTimeout(() => {
          this.isSucc = false
        }, 10000)

      },

      prefix() {
        const res = this.allSpecialties.find(spec => spec.abbreviation === this.group.specialtyID)
        this.group.name = `${res.abbreviation_ua} `
        this.group.abbreviation = `${res.abbreviation}`
      },

      cleanForm() {
        this.group.specialtyID = '',
        this.group.name = '',
        this.group.abbreviation = '',
        this.group.leader = '',
        this.group.headman = '',
        this.group.studentsList = []
      }
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

  .studList {
    display: block;
  }
  .studList input {
    width: 100%;
  }
  .studList p#title {
    text-align: center;
    font-size: 21px;
    margin-bottom: 10px;
  }

  .studList > .list {
    padding: 10px 10px 5px 10px;
  }
  .studList > .addStud {
    display: flex;
  }
  .studList > .addStud input {
    font-size: 18px;
    outline: none;
    padding: 4px 6px;
  }
  .studList > .addStud input[type="text"] {
    border: 1px solid #ccc;
  }
  .studList > .addStud input[type="submit"] {
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
  .isError p {
    color: green
  }
</style>