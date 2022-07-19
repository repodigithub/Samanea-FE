<template>
  <q-form
    class="q-gutter-md"
  >
    <div>
      <div class="row q-col-gutter-md">
        <div class="col-12">
          <div class="text-subtitle2 text-bold tx-soft-black">Nama Lengkap*</div>
          <q-input v-model="formData.fullname" dense outlined type="text"
            lazy-rules
            hide-bottom-space
            :rules="[
            (val) => (val && val.length > 0) || 'Nama Lengkap is required'
            ]"
            placeholder="Isi nama lengkap disini"
            />
        </div>
        <div class="col-6">
          <div class="text-subtitle2 text-bold tx-soft-black">Email*</div>
          <q-input v-model="formData.email" dense outlined type="email"
            lazy-rules
            hide-bottom-space
            :rules="[
            (val) => (val && val.length > 0) || 'Email is required'
            ]"
            placeholder="Isi email disini"
            />
        </div>
        <div class="col-6">
          <div class="text-subtitle2 text-bold tx-soft-black">No Telpon*</div>
          <q-input v-model="formData.email" dense outlined type="text"
            lazy-rules
            hide-bottom-space
            :rules="[
            (val) => (val && val.length > 0) || 'No Telpon is required'
            ]"
            placeholder="Isi no telpon disini"
            />
        </div>
        <div class="col-6">
          <div class="text-subtitle2 text-bold tx-soft-black">Password*</div>
          <q-input v-model="formData.email" dense outlined type="email"
            lazy-rules
            hide-bottom-space
            :rules="[
            (val) => (val && val.length > 0) || 'Email is required'
            ]"
            placeholder="Isi email disini"
            />
        </div>
        <div class="col-6">
          <div class="text-subtitle2 text-bold tx-soft-black">Ketik Ulang Password*</div>
          <q-input v-model="formData.email" dense outlined type="text"
            lazy-rules
            hide-bottom-space
            :rules="[
            (val) => (val && val.length > 0) || 'No Telpon is required'
            ]"
            placeholder="Isi no telpon disini"
            />
        </div>
        <div class="col-6">
          <div class="text-subtitle2 text-bold tx-soft-black">User Level*</div>
          <q-input v-model="formData.email" dense outlined type="email"
            lazy-rules
            hide-bottom-space
            :rules="[
            (val) => (val && val.length > 0) || 'Email is required'
            ]"
            placeholder="Isi email disini"
            />
        </div>
        <div class="col-6">
          <div class="text-subtitle2 text-bold tx-soft-black">Team Leader*</div>
          <q-input v-model="formData.email" dense outlined type="text"
            lazy-rules
            hide-bottom-space
            :rules="[
            (val) => (val && val.length > 0) || 'No Telpon is required'
            ]"
            placeholder="Isi no telpon disini"
            />
        </div>
        <div class="col-6">
          <div class="text-subtitle2 text-bold tx-soft-black">Supervisor*</div>
          <q-input v-model="formData.email" dense outlined type="text"
            lazy-rules
            hide-bottom-space
            :rules="[
            (val) => (val && val.length > 0) || 'No Telpon is required'
            ]"
            placeholder="Isi no telpon disini"
            />
        </div>
        <div class="col-12">
          <q-checkbox v-model="terms">
            <div class="text-subtitle2 text-bold tx-soft-black flex">
              Dengan ini saya menyetujui <div class="text-primary q-mx-sm"> Syarat dan Ketentuan</div>yang berlaku
            </div>
          </q-checkbox>
        </div>
      </div>
    
      <q-btn label="Daftar" type="submit" color="primary" class="full-width q-mb-md q-mt-lg"/>
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
    password: '',
    confirmpassword:'',
    fullname:'',
    phonenumber:'',
  })

  const terms = ref(false)
</script>

<style>

</style>