<template>
  <div class="content">
    <template v-if="loaderGroups">
      <Preloader />
    </template>

    <template v-else>
      <div class="content__groups" v-if="!localError">
        <h2>Усі групи за спеціальністю: <span>{{ nameCurrentSpecialty }}</span></h2>
            
        <div class="links"
          v-for="(group) in sortGroupByName" :key="group._id"
        >
          <router-link 
            v-if="(accountData.groupID === group.abbreviation) || accountData.role === 'Admin'"
            :to="{ name: 'Magazines', params: { specialty: specialtyID, groupID: group.abbreviation }}"
          >
            <p class="group hover">
              Група: {{ group.name }} || Староста: {{group.headman}} || Класний керівник: {{group.leader}}
            </p>
          </router-link>

          <div v-else
            :to="{ name: 'Magazines', params: { specialty: specialtyID, groupID: group.abbreviation }}"
          >
            <p class="group hover">
              Група: {{ group.name }} || Староста: {{group.headman}} || Класний керівник: {{group.leader}}
            </p>
          </div>
        </div>
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
      }
    },

    data: () => ({
      localError: false,
      hrefImageBlock: '../assets/blocked.png',
    }),

    computed: {
      ...mapGetters([
        'groupsByCurrentSpecialty',
        'nameCurrentSpecialty',
        'loaderGroups',
        'accountData'
      ]),

      sortGroupByName() {
        return this.groupsByCurrentSpecialty.sort((a, b) => {
          if (a.name > b.name) return 1
          if (a.name == b.name) return 0
          if (a.name < b.name) return -1
        })
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

<style  scoped>
  .group {
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