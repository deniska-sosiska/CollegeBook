<template>
  <div class="create_group">
      <h2>Додати нову группу</h2>
        <form @submit.prevent="createGroup" class="signIn">
          <div>
            <label for="">Спецiальнiсть: </label>
            <select v-model.trim="group.specialtyID" @change="prefix()" required>
              <option disabled value="">Варiанти</option>
              <option 
                v-for="(specialty) in allSpecialties" :key="specialty._id"
                :value="specialty.abbreviation"
              >{{ specialty.name }}</option>
            </select>
          </div>

          <div class="mt">
            <label for="">Назва групи: </label>
            <input v-model.trim="group.name" type="text" :disabled="disabledInput" placeholder="Приклад: РПЗ 17 2/9"  spellcheck="false" required>
          </div>
          <div>
            <label for="">Абревіатура: </label>
            <input v-model.trim="group.abbreviation" :disabled="disabledInput" type="text" placeholder="Приклад: RPZ17_2-9" required>
          </div>

          <div class="mt">
            <label for="">Керiвник групи: </label>
            <input v-model.trim="group.leader" type="text" placeholder="Короткий О.В." required>
          </div>
          <div>
            <label for="">Староста: </label>
            <input v-model.trim="group.headman" type="text" placeholder="Короткий О.В." required>
          </div>
          <div class="mt">
            <input class="hover" type="submit">
        </div>
      </form>
    </div>
</template>

<script>
  import axiosApiInstanse from '../services/axiosApiInstance'
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
      ...mapGetters(['allSpecialties']),

      disabledInput() {
        return !this.group.abbreviation && !this.group.name
      }
    },

    methods: {
      async createGroup() {
        await axiosApiInstanse({
          url: "group",
          data: this.group,
          method: "post"
        })

        
      },

      prefix() {
        const res = this.allSpecialties.find(spec => spec.abbreviation === this.group.specialtyID)
        this.group.name = `${res.abbreviation_ua} `
        this.group.abbreviation = `${res.abbreviation}`
      },
    }
  }
</script>

<style scoped>
  @import url("../assets/style.css");

  .mt {
    margin-top: 30px !important;
  }
</style>