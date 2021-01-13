<template>
  <div class="preLoader">
    <EllipsisLoader :color="'#486684'"/>
    <p>{{str}}</p>
  </div>
</template>

<script>
  export default {
    name: 'Preloader',
    props: {
      str: {
        type: String,
        default: 'Завантаження даних'
      }
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