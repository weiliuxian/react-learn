import Home from './Home'
import New from './New'
import NewDetail from './NewDetail'
import NewSearch from './NewSearch'
import NewHome from './NewHome'

export default [
  {
    path: '/',
    exact:true,
    component: Home,
    name: 'home'
  },
  {
    path: '/news',
    component: New,
    name: 'news',
    // exact:true,
    children: [
      {
        path: '/',
        exact:true,
        component: NewHome,
        name: 'newsHome'
      },
      {
        path: '/detail',
        exact:true,
        component: NewDetail,
        name: 'newsDetail'
      },
      {
        path: '/search',
        exact:true,
        component: NewSearch,
        name: 'newsSearch'
      }
    ]
  },
]