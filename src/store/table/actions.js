import { api } from 'boot/axios'
export function onSetPaginate(context,payload){
  context.commit('setPagination',payload)
}

export function init(context,payload){
  return api.get(payload,{
    headers: {
        Authorization : `Bearer ${context.rootState.auth.token}`
    }
  })
  .then(result=>{
    let data = result?.data?.data ?? ''
    context.commit('onInit',data)
  })
}