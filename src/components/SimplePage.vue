<template>
<div>
  <q-card class="q-mt-md normal-shadow">
    <q-card-section>
      <CoreTable :columns="columns" :url="url" :request="request" :canSelect="canSelect" @onSelectedRows="getSelectedRows">
        <template v-slot:toptable>
          <slot name="slotfilter"></slot>
          <div class="flex justify-between q-mb-sm text-body1 items-center">
          <div>Menampilkan <span class="text-bold">{{pagination.totalRows}}</span> dari <span class="text-bold">{{pagination.rowsNumber}}</span></div>
          <div class="flex items-center">
            <span class="q-mr-sm"> Tampilkan</span>
            <q-select outlined :model-value="limit" :options="optionLimits" dense class="border-radius-8 " style="width:60px;height:40px;border:1px solid #EBE7E0;" @update:model-value="changeLimit"/>
          </div>
        </div>
        </template>
        <template v-for="(_, slot) in $slots" v-slot:[slot]="props">
          <slot :name="slot" v-bind="props" />
        </template>
      </CoreTable>
    </q-card-section>
  </q-card>
  <PaginateTable @onChangePage="changePage"/>
</div>
</template>

<script setup>
import CoreTable from 'components/CoreTable.vue'
import PaginateTable from 'components/PaginateTable.vue'
import { useStore } from 'vuex'
import { ref,computed } from 'vue'
const store = useStore()
const props = defineProps({
  columns:Array,
  url:String,
  request:Object,
  limit:{
    type:Number,
    default(){
      return 15
    }
  },
  filter:String,
  canSelect:{
    type:Boolean,
    default(){
      return false
    }
  },
  selectedRows:Array
})
const optionLimits = ref([5,10,15,'All'])
const pagination = computed(()=>{
  return store.state.table.pagination
})
const emit = defineEmits(['update:limit','update:request','update:selectedRows'])
const changeLimit = value =>{
  emit('update:limit',value)
  emit('update:request',
    {
      pagination : {
          page : 1,
          limit : value === 'All' ? 999 : value,
      },
      filter : props.filter 
    }
  )
}

const changePage = value => {
  emit('update:request',
    {
      pagination : {
          page : value,
          limit : props.limit === 'All' ? 999 : props.limit,
      },
      filter : props.filter
    }
  )
}

const getSelectedRows = values => {
  emit('update:selectedRows',values)
}
</script>

<style>

</style>