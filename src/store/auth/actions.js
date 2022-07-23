import { api } from 'boot/axios'

export function login(context,payload) {
    return api.post('auth/login',payload)
    .then(response=>{
        context.commit('setLogin',response.data)
        this.$router.push({name : 'Dashboard'})
    })
}

export function logout(context){
    this.$router.push('/login')
    context.commit('setLogout')
    context.commit('changeRole','Loading...')
}

export function forgot(context,payload){
    return  api.post('forgot',payload)
        .then(()=>{
            this.$router.push('forgot-success')
        })
}

export function register(context,payload){
    return api.post('auth/register',payload)
}

export function saveUser(context,payload){
    context.commit('saveUser',payload)
}

export function changeRole(context,payload){
    context.commit('changeRole',payload)
}
