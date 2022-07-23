<template>
<div>
  <q-form
    class="q-gutter-md"
    @submit.prevent.stop="onSave" ref="form"
  >
    <div>
      <div v-if="error">
        <q-banner inline-actions class="text-negative bg-soft-red border-radius-8 q-mb-md" v-if="error.auth">
            <span v-for="(msg,index) in error.auth" :key="index">
              {{msg}}
            </span>
        </q-banner>
      </div>
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
          <q-input v-model="formData.telphone" dense outlined type="text"
            lazy-rules
            hide-bottom-space
            
            placeholder="Isi no telpon disini"
            />
        </div>
        <div class="col-6">
          <div class="text-subtitle2 text-bold tx-soft-black">Password*</div>
          <q-input v-model="formData.password" dense outlined :type="visibility ? 'password' : 'text'"
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
        </div>
        <div class="col-6">
          <div class="text-subtitle2 text-bold tx-soft-black">Ketik Ulang Password*</div>
          <q-input v-model="formData.password_confirmation" dense outlined :type="visibility2 ? 'password' : 'text'"
            lazy-rules
            hide-bottom-space
            :rules="[
            (val) => (val && val.length > 0) || 'Password confirmation is required'
            ]"
            placeholder="Ketik ulang password disini"
            >
            <template v-slot:append>
                <q-icon
                    :name="visibility2 ? 'visibility' : 'visibility_off'"
                    @click="visibility2 = !visibility2"
                    class="cursor-pointer"
                />
                </template>
            </q-input>
        </div>
        <div class="col-6">
          <div class="text-subtitle2 text-bold tx-soft-black">User Level*</div>
          <q-select outlined v-model="formData.level" :options="optionLevel" placeholder="User Level"
            lazy-rules
            hide-bottom-space
            dense
            emit-value
            map-options
          />
          
        </div>
        <div class="col-6" v-if="formData.level.includes('sales')">
          <SelectDropdown 
          url="auth/register/teamleader" 
          v-model:selected="formData.team_leader"
          placeHold="Select Team Leader"
          >
            <template v-slot:labelSelect>
              <div class="text-subtitle2 text-bold tx-soft-black">Team Leader*</div>
            </template>
          </SelectDropdown>
        </div>
        <div class="col-6" v-if="['sales','team_leader'].indexOf(formData.level) >= 0">
          <SelectDropdown 
          url="auth/register/supervisor" 
          v-model:selected="formData.supervisor"
          placeHold="Select Supervisor"
          v-if="formData.level.includes('team_leader')"
          >
            <template v-slot:labelSelect>
              <div class="text-subtitle2 text-bold tx-soft-black">Supervisor*</div>
            </template>
          </SelectDropdown>
          <div v-else>
            <div class="text-subtitle2 text-bold tx-soft-black">Supervisor*</div>
            <q-input v-model="formData.email" dense outlined type="text"
            hide-bottom-space
            placeholder="Supervisor"
            disable 
            />
          </div>
        </div>
        <!-- <div class="col-12">
          <q-checkbox v-model="terms">
            <div class="text-subtitle2 text-bold tx-soft-black flex">
              Dengan ini saya menyetujui <div class="text-primary q-mx-sm"> Syarat dan Ketentuan</div>yang berlaku
            </div>
          </q-checkbox>
        </div> -->
      </div>
    
      <q-btn label="Daftar" type="submit" color="primary" class="full-width q-mb-md q-mt-lg"/>
    </div>
  </q-form>
  <q-dialog v-model="confirm" persistent>
    <BaseDialog @closeDialog="confirm = false">
      <template v-slot:content-dialog>
        <div class="row items-center justify-center text-center">
          <div class="col-12 text-center" style="margin-bottom:56px; margin-top:80px;">
              <q-avatar size="100px" font-size="80px" color="positive" text-color="white" icon="done" />
          </div>
          <div class="blackown col-12 text-bold q-mb-md" style="font-size:20px;">Proses Pendaftaran Telah Diterima</div>
          <span class="q-ml-sm col-8 grey1" style="margin-bottom:30px;">Pendaftaran Anda sedang diproses,mohon untuk menunggu konfirmasi dari approver</span>
        </div>
      </template>
    </BaseDialog>
  </q-dialog>
</div>
</template>


<script setup>
import { ref } from 'vue'
import { generalMethods } from 'src/methods/generalMethods'
import SelectDropdown from 'src/components/SelectDropdown.vue'
import BaseDialog from 'src/components/BaseDialog.vue'
  const formData = ref({
    email :'supervisor3@localhost.com',
    password: 'password',
    password_confirmation:'password',
    fullname:'password',
    telphone:'08123546789',
    level:'supervisor',
    supervisor:null,
    team_leader:null
  })
  const visibility = ref(true)
  const visibility2 = ref(true)
  const optionLevel = ref([
    { label : 'Sales',value : 'sales'},
    { label : 'Team Leader',value : 'team_leader'},
    { label : 'Supervisor',value : 'supervisor'},
    { label : 'Manager',value : 'manager'}
  ])

  const error = ref(null)
  const form = ref('')
  const { showLoading,hideLoading,postData } = generalMethods()
  const confirm = ref(false)
  function onSave() {
    form.value.validate()
    .then(valid=>{
      if(valid){
          showLoading()
          postData('auth/register',formData.value,false)
          .then(()=>{
              hideLoading()
              confirm.value = true
          })
          .catch(err=>{
              hideLoading()
              error.value = {
                  auth : `${Object.values(err.response.data.meta.message)}`
              }
          })
      }
    })
  }
</script>

