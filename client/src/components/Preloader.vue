<template>
  <div class="preLoader">
    <EllipsisLoader :color="'#486684'"/>
    <p>{{str}}</p>
  </div>
</template>

<script>
  import { EllipsisLoader } from "vue-spinners-css";

  export default {
    name: 'Preloader',

    props: {
      str: {
        type: String,
        default: 'Завантаження даних'
      }
    },

    components: {
      EllipsisLoader
    }
  }
</script>
<style>
  .preLoader {
    width: 100%;
    margin: 150px auto 0px auto;
    text-align: center;
  }
</style>