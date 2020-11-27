<template>
  <div class="Authorization">
    <signIn v-if="!registerNewUser" @newUserWantsToRegister="newUserWantsToRegister(registerNewUser)" />
    <signUP v-else />
  </div>
</template>

<script>
  import Vue from 'vue'
  import axios from 'axios'

  import signIn from "./Sign-in.vue"
  import signUP from "./Sign-up.vue"

  export default {
    components: {
      signIn,
      signUP
    },
    data () {
      return {
        registerNewUser: false,
      }
    },
    methods: {
      newUserWantsToRegister: function(registerNewUser){
        this.registerNewUser = true
      }
    }
  }
</script>

<style>
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
      /* display: none */
    }
</style>