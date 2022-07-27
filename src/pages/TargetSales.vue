<template>
  <SimplePage :columns="columns" url="product" v-model:request="request" v-model:limit="limit" v-model:filter="filterKey">
      <template v-slot:slotfilter>
        <div class="flex justify-between">
          <div>
            <q-input outlined :model-value="filter" :loading="loadingFilter" @update:model-value="changeFilter" debounce="1000" dense>
              <template v-slot:prepend>
                <q-icon name="search" />
              </template>
            </q-input>
          </div>
          <q-btn color="primary" icon="add" label="Tambah User" no-caps unelevated class="border-radius-8"/>
        </div>
        <DividerComp class="q-my-lg"/>
      </template>
    </SimplePage>
</template>

<script setup>
import { ref,computed } from 'vue'
import DividerComp from 'components/DividerComp.vue'
import SimplePage from 'components/SimplePage.vue'
import { useStore } from 'vuex'
const store = useStore()
const columns = [
    { name: 'kode', label: 'Target', align: 'left', field: 'kode_produk'},
    { name: 'nama',  align: 'left',label: 'Tanggal Awal', field: 'nama_produk'},
    { name: 'sub_brand',  align: 'left',label: 'Tanggal Akhir', field: 'kode_sub_brand'},
    { name: 'sub_brand',  align: 'left',label: 'Pencapaian', field: 'kode_sub_brand'},
    { name: 'sub_brand',  align: 'left',label: 'Status', field: 'kode_sub_brand'},
    { name: 'nama_sub_brand',  align: 'left',label: 'Action', field: 'nama_sub_brand'},
]

const request = ref({})
const pagination = computed(()=>{
  return store.state.table.pagination
})
const limit = ref(10)
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
</script> 

<style>

</style>