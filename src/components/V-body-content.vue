<template>
  <div class="body">
    <h2>Вибiр журналу</h2>
    <div class="magazines">
      <div class="imageBlock hover">
        <img :src="hrefAcademicAttendance">
        <p>Журнал відвідувань</p>
      </div>
      <div class="imageBlock hover">
        <img :src="hrefAcademicProgress" title="на етапі розробки">
        <p>Журнал успішності</p>
      </div>
    </div> 
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  data() {
    return {
      hrefAcademicAttendance: '../assets/hrefAcademicAttendance.jpg',
      hrefAcademicProgress: '../assets/hrefAcademicProgress.jpg'
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
  .imageBlock { padding: 35px 35px 15px 35px; }
  .imageBlock > p {
    font-size: 18px;
    margin-top: 15px;
    user-select: none;
  }
  .imageBlock > img {
    margin: 0px 0px;
    width: 400px;
  }
</style>
