<template>
  <div class="row auth" style="min-height:100vh;">
    <img src="~assets/img/auth.png" alt="image-auth" srcset="" class="col-4" style="object-fit: fill;">
    <div class="col-8 bg-main-background content">
      <div class="main flex justify-center items-center column">
        <img src="~assets/img/logo.png" alt="image-logo" class="q-mt-md">
        <q-card class="normal-shadow border-radius-8 auth-card" style="min-width:380px;max-width:580px;">
          <q-card-section class="text-center">
            <div class="text-h5 text-bold">{{$route.name.includes('login') ? 'Masuk' : 'Daftar'}}</div>
            <div class="text-subtitle2 text-weight-regular tx-soft-black">{{$route.name.includes('login') ?'Belum': 'Sudah'}} punya akun? 
            <q-btn color="primary" no-caps flat class="q-pl-none" @click="$router.push({ name : $route.name.includes('login') ? 'register' : 'login'})"> 
              <span style="text-decoration: underline;">
                {{$route.name.includes('login') ?'Daftar': 'Masuk'}} Disini
              </span> 
            </q-btn>
            </div>
          </q-card-section>
          <q-card-section class="q-px-lg">
            <router-view />
          </q-card-section>
        </q-card>
      </div>
      <div class="footer q-pt-lg" style="color:#7B7B7B;margin-left:32px;">
        <span>© All Rights Reserved PT. Investasi Semesta Indonesia 2022</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>