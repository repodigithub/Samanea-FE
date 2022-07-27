<template>
<div>
  <div class="row items-center justify-center text-center q-mb-sm">
    <div class="col-4 text-center">
        <div class="text-bold">Hapus User?</div>
    </div>
    <span class="q-ml-sm col-12 grey1">Anda yakin menghapus user {{dataDialog.nama_produk}}? setelah dihapus user tidak akan bisa dikembalikan</span>
  </div>
  <div class="row q-col-gutter-md">
    <div class="col-6">
      <q-btn color="grey" outline label="Batalkan" no-caps @click="$emit('closeDialog')" unelevated class="full-width border-radius-8" />
    </div>
    <div class="col-6">
      <q-btn color="negative" label="Hapus" no-caps @click="$emit('onDelete')" unelevated class="full-width border-radius-8"/>
    </div>
  </div>    
</div>
</template>

<script>
export default {
  props:['dataDialog']
}
</script>

<style>

</style>