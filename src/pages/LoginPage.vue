<template>
  <q-form
    class="q-gutter-md"
    @submit.prevent.stop="onSave" ref="form"
  >
    <div>
      <div v-if="error">
        <q-banner inline-actions class="text-negative bg-soft-red border-radius-8 q-mb-md" v-if="error.auth">
            {{error.auth}}
        </q-banner>
      </div>
      <div class="text-subtitle2 text-bold tx-soft-black">Email</div>
      <q-input v-model="formData.email" dense outlined class="q-mb-md" type="email"
        lazy-rules
        hide-bottom-space
        :rules="[
        (val) => (val && val.length > 0) || 'Email is required'
        ]"
        placeholder="Isi email disini"
        />
      <div class="flex justify-between items-center">
        <div class="text-subtitle2 text-bold tx-soft-black">Password</div>
        <q-btn color="primary" no-caps flat class="q-px-none" @click="$router.push({ name : $route.name.includes('login') ? 'register' : 'login'})"> 
          <span style="text-decoration: underline;">
            Lupa Password
          </span> 
        </q-btn>
      </div>
      <q-input v-model="formData.password" dense outlined class="q-mb-md" :type="visibility ? 'password' : 'text'"
        lazy-rules
        hide-bottom-space
        :rules="[
        (val) => (val && val.length > 0) || 'Password is required'
        ]"
        placeholder="Isi password disini"
        >
        <template v-slot:append>
          <q-icon
              :name="visibility ? 'visibility' : 'visibility_off'"
              @click="visibility = !visibility"
              class="cursor-pointer"
          />
          </template>
      </q-input>
        <vue-recaptcha :sitekey="recaptchasitekey" :class="error ? error.recaptcha ? '' : 'q-mb-md' : 'q-mb-md'"/>
        <div v-if="error" :class="error ? 'q-my-md' : ''" class="text-negative"> {{error.recaptcha}} </div>
        <q-btn label="Masuk" no-caps type="submit" color="primary" class="full-width q-mb-md"/>
    </div>
  </q-form>
</template>

<script setup>
import { ref } from 'vue'
import { VueRecaptcha } from 'vue-recaptcha'
import { generalMethods } from 'src/methods/generalMethods'
import { useStore } from 'vuex'

  const formData = ref({
    email :'test@gmail.com',
    password: '1qaz2wsx'
  })
  const visibility = ref(true)
  const { showLoading,hideLoading } = generalMethods()
  const store = useStore()
  const error = ref(null)
  const form = ref('')
  function onSave() {
    form.value.validate()
    .then(valid=>{
      if(valid){
        let recaptcha = grecaptcha.getResponse()
        if(recaptcha.length === 0){
            error.value ={
                recaptcha : 'You cant leave Captcha Code empty'
            } 
        }else{
          formData.value = {
              ...formData.value, "g-recaptcha-response" : recaptcha
          }
          showLoading()
          store.dispatch('auth/login',formData.value)
          .then(()=>{
              hideLoading()
          })
          .catch(err=>{
              hideLoading()
              error.value = {
                  auth : `${err.response?.data?.meta?.message}`
              }
              grecaptcha.reset()
          })
      }
      }
    })
  }
</script>

<style>

</style>