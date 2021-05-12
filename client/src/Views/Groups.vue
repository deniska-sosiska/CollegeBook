<template>
  <div class="content">
    <template v-if="loaderGroups">
      <Preloader />
    </template>

    <template v-else>
      <div class="content__groups" v-if="!localError">
        <h2>Усі групи за спеціальністю: <span>{{ nameCurrentSpecialty }}</span></h2>
        <router-link 
          v-for="(group, key) in groupsByCurrentSpecialty"
          :key="key"
          :spesialty="groupsByCurrentSpecialty.id"
          :group="group.id"
          :to="'/' + groupsByCurrentSpecialty.id + '/' + group.id + '/' + group._id + '/'">
            <p class="infoGroup hover">Група: {{group.nameGroup}} || Староста: {{group.headman}} || Класний керівник: {{group.leader}}</p>
        </router-link>
      </div>

      <div class="content__groups" v-else>
        <h2><span>{{ nameCurrentSpecialty }}</span></h2>
        <img :src="hrefImageBlock" title="на етапі розробки">
      </div>
    </template>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: "Groups",

    props: {
      specialtyID: {
        type: String,
        required: true
      },
    },

    data: () => ({
      localError: false,
      hrefImageBlock: '../assets/blocked.png',
    }),

    computed: mapGetters([
      'groupsByCurrentSpecialty',
      'nameCurrentSpecialty',
      'loaderGroups'
    ]),

    async created() {
      try {
        await this.$store.dispatch("fetchGroupsBySpecialtyID", this.specialtyID)
      } catch(err) {
        this.localError = true
      }
    }  
  }
</script>

<style  scoped>
  .infoGroup {
    font-size: 20px;
    padding: 15px 45px;
    text-align: center;
  }
  .content__groups {
    padding-top: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .content__groups > h2 {
    text-align: center;
    margin: 10px 0px 35px 0px;
    font-weight: 500;
  }
  .content__groups > h2 > span { font-weight: 800; }

  .content__groups > img{
    margin-top: 30px
  }
</style>