<template>
  <q-form
    class="q-gutter-md"
  >
    <div>
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
      <q-input v-model="formData.password" dense outlined class="q-mb-md" type="password"
        lazy-rules
        hide-bottom-space
        :rules="[
        (val) => (val && val.length > 0) || 'Password is required'
        ]"
        placeholder="Isi password disini"
        />
  
      <q-btn label="Masuk" no-caps type="submit" color="primary" class="full-width q-mb-md"/>
    </div>
  </q-form>
</template>

<script>
export default {

}
</script>
<script setup>
import { ref } from 'vue'
  const formData = ref({
    email :'',
    password: ''
  })
</script>

<style>

</style>