<template>
  <div class="Authorization">
    <form>
        <div>
            <label for="login">Логiн: </label>
            <input id="login" v-model="userLogin" type="text">
        </div>
        <div>
            <label for="pass">Пароль: </label>
            <input id="pass" v-model="userPassword" type="password">
        </div>
        <div v-if="isFake"  style="display: block">
            <p class="isFake">Пароль або логiн не збігаються, спробуйте ще</p>
        </div>
        <div>
            <input type="submit" @click="authorization(); return false;">
        </div>
        <div>
            <p class="forCenter">Ще не зареєстровані? <span>Реєстрація</span></p>
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
        dbAuthorizUrl: 'http://127.0.0.1:3000/registeredUser',
        userLogin: '',
        userPassword: '',
        userRegistered: false,
        isFake: false 
      }
    },
    methods: {
      authorization: function(){
        axios.get(this.dbAuthorizUrl).then((response) => {
          console.log("Перевірка даних в БД...")
          response.data.forEach(registeredUser => {
            if (registeredUser.login == this.userLogin && registeredUser.password == this.userPassword){
              this.userRegistered = true
              this.isFake = false
              console.log("Перевірка успішна")
            }
          })
          if (this.userRegistered == false) {
            console.log("Перевірка неуспішна")
            this.isFake = true
            setTimeout(() => this.isFake = false, 3000)
          }
        })
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
    form > div > input {
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
    span {
      color: #3366ff;
    }
    .isFake {
      color: red;
      text-align: center;
      /* display: none */
    }
</style>