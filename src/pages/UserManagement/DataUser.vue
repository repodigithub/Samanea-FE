<template>
<div>
  <SimplePage :columns="columns" url="user" v-model:request="request" v-model:limit="limit" v-model:filter="filterKey">
      <template v-slot:slotfilter>
        <div class="flex justify-between">
          <div>
            <q-input placeholder="Ketik Nama User" outlined :model-value="filter" :loading="loadingFilter" @update:model-value="changeFilter" debounce="1000" dense>
              <template v-slot:prepend>
                <q-icon name="search" />
              </template>
            </q-input>
          </div>
          <q-btn color="primary" icon="add" label="Tambah User" no-caps unelevated class="border-radius-8" @click="onClick(null,'AddDialog')"/>
        </div>
        <DividerComp class="q-my-lg"/>
      </template>
      <template v-slot:body-cell-action="props">
        <q-td key="action" :props="props">
          <q-btn color="primary" no-caps @click.stop="onClick(props.row,'EditDialog')" unelevated class="q-mr-sm" dense>
            <q-icon name="edit" size="16px"/>
          </q-btn>
          <q-btn color="primary"  no-caps @click.stop="onClick(props.row,'DeleteDialog')" unelevated dense>
            <img src="~assets/icon/delete.png" alt="edit">
          </q-btn>
        </q-td>
      </template>
  </SimplePage>
  <q-dialog v-model="confirm" persistent>
    <BaseDialog @closeDialog="confirm = false">
      <template v-slot:content-dialog>
        <component :is="showDialog" @closeDialog="confirm = false" v-model:dataDialog="dataDialog"
        @onDelete="onDelete" @onAdd="onSuccess"
        />
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
const { showLoading,hideLoading,postData,successNotif,errorNotif, deleteData } = generalMethods()

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

const showDialog = ref('')
const confirm = ref(false)
const dataDialog = ref(null)
const onClick = (row,methods) => {
  confirm.value = true
  showDialog.value = methods
  dataDialog.value = row
}

const onSuccess = res => {
  successNotif(`${res.data.meta.message}`)
  request.value.pagination = {page : 1} 
  hideLoading()
  confirm.value = false
}

const onDelete = () => {
  showLoading()
  deleteData(`user/${dataDialog.value.id}`)
  .then(res=>{
    onSuccess(res)
  })
  .catch(()=>{
    errorNotif('Failed to delete User')
    hideLoading()
    confirm.value = false
  })
}
</script> 
<script>
import DeleteDialog from 'components/DataUser/DeleteDialog.vue'
import AddDialog from 'components/DataUser/AddDialog.vue'
import EditDialog from 'components/DataUser/EditDialog.vue'
export default {
  components:{
    DeleteDialog,
    AddDialog,
    EditDialog
  }
}
</script>