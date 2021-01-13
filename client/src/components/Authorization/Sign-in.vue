<template>
  <div class="Authorization">
    <form @submit.prevent="authorization" class="signIn">
        <div>
            <label for="login">Логiн: </label>
            <input id="login" v-model="existingUser.userLogin" type="text">
        </div>
        <div>
            <label for="pass">Пароль: </label>
            <input id="pass" v-model="existingUser.userPassword" type="password">
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
  import axios from 'axios'
  import { mapActions } from 'vuex'

  export default {
    data () {
      return {
        existingUser: {
          userLogin: '',
          userPassword: ''
        },
        isFake: false,
      }
    },
    methods: {
      ...mapActions(['fetchCurrentUser']),
      authorization: async function() {
        let userRegistered = await this.fetchCurrentUser(this.existingUser)

        if (userRegistered) {
          this.existingUser.userLogin = this.existingUser.userPassword = '',
          userRegistered = false
          console.log("Перевірка успішна")
          this.$router.push('/')
        }
       
        else {
          console.log("Перевірка неуспішна")
          this.isFake = true
          this.existingUser.userLogin = this.existingUser.userPassword = ''
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