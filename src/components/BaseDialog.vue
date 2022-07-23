<template>
  <div class="flex justify-end">
      <div class="bg-white border-radius-8 flex items-center justify-center q-mb-sm cursor-pointer" style="width:32px;height:32px;" @click="$emit('closeDialog')">
          <img src="~assets/icon/close.png" alt="close">
      </div>
      <div class="bg-white border-radius-8 q-pa-lg">
        <slot name="content-dialog"></slot>
      </div>
    </div>
</template>

<script>
export default {

}
</script>

<style>

</style>