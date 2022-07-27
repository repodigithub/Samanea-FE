import { ref,watch } from 'vue'
import { generalMethods } from './generalMethods'

export const formRegister = () => {
  const { getData } = generalMethods()
  const error = ref(null)
  const form = ref('')
  const formData = ref({
    email :'testadd@gmail.com',
    password: 'password',
    password_confirmation:'password',
    fullname:'testadd',
    telphone:'08123546789',
    level:'manager',
    supervisor:null,
    team_leader:null,
  })
  const visibility = ref(true)
  const visibility2 = ref(true)
  const optionLevel = ref([
    { label : 'Sales',value : 'sales'},
    { label : 'Team Leader',value : 'team_leader'},
    { label : 'Supervisor',value : 'supervisor'},
    { label : 'Manager',value : 'manager'}
  ])

  const teamleader = ref(null)
  const supervisor = ref(null)
  const namesupervisor = ref(null)
  const onTeamLeaderSelected = value => {
    let data = value.find(v => v.id == teamleader.value)
    getData(`auth/register/supervisor/${data.supervisor}`)
    .then(res=>{
      namesupervisor.value = res.data.data.fullname
      formData.value.team_leader = data.id
      formData.value.supervisor = res.data.data.id
    })
  }
  const onSupervisorSelected = value => {
    formData.value.supervisor = supervisor.value
  }

  watch(()=>formData.value.level,val=>{
    formData.value.supervisor = null
    formData.value.team_leader = null
    teamleader.value = ''
    supervisor.value = ''
  })
  return {
    error,
    form,
    formData,
    visibility,
    visibility2,
    optionLevel,
    teamleader,
    supervisor,
    namesupervisor,
    onTeamLeaderSelected,
    onSupervisorSelected
  }
}
