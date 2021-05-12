<template>
  <div class="adminPanel"> 
    <div class="create_group">
      <h2>Додати нову группу</h2>
      <select v-model="selectedSpecialty">
        <option disabled value="">Варiанти</option>
        <option>А</option>
        <option>Б</option>
        <option>В</option>
      </select>
    </div>
    <div class="user"></div>
  </div>  
</template>

<script>
  export default {
    name: "AdminPanel",

    data: () => ({
      selectedSpecialty: ''
    })
    
  }
</script>

<style scoped>
  .adminPanel {
    /* border: 1px solid; */
    margin-top: 20px;
  }
  h2 {
    /* border: 1px solid; */
    text-align: center;
    padding: 20px;
  }
</style>