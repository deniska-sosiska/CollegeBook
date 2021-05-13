<template>
  <div class="adminPanel"> 
    <div class="create_group">
      <h2>Додати нову группу</h2>
        <form @submit.prevent="createGroup" class="signIn">
          <div>
            <label for="">Спецiальностi: </label>
            <select v-model="selectedSpecialty">
              <option disabled value="">Варiанти</option>
              <option>А</option>
            </select>
          </div>
          <div>
              <label for="login">Логiн: </label>
              <input id="login" type="text">
          </div>
      </form>
      <!-- <select v-model="selectedSpecialty">
        <option disabled value="">Варiанти</option>
        <option>А</option>
      </select> -->
    </div>
    <div class="user"></div>
  </div>  
</template>

<script>
  export default {
    name: "AdminPanel",

    data: () => ({
      selectedSpecialty: ''
    }),

    methods: {
      createGroup() {
        console.log("create")
      }
    }
    
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


  form {
    margin: 70px auto;
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
</style>