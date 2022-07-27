<template>
  <div>
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
    <component :is="showTable"/>
  </div>
</template>

<script>
import DataUser from './DataUser.vue'
import RequestUser from './RequestUser.vue'
export default {
  data(){
    return {
      showTable:'DataUser'
    }
  },
  components:{
    DataUser,
    RequestUser,
  }
}
</script> 

<style>

</style>