<template>
  <div class="flex justify-center q-mt-md">
      <q-pagination
        :model-value="pagination.page"
        direction-links
        :max="pagination.pageNumber"
        :max-pages="6"
        boundary-numbers
        @update:model-value="gotoPage"
        color="primary"
      />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
const pagination = computed(()=>{
  return store.state.table.pagination
})
const emit = defineEmits(['onChangePage'])
const gotoPage = value => {
  emit('onChangePage',value)
}
</script>
