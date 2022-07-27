<template>
<div>
  <SimplePage :columns="columns" url="user/request" v-model:request="request" v-model:limit="limit" v-model:filter="filterKey" canSelect v-model:selectedRows="selectedRows">
      <template v-slot:slotfilter>
        <div class="flex justify-between">
          <div>
            <q-input outlined :model-value="filter" :loading="loadingFilter" @update:model-value="changeFilter" debounce="1000" dense placeholder="Ketik Nama User">
              <template v-slot:prepend>
                <q-icon name="search" />
              </template>
            </q-input>
          </div>
          <div v-if="selectedRows.length > 0">
            <q-btn color="negative" no-caps @click.stop="onClick(selectedRows,'reject')" unelevated class="q-mr-sm border-radius-8" style="width:200px !important;">
            <q-icon name="close" size="16px"/>
            <div class="fs-12" style="line-height:16px;">Reject</div>
            </q-btn>
            <q-btn color="positive"  no-caps @click.stop="onClick(selectedRows,'approve')" unelevated style="width:200px !important;" class="border-radius-8">
              <q-icon name="check" size="16px"/>
              <div class="fs-12" style="line-height:16px;">Approve</div>
            </q-btn>
          </div>
        </div>
        <DividerComp class="q-my-lg"/>
      </template>
      <template v-slot:body-cell-action="props">
        <q-td key="action" :props="props">
          <q-btn color="negative" no-caps @click.stop="onClick(props.row.id,'reject')" unelevated class="q-mr-sm" dense>
            <q-icon name="close" size="16px"/>
            <div class="fs-12" style="line-height:16px;">Reject</div>
          </q-btn>
          <q-btn color="positive"  no-caps @click.stop="onClick(props.row.id,'approve')" unelevated  dense>
            <q-icon name="check" size="16px"/>
            <div class="fs-12" style="line-height:16px;">Approve</div>
          </q-btn>
        </q-td>
      </template>
  </SimplePage>
  <q-dialog v-model="confirm" persistent>
    <BaseDialog @closeDialog="confirm = false">
      <template v-slot:content-dialog>
        <div class="row items-center justify-center text-center q-mb-sm">
          <div class="col-4 text-center">
              <div class="text-bold">Konfirmasi</div>
          </div>
          <span class="q-ml-sm col-8 grey1">Apakah Anda Yakin meng{{send.action}} User ini?</span>
        </div>
        <div class="row q-col-gutter-md">
          <div class="col-6">
            <q-btn color="grey" outline label="Batalkan" no-caps @click="confirm = false" unelevated class="full-width border-radius-8" />
          </div>
          <div class="col-6">
            <q-btn color="positive" label="OK" @click="onConfirmed" unelevated class="full-width border-radius-8"/>
          </div>
        </div>
      </template>
    </BaseDialog>
  </q-dialog>
</div>
</template>

<script setup>
import { ref,computed } from 'vue'
import DividerComp from 'components/DividerComp.vue'
import SimplePage from 'components/SimplePage.vue'
import BaseDialog from 'src/components/BaseDialog.vue'
import { generalMethods } from 'src/methods/generalMethods'
import { useStore } from 'vuex'
const store = useStore()
const columns = [
    { name: 'kode', label: 'Nama', align: 'left', field: 'fullname',style:'width:263px'},
    { name: 'nama',  align: 'left',label: 'Email', field: 'email',style:'width:263px'},
    { name: 'sub_brand',  align: 'left',label: 'Level', field: 'level'},
    { name: 'action',  align: 'right',label: 'Action', field: 'id'},
]

const request = ref({})
const pagination = computed(()=>{
  return store.state.table.pagination
})
const limit = ref(15)
const filter = ref('')
const filterKey = ref('')

const loadingFilter = ref(false)
const changeFilter = value => {
  filter.value = value
  loadingFilter.value = true
  setTimeout(() => {
    request.value.pagination = { page : 1}
    request.value.filter = `&search=${value}`
    loadingFilter.value = false
    limit.value = 10
    filterKey.value = `&search=${value}`
  }, 1000);
}
// Approve and reject
const send = ref({id:[],action:''})
const confirm = ref(false)
const onClick = (value,methods) => {
  let id = []
  if(Array.isArray(value)){
    value.forEach((item) => {
        id.push(item.id)
      
    })
  }else{
    id.push(value)
  }
  send.value.id = id
  send.value.action =methods.includes('approve') ? 'approved' : 'rejected'
  confirm.value = true
}
const { showLoading,hideLoading,postData,successNotif,errorNotif } = generalMethods()
const onConfirmed = () => {
  confirm.value = false
  showLoading()
  postData('user/action',send.value)
  .then(res=>{
    successNotif(`${res.data.meta.message}`)
    request.value.pagination = {page : 1} 
    hideLoading()
  })
  .catch(()=>{
    errorNotif('Failed to approve/reject User')
    hideLoading()
  })
}

const selectedRows = ref([])
</script> 

<style>

</style>