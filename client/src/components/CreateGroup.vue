<template>
  <div class="create_group">
      <h2>Додати нову группу</h2>
        <form @submit.prevent="createGroup" class="signIn">
          <div>
            <label for="">Спецiальнiсть: </label>
            <select v-model="group.specialtyID">
              <option disabled value="">Варiанти</option>
              <option v-for="(specialty) in allSpecialties" :key="specialty._id">{{ specialty.name }}</option>
            </select>
          </div>

          <div class="mt">
            <label for="">Назва групи: </label>
            <input v-model="group.name" type="text" placeholder="Приклад: РПЗ 17 2/9">
          </div>
          <div>
            <!-- abbreviation -->
            <label for="">Абревіатура: </label>
            <input v-model="group.abbreviation" type="text" placeholder="Приклад: RPZ17_2-9">
          </div>

          <div class="mt">
            <label for="">Керiвник групи: </label>
            <input v-model="group.leader" type="text" placeholder="Короткий О.В.">
          </div>
          <div>
            <!-- abbreviation -->
            <label for="">Староста: </label>
            <input v-model="group.headman" type="text" placeholder="Короткий О.В.">
          </div>
          <div class="mt">
            <input class="hover" type="submit">
        </div>
      </form>
    </div>
</template>

<script>
  import { mapGetters } from "vuex"

  export default {
    name: "CreateGroup",

    data: () => ({
      group: {
        specialtyID: '',
        name: '',
        abbreviation: '',
        leader: '',
        headman: ''
      }
    }),

    computed: {
      ...mapGetters(['allSpecialties'])
    },

    methods: {
      createGroup() {
        console.log("create")
      }
    }
  }
</script>

<style scoped>
  @import url("../assets/style.css");

  .mt {
    margin-top: 30px !important;
  }
</style>