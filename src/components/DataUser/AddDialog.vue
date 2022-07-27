<template>
<div>
  <div class="text-bold text-body1">Tambah User</div>
  <DividerComp class="q-my-md"/>
  <q-form
    @submit="onSubmit"
    ref="form"
  >
  <div v-if="error">
    <q-banner inline-actions class="text-negative bg-soft-red border-radius-8 q-mb-md" v-if="error.auth">
        <span v-for="(msg,index) in error.auth" :key="index">
          {{msg}}
        </span>
    </q-banner>
  </div>
  <div class="row items-center bg-main-background q-pa-sm">
    <div class="col-6">
      <div class="text-bold tx-soft-black">Nama Lengkap*</div>
    </div>
    <div class="col-6 bg-white">
      <q-input v-model="formData.fullname" dense outlined type="text"
        lazy-rules
        hide-bottom-space
        :rules="[
        (val) => (val && val.length > 0) || 'Nama Lengkap is required'
        ]"
        placeholder="Isi nama lengkap disini"
        />
    </div>
  </div>
  <div class="row items-center q-pa-sm">
    <div class="col-6">
      <div class="text-bold tx-soft-black">Email*</div>
    </div>
    <div class="col-6 bg-white">
      <q-input v-model="formData.email" dense outlined type="email"
        lazy-rules
        hide-bottom-space
        :rules="[
        (val) => (val && val.length > 0) || 'Email is required'
        ]"
        placeholder="Isi email disini"
        />
    </div>
  </div>
  <div class="row items-center bg-main-background q-pa-sm">
    <div class="col-6">
      <div class="text-bold tx-soft-black">No Tlp*</div>
    </div>
    <div class="col-6 bg-white">
      <q-input v-model="formData.telphone" dense outlined type="text"
        lazy-rules
        hide-bottom-space
        :rules="[
        (val) => (val && val.length > 0) || 'No Telpon is required'
        ]"
        placeholder="Isi no telpon disini"
        />
    </div>
  </div>
  <div class="row items-center q-pa-sm">
    <div class="col-6">
      <div class="text-bold tx-soft-black">Password*</div>
    </div>
    <div class="col-6 bg-white">
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
  </div>
  <div class="row items-center bg-main-background q-pa-sm">
    <div class="col-6">
      <div class="text-bold tx-soft-black">Ketik Ulang Password*</div>
    </div>
    <div class="col-6 bg-white">
      <q-input v-model="formData.password_confirmation" dense outlined :type="visibility2 ? 'password' : 'text'"
        lazy-rules
        hide-bottom-space
        :rules="[
        (val) => (val && val.length > 0) || 'Password is required'
        ]"
        placeholder="Isi password disini"
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
  </div>
  <div class="row items-center  q-pa-sm">
    <div class="col-6">
      <div class="text-bold tx-soft-black">User Level*</div>
    </div>
    <div class="col-6 bg-white">
      <q-select outlined v-model="formData.level" :options="optionLevel" placeholder="User Level"
        lazy-rules
        hide-bottom-space
        dense
        emit-value
        map-options
      />
    </div>
  </div>
  <div class="row items-center bg-main-background q-pa-sm" v-if="formData.level.includes('sales')">
    <div class="col-6">
      <div class="text-bold tx-soft-black">Team Leader</div>
    </div>
    <div class="col-6 bg-white">
      <SelectDropdown 
        url="auth/register/teamleader" 
        v-model:selected="teamleader"
        @onUpdatedSelected="onTeamLeaderSelected"
        placeHold="Select Team Leader"
        />
    </div>
  </div>
  <div class="row items-center bg-main-background q-pa-sm" v-if="formData.level.includes('team_leader')">
    <div class="col-6">
      <div class="text-bold tx-soft-black">Supervisor</div>
    </div>
    <div class="col-6 bg-white">
      <SelectDropdown 
      url="auth/register/supervisor" 
      v-model:selected="supervisor"
      @onUpdatedSelected="onSupervisorSelected"
      placeHold="Select Supervisor"
      />
    </div>
  </div>
  <div class="row items-center q-pa-sm" v-if="teamleader && formData.level.includes('sales')">
    <div class="col-6">
      <div class="text-bold tx-soft-black">Supervisor</div>
    </div>
    <div class="col-6 bg-white">
      <q-input v-model="namesupervisor" dense outlined type="text"
        hide-bottom-space
        placeholder="Supervisor"
        disable
        v-if="teamleader && formData.level.includes('sales')" 
        />
    </div>
  </div>
  <div class="row q-col-gutter-md q-mt-md">
    <div class="col-6">
      <q-btn color="grey" outline label="Batalkan" no-caps @click="$emit('closeDialog')" unelevated class="full-width border-radius-8" />
    </div>
    <div class="col-6">
      <q-btn color="primary" label="Simpan" no-caps type="submit" unelevated class="full-width border-radius-8"/>
    </div>
  </div>
  
  </q-form>
</div>
</template>

<script>
export default {
  props:['dataDialog'],
}
</script>

<script setup>
import DividerComp from 'components/DividerComp.vue'
import { formRegister } from 'src/methods/formRegister'
import SelectDropdown from 'src/components/SelectDropdown.vue'
import { generalMethods } from 'src/methods/generalMethods'


const { showLoading,hideLoading,postData,successNotif,errorNotif } = generalMethods()
const { formData,visibility,visibility2,optionLevel,teamleader,
    supervisor,
    namesupervisor,
    onTeamLeaderSelected,
    onSupervisorSelected,form,error } = formRegister()

const emit = defineEmits(['onAdd'])
function onSubmit() {
    form.value.validate()
    .then(valid=>{
      if(valid){
        if(formData.value.level.includes('sales') && !formData.value.team_leader){
          error.value = {
            auth : {teamleader: "Field Team Leader is Required."}
          }
        }else if(formData.value.level.includes('team_leader') && !formData.value.supervisor) {
            error.value = {
              auth : {teamleader: "Field Supervisor is Required."}
            }
        }else {
          showLoading()
          postData('user',formData.value)
          .then(res=>{
            emit('onAdd',res)
          })
          .catch(err=>{
              hideLoading()
              error.value = {
                  auth : `${Object.values(err.response.data.meta.message)}`
              }
              errorNotif('Failed to create user')
          })
        }
      }
    })
  }
</script>