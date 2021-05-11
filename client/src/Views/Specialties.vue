<template>
  <div class="choseGroup ">
    <template  v-if="currentPreloaderMain">
      <Preloader />
    </template>

    <template v-else>
      <div v-for = "(specialty, key) in allSpecialties" :key = "key">
        <div v-if="specialty.groups.length == 0" class="specialty hover"> <!--якщо вона порожня-->
            <img :src="hrefImageBlock" class="blocked" title="на етапі розробки">
            <img :src="specialty.imageLink">
            <p>{{specialty.name}}</p>
        </div>
        <router-link  v-else
          class="specialty hover"
          :to="'/' + specialty.abbreviation + '/' + specialty._id + '/'"
          >
            <img :src="specialty.imageLink">
            <p>{{specialty.name}}</p>
        </router-link>
      </div>
    </template>
  </div>
</template>

<script>
  import { mapGetters, mapActions, mapMutations} from 'vuex'

  export default {
    name: "Specialties",

    data(){
      return {
        hrefImageBlock: '../assets/blocked.png'
      }
    },
    computed: {
      ...mapGetters(['allSpecialties', 'currentPreloaderMain']),
    },
    methods: {
      ...mapActions(['fetchSpecialties']),
      ...mapMutations(['updatePreloaderMain'])
    },
    mounted() {
      this.updatePreloaderMain(true)
      this.fetchSpecialties()
    }
  }
</script>

<style scoped>
  .choseGroup {
    padding: 0px 0px;
    display: flex;
    /* justify-content: space-around; */
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