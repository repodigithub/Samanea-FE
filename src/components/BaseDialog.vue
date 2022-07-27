<template>
  <div class="row justify-end" style="width:440px;">
      <div class="bg-white border-radius-8 flex items-center justify-center q-mb-sm cursor-pointer col-12" style="width:32px;height:32px;" @click="$emit('closeDialog')">
          <img src="~assets/icon/close.png" alt="close">
      </div>
      <div class="bg-white border-radius-8 q-pa-lg col-12">
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