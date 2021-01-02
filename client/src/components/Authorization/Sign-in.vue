<template>
  <div class="Authorization">
    <form @submit.prevent="authorization" class="signIn">
        <div>
            <label for="login">Логiн: </label>
            <input id="login" v-model="currentUser.userLogin" type="text">
        </div>
        <div>
            <label for="pass">Пароль: </label>
            <input id="pass" v-model="currentUser.userPassword" type="password">
        </div>
        <div v-if="isFake"  style="display: block; margin-bottom: 5px;">
            <p class="isFake">Пароль або логiн не збігаються, спробуйте ще</p>
        </div>
        <div>
            <input type="submit">
        </div>
        <div>
            <p class="forCenter">Ще не зареєстровані? <router-link :to="'/Authorization/signUP'" class="regist">Реєстрація</router-link></p>
        </div>
    </form>
  </div>
</template>

<script>
  import Vue from 'vue'
  import axios from 'axios'

  export default {
    data () {
      return {
        currentUser: {
          userLogin: '',
          userPassword: '',
          userRegistered: false,
        },
        isFake: false,
      }
    },
    computed: {
      getRegisteredUser: function(){
        return this.$store.getters.getRegisteredUser
      }    
    },
    mounted(){
      this.$store.dispatch('setAllRegisteredUser')
    },
    methods: {
      authorization: function() {
        this.getRegisteredUser.forEach(registeredUser => {
          if ((registeredUser.login == this.currentUser.userLogin) && 
            (registeredUser.password == this.currentUser.userPassword)){
              this.currentUser.userRegistered = true
              this.currentUser.userLogin = this.currentUser.userPassword = '',
              console.log("Перевірка успішна")
              let currentUser = {
                login: registeredUser.login,
                password: registeredUser.password,
                role: registeredUser.role
              }
              console.log(registeredUser)
              this.$store.commit('setCurrentUser', currentUser)
              this.$router.push('/')
            }
        })
        if (!this.currentUser.userRegistered) {
          console.log("Перевірка неуспішна")
          this.isFake = true
          this.currentUser.userRegistered = false
          this.currentUser.userLogin = this.currentUser.userPassword = ''
          setTimeout(() => this.isFake = false, 3000)
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
    form > div > label {
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
    .regist {
      color: #3366ff;
      cursor: pointer;
    }
    .isFake {
      color: red;
      text-align: center;
      margin: 0 auto;
      /* display: none */
    }
</style>