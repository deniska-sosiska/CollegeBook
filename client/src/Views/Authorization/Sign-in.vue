<template>
  <div class="Authentication">
    <form @submit.prevent="authentication" class="signIn">
        <div>
            <label for="login">Логiн: </label>
            <input id="login" v-model="formAccountData.userLogin" type="text">
        </div>
        <div>
            <label for="pass">Пароль: </label>
            <input id="pass" v-model="formAccountData.userPassword" type="password">
        </div>
        <div v-if="isFake"  style="display: block; margin-bottom: 5px;">
            <p class="isFake">{{ errorMessage }}</p>
        </div>
        <div>
            <input type="submit">
        </div>
        <div>
            <p class="forCenter">Ще не зареєстровані? <router-link :to="{ name: 'SignUp' }" class="regist">Реєстрація</router-link></p>
        </div>
    </form>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'

  export default {
    name: "SignIn",

    data: () => ({
      formAccountData: {
        userLogin: 'denisAdmin',
        userPassword: '2001'
      },
      isFake: false,
      errorMessage: ''
    }),
    methods: {
      ...mapActions(['getAccountData']),

      async authentication() {

        if (this.formAccountData.userLogin && this.formAccountData.userPassword) {
          try {
            await this.getAccountData({ 
              login: this.formAccountData.userLogin,
              password: this.formAccountData.userPassword
            })

            this.$router.push('/')
          } catch(err) {
            this.showErrorMessage("Пароль або логiн не збігаються, спробуйте ще")
          }
        } else {
          this.showErrorMessage("Заповніть всі поля")
        }
      },

      showErrorMessage(mes) {
        this.formAccountData.userLogin = this.formAccountData.userPassword = ''
        this.isFake = true
        this.errorMessage = mes
        setTimeout(() => this.isFake = false, 3000)
      }
    }
  }
</script>

<style scoped>
    .Authentication  {
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