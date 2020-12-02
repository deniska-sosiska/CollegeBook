<template>
  <div class="Authorization">
    <form class="signUp">
      <template>
        <div>
          <label for="">Ваша "роль": </label>
          <select v-model="newUser.role.name" required>
            <option disabled value="">Варiанти</option>
            <option v-for="(value, index) in list" :key="index" :value="value">{{value}}</option>
          </select>
        </div>
        <template v-if="newUser.role.name == list[0] || newUser.role.name == list[1]">
          <div>
            <label for="">Cпеціальність: </label>
            <select v-model="newUser.role.specialty" @change="updateDataOfCurrentGroup()" style="width: 240px;" required>
              <option disabled value="">Варiанти</option>
              <option v-for="(value, name, index) in dataOfGroups" :key="index" :value="value.id">{{value.name}}</option>
            </select>
          </div>
        </template>
        <template v-if="newUser.role.specialty">
          <div>
            <label for="">Ваша група: </label>
            <select v-model="newUser.role.group" required  style="width: 240px;">
              <option disabled value="">Варiанти</option>
              <option v-for="(value, name, index) in getDataOfCurrentGroup.groups" :key="index" :value="name">{{name}}</option>
            </select>
          </div>
        </template>
        <div class="inputs">
          <input type="button" value="Відмінити реєстрацію" @click="$router.push('/Authorization/')" style="margin-right:10px;">
          <input type="button" value="Продовжити" style="margin-left:10px;">
        </div>
      </template>
      <template>
        
      </template>
      <template>
        
      </template>
        <!-- <div>
          <label for="newName">ПІБ: </label>
          <input id="newName" placeholder="Ім'я має збігатися з журналом" type="text" required>
        </div>
        <div>
          <label for="newEmail">Email: </label>
          <input id="newEmail"  placeholder="BoBa@example.com" type="email" required>
        </div>
        <div>
          <label for="newLogin">Логiн: </label>
          <input id="newLogin" placeholder="Наприклад: ßØß4uK" type="text" required>
        </div>
        <div>
          <label for="newPassword">Пароль: </label>
          <input id="newPassword"  placeholder="Наприклад: q1w2e3_BOBA" type="password" required>
        </div> -->

        <!-- <div>
          <input type="submit" @click="qwe(); return false;" value="Зареєструватися">
        </div> -->
      </form>
    </div>
</template>

<script>
  import Vue from 'vue'
  import axios from 'axios'

  export default {
    data () {
      return {
        
        list: [
          "Студент",
          "Староста групи",
          "Вчитель"
        ],

        newUser: {
          name: '',
          role: {
            name: '',
            specialty: '',
            group: '',
            subject: ''
          },
          login: '',
          password: ''
        },

      // {
      //   "login": "s",
      //   "password": "s",
      //   "name": "Берков Д.С.",
      //   "role": {
      //     "name": "student",
          // "specialty": "RPZ",
      //     "groupName": "RPZ 17 2/9"
      //   }
      // }



      dataOfGroups: {}
      }
    },
    computed: {
      
      getDataOfCurrentGroup: function() {
        return this.$store.getters.getDataOfCurrentGroup
      }
    },
    mounted: function() {
      this.dataOfGroups = this.$store.getters.getDataOfGroups
      // console.log(this.dataOfGroups)
    },
    methods:{
      updateDataOfCurrentGroup: function() {
        this.$store.dispatch('updateDataOfCurrentGroup', this.newUser.role.specialty)
      }
    }
  }
</script>

<style scoped>
    .Authorization  {
        display: flex;
        justify-content: center;
    }
    form {
      margin-top: 70px;
      width: 500px;
      padding: 30px 20px;
      border-radius: 25px;
      border: 1px solid #ccc;
    }
    form > div {
      margin-bottom: 15px;
      padding: 0px 20px;
      display: flex;
    }
    form > div:last-child {
      margin: 0px;
    }
    form >  div > label {
      padding-right: 15px;
      font-size: 19px;
    }
    form > div > input,
    form > div > select {
      font-size: 17px;
      flex-grow: 3;
    }
    input {
      padding: 2px 0px 0px 0px;
    }
    .forCenter {
      font-size: 16px;
      padding: 0px 57px;
    }
</style>