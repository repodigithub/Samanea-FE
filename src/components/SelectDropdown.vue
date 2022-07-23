<template>
    <div v-show="isValid">
        <slot name="labelSelect"></slot>
        <q-select  outlined dense :modelValue="selected"
            @update:modelValue="event => onSelected(event)" 
            :options="options" 
            hide-bottom-space 
            emit-value
            map-options
            use-input
            hide-selected
            fill-input
            :placeholder="placeHold"
            input-debounce="1000"
            @filter="onFilter"
            :loading="loading"
            dropdown-icon="expand_more"
            @virtual-scroll="onScroll"
            :virtual-scroll-slice-size="2"
            :virtual-scroll-item-size="30"
            id="selectdrop"
            >
            <template v-slot:no-option>
                <q-item>
                    <q-item-section class="text-grey">
                    No results
                    </q-item-section>
                </q-item>
            </template>
        </q-select>
    </div>
</template>

<script>
import { ref,nextTick } from 'vue'
import { generalMethods } from 'src/methods/generalMethods'
export default {
    name:'select-dropdown',
    props: {
        placeHold: {
            type: String,
            default: ""
        },
        url: {
            type: String,
        },
        selected: {
            type: String,
        },
        islogin: {
            type: Boolean,
            default: false
        },
        isNormal:{
            type:Boolean,
            default:false
        },
        isSearchNormal:{
            type:Boolean,
            default:false
        },
        isPageNormal:{
            type:Boolean,
            default:false
        }
    },
    setup(props, context){
        const loading = ref(false)
        const dataOptions = ref([])
        const options = ref([])
        const { getData } = generalMethods()
        const searchUrl = ref('')
        const searchKey = ref('')
        let response = ''
        const nextPage = ref(null)
        const lastPage = ref(null)
        const optalt = []
        const isValid = ref(false)
        getData(props.url,props.islogin)
        .then(res=>{
            dataOptions.value = res.data.data.data
            res.data.data.data.forEach((item)=>{
                response = Object.values(item)
                if(props.isNormal){
                    optalt.push({
                        label:`${response[1]} - ${response[2]}`,
                        value:response[1],
                    })
                }else{
                    optalt.push({
                        label:response[1],
                        value:response[1],
                    })
                }
            })
            isValid.value = true
            nextPage.value = res.data.data.current_page + 1
            lastPage.value = res.data.data.last_page
        })

        function onFilter(val,update,abort){
            if(val === ''){
                options.value = []
                searchKey.value = ''
                searchUrl.value = ''
                loading.value = true
                update(()=>{
                    options.value = optalt
                    loading.value = false
                })
            }else{
                loading.value = true
                searchKey.value = val.toLowerCase()
                options.value = []
                searchUrl.value = props.isSearchNormal ? `?search=${searchKey.value}` : `&search=${searchKey.value}`
                getData(props.url+searchUrl.value,props.islogin)
                .then(res=>{
                    update(()=>{
                        res.data.data.data.forEach((item)=>{
                            response = Object.values(item)
                            if(props.isNormal){
                                options.value.push({
                                    label:`${response[1]} - ${response[2]}`,
                                    value:response[1],
                                })
                            }else{
                                options.value.push({
                                    label:response[1],
                                    value:response[1],
                                })
                            }
                        })
                        nextPage.value = res.data.data.current_page + 1
                        lastPage.value = res.data.data.last_page
                        loading.value = false
                    })
                })
            }
        }

        function onScroll({ index,ref }){
            const lastIndex = options.value.length - 1
            if (loading.value !== true && nextPage.value <= lastPage.value && index === lastIndex) {
                loading.value = true
                let localurl = ''
                if(props.isPageNormal){
                    if(searchUrl.value){
                        localurl = `${props.url}${searchUrl.value}&page=${nextPage.value}`
                    }else{
                        localurl = `${props.url}?page=${nextPage.value}`
                    }
                }else {
                    localurl = `${props.url}${searchUrl.value}&page=${nextPage.value}`
                }
                getData(localurl,props.islogin)
                .then(res=>{
                    nextTick( () => {
                        res.data.data.data.forEach((item)=>{
                            response = Object.values(item)
                            if(props.isNormal){
                                options.value.push({
                                    label:`${response[1]} - ${response[2]}`,
                                    value:response[1],
                                })
                            }else{
                                options.value.push({
                                    label:response[1],
                                    value:response[1],
                                })
                            }
                        })
                        lastPage.value= res.data.data.last_page
                        nextPage.value= res.data.data.current_page + 1
                        ref.refresh()
                        loading.value = false
                    })
                })
            }
        }
        function onSelected(val) {
            let findX = dataOptions.value.find(e => e.id == val)
            if(findX) {
                context.emit('update', findX)
            }
            context.emit('update:selected', val)
        }

        return {
            onSelected,
            isValid,
            options,
            loading,
            onFilter,
            onScroll
        }
    }

}
</script>

<style>

</style>