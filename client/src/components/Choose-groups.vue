<template>
  <div class="choseGroup ">
    <div v-for = "(specialty, key) in getSpecialties" :key = "key">
      <div v-if="specialty.groups.length == 0" class="specialty hover"> <!--якщо вона порожня-->
          <img :src="hrefImageBlock" class="blocked" title="на етапі розробки">
          <img :src="specialty.linkImage">
          <p>{{specialty.name}}</p>
      </div>
      <router-link  v-else  
        :to = "'/' + specialty.id + '/'"
        class="specialty hover">
          <img :src="specialty.linkImage">
          <p>{{specialty.name}}</p>
      </router-link>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import { mapGetters, mapActions} from 'vuex'

export default {
  data(){
    return {
      hrefImageBlock: '../assets/blocked.png'
    }
  },
  computed: {
    ...mapGetters(['getSpecialties', 'getDataOfSpecialty']),
  },
  methods: mapActions(['fetchSpesialties', 'updateDataOfSpecialty']),
  mounted() {
    this.fetchSpesialties()
    this.updateDataOfSpecialty()
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