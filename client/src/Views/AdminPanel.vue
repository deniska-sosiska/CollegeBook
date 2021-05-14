<template>
  <div class="adminPanel"> 
    <div class="buttons">
      <button 
        @click="flag = true"
        :class="flag ? 'active' : 'notActive'"
        class="hover"
      >
        Додати
      </button>
      <button 
        @click="flag = false"
        :class="!flag ? 'active' : 'notActive'"
        class="hover"
      >
        Оновити
      </button>
    </div>
    
    <GroupCreate v-if="flag" />
    <GroupUpdate v-else />
  </div>  
</template>

<script>
  import GroupCreate from "../components/GroupCreate.vue"
  import GroupUpdate from "../components/GroupUpdate.vue"

  export default {
    name: "AdminPanel",

    components: {
      GroupCreate,
      GroupUpdate
    },

    data: () => ({
      flag: true
    }),
  }
</script>

<style scoped>
  .adminPanel {
    margin-top: 20px;
  }
  .buttons {
    display: flex;
    justify-content: space-between;

    width: 600px;
    margin: 10px auto;
  }
  .buttons button {
    font-size: 30px;
    width: 49%;
    transition: ease-out 0.5s;
    padding: 10px 30px;
    background: aliceblue;
    outline: none;
  }
  .buttons button.active {
    width: 58%;
    border: 1px solid #ccc;
    background: #e6f7ff;
  }
  .buttons button.notActive {
    width: 40%;
  }

  .buttons button:hover {
    background: #e6f7ff;
    /* # */
    /* border: 1px solid #ccc; */

  }
</style>