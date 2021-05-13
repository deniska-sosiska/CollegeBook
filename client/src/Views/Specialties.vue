<template>
  <div class="content ">
    <template v-if="loaderSpecialties">
      <Preloader />
    </template>

    <template v-else>
      <div v-for="(specialty) in allSpecialties" :key="specialty._id">
        <router-link  
          class="specialty hover"
          :to="{ name: 'Groups', params: { specialtyID: specialty.abbreviation }}"
          >
            <img :src="specialty.imageLink">
            <p>{{specialty.name}}</p>
        </router-link>
      </div>
    </template>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: "Specialties",

    computed: mapGetters(['allSpecialties', 'loaderSpecialties']),
  }
</script>

<style scoped>
  .content {
    padding: 0px 0px;
    display: flex;
    flex-wrap: wrap;
  }
  .specialty {
    padding: 40px 20px 20px 20px;
    width: 400px;
    height: 360px;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
  }
  .specialty > p {
    text-align: center;
    margin-top: 10px;
  }
  .blocked {
    position: absolute;
    width: 250px;
    top: 65px;
  }
</style>