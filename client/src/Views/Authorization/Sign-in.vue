<template>
  <div class="Authentication">
    <form @submit.prevent="authentication" class="signIn">
        <div>
            <label for="login">Логiн: </label>
            <input id="login" v-model.trim="formAccountData.userLogin" type="text">
        </div>
        <div>
            <label for="pass">Пароль: </label>
            <input id="pass" v-model.trim="formAccountData.userPassword" type="password">
        </div>
        <div v-if="isError"  class="isError">
            <p>{{ errorMessage }}</p>
        </div>
        <div>
            <input class="hover" type="submit">
        </div>
        <div>
            <p class="forCenter">Ще не зареєстровані?
              <router-link :to="{ name: 'SignUp' }"> <span>Реєстрація</span> </router-link>
            </p>
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
      isError: false,
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
        this.isError = true
        this.errorMessage = mes
        setTimeout(() => this.isError = false, 3000)
      }
    }
  }
</script>

<style scoped>
  @import url("../../assets/style.css");

  form {
    margin: 70px auto;
  }

  .forCenter span {
    color: #3366ff;
    cursor: pointer;
  }

  .isError {
    margin-bottom: 5px;
  }
</style>