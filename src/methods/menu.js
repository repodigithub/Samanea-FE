const level = ['sales', 'team_leader', 'supervisor', 'manager'];
import { ref } from 'vue'
const menus = ref([
  {
      title:'Dashboard',
      icon: 'dashboard',
      submenu:false
  },
  // {
  //     title:'Leads Management',
  //     icon: 'leadsmanagement',
  //     submenu:true,
  //     opensubmenu:false,
  //     submenus: [
  //       {title: 'Leads Activity'},
  //       {title: 'Lost Management'},
  //       {title: 'Import Leads'},
  //     ]
  // },
  // {
  //     title:'Sales Management',
  //     icon: 'salesmanagement',
  //     submenu:false
  // },
  // {
  //   title:'Leads Database',
  //   icon: 'leadsdatabase',
  //   submenu:false
  // },
  // {
  //   title:'Campaign Monitoring',
  //   icon: 'campaignmonitoring',
  //   submenu:false
  // },
  // {
  //   title:'Property Management',
  //   icon: 'propertymanagement',
  //   submenu:false
  // },
  // {
  //   title:'Reporting',
  //   icon: 'reporting',
  //   submenu:true,
  //   opensubmenu:false,
  //   submenus: [
  //     {title: 'Sales Reporting'},
  //     {title: 'Leads Reporting'},
  //   ]
  // },
  {
      title:'User Management',
      icon: 'usermanagement',
      submenu:false
  }
])

export { menus }