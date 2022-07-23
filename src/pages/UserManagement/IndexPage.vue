<template>
  <div class="flex">
    <q-btn flat no-caps class="q-pb-none" @click="showTable = 'DataUser'">
      <span class="text-bold" :class="showTable.includes('DataUser') ? 'text-primary' : 'tx-soft-black'" >Semua User</span>
      <div style="border-bottom:2px solid #B59F5A;height:2px;width:100%;" v-if="showTable.includes('DataUser')"></div>
    </q-btn>
    <q-btn flat no-caps class="q-pb-none" @click="showTable = 'RequestUser'">
      <span class="text-bold" :class="showTable.includes('RequestUser') ? 'text-primary' : 'tx-soft-black'" >Request User</span>
      <div style="border-bottom:2px solid #B59F5A;height:2px;width:100%;" v-if="showTable.includes('RequestUser')"></div>
    </q-btn>
    <div style="border-bottom:1px solid #EBE7E0;width:100%;margin-top:-4px;"></div>
  </div>
  <q-card class="q-mt-md normal-shadow">
    <q-card-section>
      <CoreTable>
        <template v-slot:toptable>
          <div class="flex justify-between">
            <div>Filter</div>
            <q-btn color="primary" icon="add" label="Tambah User" no-caps unelevated class="border-radius-8"/>
          </div>
          <div class="flex justify-between q-mb-md text-body1 items-center">
          <DividerComp class="q-my-lg"/>
          <div>Menampilkan <span class="text-bold">15</span> dari <span class="text-bold">100</span></div>
          <div class="flex items-center">
            <span class="q-mr-sm"> Tampilkan</span>
            <input type="text" v-model="showData" style="width:40px;height:40px;border:1px solid #EBE7E0;" class="border-radius-8 text-center">
          </div>
        </div>
        </template>
      </CoreTable>

    </q-card-section>
  </q-card>
</template>

<script setup>
import { ref } from 'vue'
import CoreTable from 'components/CoreTable.vue'
import DividerComp from 'components/DividerComp.vue'
const showTable = ref('DataUser')
const showData = ref('15')
</script> 

<style>

</style>