import Home from './Home'
import New from './New'
import NewDetail from './NewDetail'
import NewSearch from './NewSearch'
import NewHome from './NewHome'

export default [
  {
    path: '/',
    component: Home
  },
  {
    path: '/news',
    component: New,
    children: [
      {
        path: '/',
        exact:true,
        component: NewHome
      },
      {
        path: '/detail',
        exact:true,
        component: NewDetail
      },
      {
        path: '/search',
        exact:true,
        component: NewSearch
      }
    ]
  },
]