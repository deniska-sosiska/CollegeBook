<template>
  <div class="body">
    <h2>Вибiр журналу</h2>

    <Preloader v-if="loaderGroups" />

    <div v-else class="magazines">

      <router-link 
        v-if="currentGroupByID.studentsList.length !== 0 && currentGroupByID.schedule"
        :to="{ name: 'AcademicAttendance', params: { specialtyID, groupID }}"
        class="imageBlock hover"
      >
        <img :src="hrefAcademicAttendance">
        <p>Журнал відвідувань</p>
      </router-link>

      <div v-else class="imageBlock hover">
        <img 
          :src="hrefImageBlock" class="blocked"
          :title='!currentGroupByID.schedule ? "Розклад занять ще не готовий" : "Список студентiв ще не готовий"'
        >
        <img :src="hrefAcademicAttendance">
        <p>Журнал відвідувань</p>
      </div>



      <div class="imageBlock hover">
        <img :src="hrefImageBlock" class="blocked" title="на етапі розробки">
        <img :src="hrefAcademicProgress">
        <p>Журнал успішності</p>
      </div>
    </div> 
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: "Magazines",

    props: {
      specialtyID: {
        type: String,
        required: true
      },
      groupID: {
        type: String,
        required: true
      }
    },

    data:() => ({
      hrefAcademicAttendance: '../assets/hrefAcademicAttendance.jpg',
      hrefAcademicProgress: '../assets/hrefAcademicAttendance.jpg',
      hrefImageBlock: '../assets/blocked.png',
    }),

    computed: {
      ...mapGetters([
        'groupsByCurrentSpecialty',
        'loaderGroups'
      ]),
      currentGroupByID() {
        return this.groupsByCurrentSpecialty.find(elem => elem.specialtyID = this.specialtyID)
      }
    },

    async created() {
      try {
        await this.$store.dispatch("fetchGroupsBySpecialtyID", this.specialtyID)
      } catch(err) {
        this.localError = true
      }
    } 
  }
</script>

<style scoped>
  .body { text-align: center; }
  .body > h2 {
    margin: 15px 0px;
    font-weight: 500;
  }
  .magazines {
    display: flex;
    justify-content: center;
    width: 100%;
  }
  .imageBlock { 
    padding: 35px 35px 15px 35px;
    position: relative;
  }
  .imageBlock > p {
    font-size: 18px;
    margin-top: 15px;
    user-select: none;
  }
  .imageBlock > img {
    margin: 0px 0px;
    width: 400px;
  }
  .blocked {
    z-index: 2;
    position: absolute;
    top: 75px;
  }
</style>
