import { useQuasar,date } from 'quasar'
import { api } from 'boot/axios'
import { useStore } from 'vuex'
export const generalMethods = () => {
  const $q = useQuasar()
  const showLoading = () => {
    $q.loading.show({
        message: 'Memuat...'
    })
  }
  
  const hideLoading = () => {
    $q.loading.hide()
  }

  const successNotif = msg => {
    return $q.notify({
        message: msg,
        icon:'check',
        type: 'positive',
        position: 'top-right',
        progress: true,
        actions: [
            { label: 'close', color: 'white', handler: () => { /* ... */ } }
        ]
    })
  }
  const errorNotif = (msg,isHtml = false) => {
    $q.notify({
        message: msg,
        icon:'close',
        type: 'negative',
        position: 'top-right',
        progress: true,
        actions: [
            { label: 'close', color: 'white', handler: () => { /* ... */ } }
        ],
        html:isHtml
    })
  }

  const formatDate = (tgl,format) => {
    return date.formatDate(tgl,format,{
        months: ['Januari', 'Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'],
        monthsShort: ['Jan', 'Feb', 'Mar','Apr','Mei','Jun','Jul','Agus','Sept','Okt','Nov','Des'],
    })
  }

  const store = useStore()
  let token = store.state.auth.token
  let config = {
    headers: {
        Authorization : `Bearer ${token}`
    },
  }

  const getData = (url,islogin = true) => {
    return api.get(url,islogin ? config : '')
  }

  const postData = (url,data,islogin = true) =>{
    return api.post(url,data,islogin ? config : '')
  }

  const putData = (url,data,islogin = true) =>{
    return api.put(url,data,islogin ? config : '')
  }
  const deleteData = (url,islogin = true) =>{
    return api.delete(url,islogin ? config : '')
  } 

  return {
    showLoading,
    hideLoading,
    successNotif,
    errorNotif,
    formatDate,
    getData,
    postData,
    putData,
    deleteData
  }
}