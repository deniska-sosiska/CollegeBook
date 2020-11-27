<template>
    <form @submit.prevent="authorization" class="signIn">
        <div>
            <label for="login">Логiн: </label>
            <input id="login" v-model="currentUser.userLogin" type="text">
        </div>
        <div>
            <label for="pass">Пароль: </label>
            <input id="pass" v-model="currentUser.userPassword" type="password">
        </div>
        <div v-if="isFake"  style="display: block">
            <p class="isFake">Пароль або логiн не збігаються, спробуйте ще</p>
        </div>
        <div>
            <input type="submit">
        </div>
        <div>
            <p class="forCenter">Ще не зареєстровані? <span class="regist" @click="newUserWantsToRegister()">Реєстрація</span></p>
        </div>
    </form>
</template>

<script>
  import Vue from 'vue'
  import axios from 'axios'

  export default {
    data () {
      return {
        dbAuthorizUrl: 'http://127.0.0.1:3000/registeredUser',
        currentUser: {
          userLogin: '',
          userPassword: '',
          userRegistered: false,
        },
        isFake: false,
        
        list: [
          "Студент",
          "Староста групи",
          "Вчитель"
        ]
      }
    },
    methods: {
      authorization: function(){
        axios.get(this.dbAuthorizUrl).then((response) => {
          console.log("Перевірка даних в БД...")

          response.data.forEach(registeredUser => {
            if ((registeredUser.login == this.currentUser.userLogin) &&
              (registeredUser.password == this.currentUser.userPassword)){
                this.currentUser.userRegistered = true
                this.isFake = false
                console.log("Перевірка успішна")
            }
          })
          if (!this.currentUser.userRegistered) {
            console.log("Перевірка неуспішна")
            this.isFake = true
            setTimeout(() => this.isFake = false, 3000)
          }
        })
      },
      newUserWantsToRegister: function(){
        this.$emit("newUserWantsToRegister", true)
      },
      qwe: function(){
        console.log("hi")
      }
    }
  }
</script>