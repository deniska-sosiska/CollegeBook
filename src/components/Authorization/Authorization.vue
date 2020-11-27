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