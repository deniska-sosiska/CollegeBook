<template>
  <div class="adminPanel"> 
    <CreateGroup />
    <div class="user"></div>
  </div>  
</template>

<script>
  import CreateGroup from "../components/CreateGroup.vue"

  export default {
    name: "AdminPanel",

    components: {
      CreateGroup
    }    
  }
</script>

<style scoped>
  .adminPanel {
    margin-top: 20px;
  }
</style>