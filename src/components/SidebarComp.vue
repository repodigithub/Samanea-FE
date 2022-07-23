<template>
    <q-drawer
      :model-value="true"
      width="264"
      dark
    >
    <div class="flex column text-center">
      <div class="q-my-lg">
        <img src="~assets/img/logo.png" alt="logo" width="165" height="25">
      </div>
      <div class="q-mt-sm flex q-gutter-md justify-center q-pb-lg">
        <div class="btn" v-for="(menu,index) in menus" :key="index">
          <q-btn color="accent" no-caps class="border-radius-8 q-pa-sm " style="width:216px;" align="left" v-if="!menu.submenu" :flat="$route.name.includes(menu.title) ? false : true" @click="$router.push({name : menu.title})" >
            <div class="flex">
              <img :src="require(`assets/icon/${menu.icon}.png`)" alt="icon-menu" class="q-mr-sm">
              <span class="text-white">{{menu.title}}</span>
            </div>
          </q-btn>
          <q-btn color="accent" no-caps class="border-radius-8 q-px-sm" style="width:216px;" align="between" v-else flat @click="openSubmenu(index)">
            <div class="flex">
              <img :src="require(`assets/icon/${menu.icon}.png`)" alt="icon-menu" class="q-mr-sm">
              <span class="text-white">{{menu.title}}</span>
            </div>
              <img :src="menu.opensubmenu ? require('assets/icon/arrow-up.png') : require('assets/icon/arrow-down.png')" alt="icon-menu" class="q-mr-sm">
          </q-btn>
          <div class="flex justify-center q-mt-md" v-if="menu.opensubmenu">
            <div class="q-mr-md q-ml-sm" style="border-left: 1px solid #D9D9D9;"></div>
            <div>
              <div class="sub-menus" v-for="(submenu,index) in menu.submenus" :key="index">
                <q-btn color="accent" no-caps class="border-radius-8 q-pa-sm q-my-xs" style="width:179px;" align="left">
                    <span class="text-white">{{submenu.title}}</span>
                </q-btn>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </q-drawer>
</template>

<script setup>
import { menus } from 'src/methods/menu'
  function openSubmenu(value) {
    menus.value[value].opensubmenu = !menus.value[value].opensubmenu
  }

</script>

<style>

</style>