<template>
  <q-layout view="lHh Lpr lFf">
    <q-header bordered class="bg-white text-black">
      <q-toolbar style="padding:16px 40px;">

        <q-toolbar-title>
          <div class="text-h5 text-bold">
            {{$route.name}}
          </div>
        </q-toolbar-title>
          <q-btn dense round flat class="q-mr-lg">
            <img src="~assets/icon/notification.png" alt="icon-notification">
            <!-- <q-badge color="red" floating transparent>
              1
            </q-badge> -->
          </q-btn>
        <div class="row items-center cursor-pointer" @click="showing != showing">
          <q-avatar class="btn-radius" color="primary" text-color="white" size="40px">J</q-avatar>
          <div class="flex column q-mx-sm">
            <span class="tx-main-dark-primary text-bold fs-12">Jay Hargudson</span>
            <div class="div q-mt-sm">
              <span class="text-blue text-bold bg-soft-blue q-pa-sm rounded-borders fs-12">Manager</span>
            </div>
          </div>
          <img :src="showing ? require('assets/icon/arrow-up.png') : require('assets/icon/arrow-down.png')" alt="icon-menu" class="text-black" style="filter:invert(1);">
          
          <q-menu style="width:150px;" v-model="showing">
            <q-list >
              <q-item clickable >
                <q-item-section side center>
                  <img src="~assets/icon/edit.png" alt="">
                </q-item-section>
                <q-item-section class="text-black">Edit Profile</q-item-section>
              </q-item>
              <q-item clickable >
                <q-item-section side center>
                  <img src="~assets/icon/logout.png" alt="">
                </q-item-section>
                <q-item-section class="text-black">Logout</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </div>
      </q-toolbar>
    </q-header>

    <SidebarComp />

    <q-page-container class="dashboard-background">
      <q-page style="padding:32px 40px;">
        <router-view />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import SidebarComp from 'components/SidebarComp.vue'

import { defineComponent,ref } from 'vue'
export default defineComponent({
  name: 'DashboardLayout',
  setup(){
    const showing = ref(false)
    return {
      showing,
    }
  },
  components: {
    SidebarComp
  },

})
</script>
