<template>
  <div class="registration">
    <form @submit.prevent="registred()" class="signUp">
      <template class="first" v-if="first">
        <div>
          <label for="">Ваша "роль": </label>
          <select v-model="formAccountData.role" required>
            <option disabled value="">Варiанти</option>
            <option v-for="(value, index) in list" :key="index" :value="value">{{value}}</option>
          </select>
        </div>
        <template v-if="showSpecialties">
          <div>
            <label for="">Cпеціальність: </label>
            <select v-model="formAccountData.specialtyID" @change="fetchGroups()" required>
              <option disabled value="">Варiанти</option>
              <option v-for="(specialty) in allSpecialties" :key="specialty._id" :value="specialty.abbreviation">{{ specialty.name }}</option>
            </select>
          </div>
        </template>
        <template v-if="showGroups">
          <div>
            <label for="">Ваша група: </label>
            <select v-model="formAccountData.groupID" required>
              <option disabled value="">Варiанти</option>
              <option v-for="(group) in groupsByCurrentSpecialty" :key="group._id" :value="group.abbreviation">{{ group.name }}</option>
            </select> 
          </div>
        </template>
        <div class="inputs">
          <input class="hover" type="button" value="Відмінити реєстрацію" @click="canselRegistration()">
          <input class="hover" :disabled="isError" type="button" value="Продовжити" @click="isFirst()">
        </div>
        <div 
          v-if="isError"
          class="isError"
        ><p>{{ errorMessage }}</p>
        </div>
      </template>

      <template class="second" v-if="second">
        <div>
          <label for="newName">ПІБ: </label>
          <input id="newName" v-model.trim="formAccountData.name" placeholder="Ім'я має збігатися з журналом" type="text" required>
        </div>
        <div>
          <label for="newEmail">Email: </label>
          <input id="newEmail" v-model.trim="formAccountData.email" placeholder="BoBa@example.com" type="email" required>
        </div>
        <div>
          <label for="newLogin">Логiн: </label>
          <input id="newLogin" v-model.trim="formAccountData.login" placeholder="Наприклад: ßØß4uK" type="text" required>
        </div>
        <div>
          <label for="newPassword">Пароль: </label>
          <input id="newPassword" v-model.trim="formAccountData.password" placeholder="Наприклад: q1w2e3_BOBA" type="password" required>
        </div>
        <div class="inputs">
          <input class="hover" type="button" value="Відмінити реєстрацію" @click="canselRegistration()" style="margin-right:10px;">
          <input class="hover" type="button" value="Повернутися" @click="() => {this.second = false; this.first = true}" style="margin-left:10px;">
        </div>
        <div>
          <input class="hover" type="submit" value="Зареєструватися">
        </div>
          <div 
            v-if="isError"
            class="isError"
          ><p >{{ errorMessage }}</p>
        </div>
      </template>
      </form>
    </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    name: "SignUp",

    data: () => ({
      first: true,
      second: false,

      errorMessage: '',
      groupNotFoundMessage: "Реєстрація для цієї спеціальності наразi неможлива",

      list: [
        "Студент",
        "Вчитель"
      ],

      formAccountData: {
        name: '',
        login: '',
        password: '',
        email: '',

        role: '',
        specialtyID: '',
        groupID: ''
      }
    }),
    computed: {
      ...mapGetters(['allSpecialties', 'groupsByCurrentSpecialty']),
      
      isError() {
        return !!this.errorMessage
      },
      showSpecialties() {
        return this.formAccountData.role &&  this.formAccountData.role !== this.list[1]
      },
      showGroups() {
        let booleanAnswer = false
        if ((this.formAccountData.role != this.list[1]) && this.formAccountData.specialtyID) {
          if (this.errorMessage !== this.groupNotFoundMessage) {
            booleanAnswer = true
          } else  {  booleanAnswer = false  }
        } else {  booleanAnswer = false  }


        return booleanAnswer
      }
    },
    methods:{
      ...mapActions(['fetchGroupsBySpecialtyID', 'createUser']),

      async registred() {
        if (!this.formAccountData.password || !this.formAccountData.login || !this.formAccountData.name || !this.formAccountData.email) {
          this.throwErrorMessage("Спочатку оберіть усі свої дані")
        }
        else {
          try {
            await this.createUser(this.formAccountData)
            // this.cleanForm()
            this.$router.push({ name: "Spesialties" })
          } catch (err) {
            this.throwErrorMessage(err.message)
          }
        }
      },

      async fetchGroups() {
        try {
          this.formAccountData.groupID = ''
          await this.fetchGroupsBySpecialtyID(this.formAccountData.specialtyID)
        } catch(err) {
          this.throwErrorMessage(this.groupNotFoundMessage)
          this.formAccountData.specialtyID = ''
        }
      },

      throwErrorMessage(mes) {
        this.errorMessage = ''
        this.errorMessage = mes
        setTimeout(() => {
          this.errorMessage = ''
        }, 3000)
      },

      isFirst() {
        if (!this.formAccountData.role) {
          this.throwErrorMessage("Спочатку оберіть усі свої дані")
        }
        else if ((this.formAccountData.role == this.list[0]) && (!this.formAccountData.groupID)) {
          this.throwErrorMessage("Спочатку оберіть усі свої дані")
        }
        else {
          this.first = false
          this.errorMessage = ''
          this.second = true
        }
      },

      canselRegistration() {
        this.$router.push({ name: 'SignIn' })
      },
      cleanForm() {
        this.formAccountData
      }
    }
  }
</script>

<style scoped>
  @import url("../../assets/style.css");

  form {
    margin: 70px auto;
  }
</style>