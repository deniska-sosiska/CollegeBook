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
      return {}
    },
    methods: {
      authorization: function(){
        console.log("gi")
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
</style>