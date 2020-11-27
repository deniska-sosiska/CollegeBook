<template>
  <div class="Authorization">
    <form class="signUp">
          <div>
              <label for="newName">ПІБ: </label>
              <input id="newName" placeholder="Ім'я має збігатися з журналом" type="text" required>
          </div>
          <div>
              <label for="newEmail">Email: </label>
              <input id="newEmail"  placeholder="BoBa@example.com" type="email" required>
          </div>
          <div>
              <label for="newLogin">Логiн: </label>
              <input id="newLogin" placeholder="Наприклад: ßØß4uK" type="text" required>
          </div>
          <div>
              <label for="newPassword">Пароль: </label>
              <input id="newPassword"  placeholder="Наприклад: q1w2e3_BOBA" type="password" required>
          </div>
          <div>
              <label for="">Ваша "роль": </label>
              <select v-model="newUser.role" required>
                <option disabled value="">Варiанти</option>
                <option v-for="(value, index) in list" :key="index" value="value">{{value}}</option>
            </select>
          </div>
          <div>
              <input type="submit" @click="qwe(); return false;" value="Зареєструватися">
          </div>
      </form>
    </div>
</template>

<script>
  import Vue from 'vue'
  import axios from 'axios'

  export default {
    data () {
      return {
        dbAuthorizUrl: 'http://127.0.0.1:3000/registeredUser',
        
        list: [
          "Студент",
          "Староста групи",
          "Вчитель"
        ],

        newUser: {
          name: '',
          role: '',
          login: '',
          password: ''
        }

      }
    },
    methods: {
      authorization: function(){
        axios.get(this.dbAuthorizUrl).then((response) => {
          console.log("Перевірка даних в БД...")
          response.data.forEach(registeredUser => {
            if (registeredUser.login == this.userLogin && registeredUser.password == this.userPassword){
              this.userRegistered = true
              this.isFake = false
              console.log("Перевірка успішна")
            }
          })
          if (this.userRegistered == false) {
            console.log("Перевірка неуспішна")
            this.isFake = true
            setTimeout(() => this.isFake = false, 3000)
          }
        })
      },
      registerFunc: function(){
        this.register = true
        console.log(this.register)
      }
    }
  }
</script>
