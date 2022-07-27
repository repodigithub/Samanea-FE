export function setLogin(state,data){
    // state.token = data.token
    state.token = data.access_token
    state.user = data.user
}

export function setLogout(state){
    state.user = ''
    state.token = ''
}

export function saveUser(state,data){
    state.user = {
        full_name : data.full_name,
        kode_group : data.kode_group
    }
}
