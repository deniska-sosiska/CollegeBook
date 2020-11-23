<template>
  <div class="Authorization">
    <form>
        <div>
            <label for="login">Логiн: </label>
            <input id="login" type="text">
        </div>
        <div>
            <label for="pass">Пароль: </label>
            <input id="pass" type="password">
        </div>
        <div>
            <input type="submit">
        </div>
        <div>
            <p>Ще не зареєстровані? <span>Реєстрація</span></p>
        </div>
    </form>
  </div>
</template>

<script>
  import Vue from 'vue'
  import axios from 'axios'

  export default {
    data () {
      return {}
    },
    mounted: function(){

    }
  }
</script>

<style scoped>
    .Authorization  {
        display: flex;
        justify-content: center;
        /* align-items: center; */
    }
    form {
      width: 500px;
      padding: 20px;
      border-radius: 25px;
      background: #e6f7ff;
    }
    form > div {
      margin-bottom: 20px;
       padding: 0px 20px;
       display: flex;
    }
    form > div > label {
      padding-right: 15px;
      font-size: 19px;
    }
    form > div > input {
      font-size: 17px;
      flex-grow: 3;
    }
</style>