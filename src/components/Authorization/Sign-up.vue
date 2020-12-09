<template>
  <div class="Authorization">
    <form class="signUp">
      <template class="first" v-if="first">
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
            <select v-model="newUser.role.specialty" @change="updateDataOfCurrentSpecialty()" style="width: 240px;" required>
              <option disabled value="">Варiанти</option>
              <option v-for="(value, name, index) in dataOfGroups" :key="index" :value="value.id">{{value.name}}</option>
            </select>
          </div>
        </template>
        <template v-if="(newUser.role.specialty && newUser.role.name != list[2])">
          <div>
            <label for="">Ваша група: </label>
            <select v-model="newUser.role.group" required  style="width: 240px;">
              <option disabled value="">Варiанти</option>
              <option v-for="(value, index) in getDataOfCurrentSpecialty.groups" :key="index" :value="value.nameGroup">{{value.nameGroup}}</option>
            </select>
          </div>
        </template>
        <div class="inputs" style="margin-top: 30px;">
          <input type="button" value="Відмінити реєстрацію" @click="$router.push('/Authorization/')" style="margin-right:10px;">
          <input type="button" value="Продовжити" @click="isFirst()" style="margin-left:10px;">
        </div>
        <div v-if="isFake"  style="display: block; margin-bottom: 0px;">
            <p class="isFake">Спочатку оберіть усі свої дані</p>
        </div>
      </template>

      <template class="second" v-if="second">
        <div>
          <label for="newName">ПІБ: </label>
          <input id="newName" v-model="newUser.name" placeholder="Ім'я має збігатися з журналом" type="text" required>
        </div>
        <div>
          <label for="newEmail">Email: </label>
          <input id="newEmail" v-model="newUser.email" placeholder="BoBa@example.com" type="email" required>
        </div>
        <div>
          <label for="newLogin">Логiн: </label>
          <input id="newLogin" v-model="newUser.login" placeholder="Наприклад: ßØß4uK" type="text" required>
        </div>
        <div>
          <label for="newPassword">Пароль: </label>
          <input id="newPassword" v-model="newUser.password" placeholder="Наприклад: q1w2e3_BOBA" type="password" required>
        </div>
        <div class="inputs" style="margin-top: 30px;">
          <input type="button" value="Відмінити реєстрацію" @click="$router.push('/Authorization/')" style="margin-right:10px;">
          <input type="button" value="Повернутися" @click="() => {this.second = false; this.first = true}" style="margin-left:10px;">
        </div>
        <div>
          <input type="submit" value="Зареєструватися" @click="registred(); return false;">
        </div>
          <div v-if="isFake"  style="display: block; margin-bottom: 0px;">
            <p class="isFake">Спочатку оберіть усі свої дані</p>
        </div>
      </template>
      </form>
    </div>
</template>

<script>
  import Vue from 'vue'
  import axios from 'axios'

  export default {
    data () {
      return {

        first: true,
        second: false,
        isFake: false,

        list: [
          "Студент",
          "Староста групи",
          "Вчитель"
        ],

        newUser: {
          "name": '',
          "role": {
            "name": '',
            "specialty": '',
            "group": ''
          },
          "login": '',
          "password": '',
          "email": '',
          "id": new Date().getTime()
        },

      dataOfGroups: {}
      }
    },
    computed: {
      getDataOfCurrentSpecialty: function() {
        return this.$store.getters.getDataOfCurrentSpecialty
      }
    },
    mounted: function() {
      this.dataOfGroups = this.$store.getters.getDataOfSpecialty
    },
    methods:{
      registred: function() {
        if (!this.newUser.password || !this.newUser.login || !this.newUser.name || !this.newUser.email) {
          this.isFake = true
          setTimeout(() => {
            this.isFake = false
          }, 3000);
        }
        else {
          this.$store.dispatch('setNewRegisteredUser', this.newUser)
          this.$store.commit('setCurrentUser', {
            "login": this.newUser.login, 
            "password": this.newUser.password
          })
          this.$router.push('/')
        }
      },
      updateDataOfCurrentSpecialty: function() {
        this.$store.dispatch('updateDataOfCurrentSpecialty', this.newUser.role.specialty)
      },
      isFirst: function() {
        if (!this.newUser.role.name) {
          this.isFake = true
          setTimeout(() => {
            this.isFake = false
          }, 3000);
        }
        else if ((this.newUser.role.name == this.list[0] || this.newUser.role.name == this.list[1]) && 
                (!this.newUser.role.group)){
          this.isFake = true
          setTimeout(() => {
            this.isFake = false
          }, 3000);
        }
        else {
          this.first = false
          this.second = true
        }
        
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
    .isFake {
      color: red;
      text-align: center;
      margin: 0 auto;
      /* display: none */
    }
</style>