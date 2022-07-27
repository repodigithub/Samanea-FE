<template>
  <div class="core-table">
    <slot name="toptable" />
    <q-table
        :rows="rows"
        :columns="columns"
        :filter="filter"
        :loading="loading"
        row-key="id"
        flat
        bordered
        class="my-sticky-header-table border-radius-8"
        hide-pagination
        v-model:pagination="pagination"
        @request="onRequest"
        :selection="canSelect ? 'multiple' : 'none'"
        :selected="selected"
        @update:selected="onUpdateSelected"
      >
      <template v-slot:loading>
          <q-inner-loading showing color="primary" />
      </template>
      <template v-for="(_, slot) in $slots" v-slot:[slot]="props">
          <slot :name="slot" v-bind="props" />
      </template>
    </q-table>
  </div>
</template>

<script setup>
import { ref,onMounted, computed,watch } from 'vue'
import { generalMethods } from 'src/methods/generalMethods'
import { useStore } from 'vuex'
const store = useStore()

const { getData } = generalMethods()
const props = defineProps({
  columns: Array,
  url:String,
  request:Object,
  canSelect:{
    type:Boolean,
    default(){
      return false
    }
  },
})

const pagination = computed(()=>{
  return store.state.table.pagination
})

const rows = computed(()=>{
  return store.state.table.rows
})

const filter = computed(()=>{
  return store.state.table.filter
})

const loading = ref(false)
const loadData = (url) => {
  loading.value = true
  store.dispatch('table/init',url)
  .then(()=> loading.value = false)
  .catch(()=> loading.value = false)
}

const onRequest = request => {
  const {page, limit}  = request.pagination
  let urlRequest = `${props.url}`
  if(page) {
    urlRequest += `?page=${page}`
  }
  if(limit) {
    urlRequest += `&limit=${limit}`
  }
  if(request.filter) {
    urlRequest += request.filter
  }

  loadData(urlRequest)
}

watch(()=> props.request, val =>{
    onRequest(val)
},{ deep: true })

onMounted(()=>{
  loadData(props.url)
})

// Selected Rows
const selected = ref([])
const emit = defineEmits(['onSelectedRows'])
const onUpdateSelected = values => {
  selected.value = values
  emit('onSelectedRows',values)
}
</script>

<style>

</style>