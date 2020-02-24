import Vue from 'vue'
import VueRouter from 'vue-router'

const Login =()=>import('views/Login')
const Home =()=>import('views/Home')

const Welcome =()=>import ('views/Welcome')
const Users =()=>import ('views/Users')
const Roles =()=>import('views/Roles')
const Rights =()=> import ('views/Rights')
const Cate =()=> import ('views/Cate')
const Params=()=>import('views/Params')
const List=()=>import ('views/List')
const AddGood=()=>import('views/AddGood')
const Order=()=> import ('views/Order')
const Report=()=>import ('views/Report')

Vue.use(VueRouter)

const routes = [
  {
    path:"/",
    redirect:'/login'
  },
  {
    path:"/login",
    component:Login
  },
  {
    path:"/home",
    component:Home,
    redirect:'/welcome',
    children:[
      {
        path:'/welcome',
        component:Welcome
      },
      {
        path:'/users',
        component:Users
      },{
        path:'/roles',
        component:Roles
      },
      {
        path:'/rights',
        component:Rights
      },
      {
        path:'/categories',
        component:Cate
      },{
        path:'/params',
        component:Params
      },{
        path:'/goods',
        component:List
      },{
         path:'/goods/add',
         component:AddGood
      },{
        path:'/orders',
        component:Order
      },
      {
        path:'/reports',
        component:Report
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'hash', //使用history 会有一些问题
  base: process.env.BASE_URL,
  routes
})
//挂载 导航守卫
router.beforeEach((to,from,next)=>{
  if(to.path=='/login')
  return next();
  const token=sessionStorage.getItem('token');
  //没有登录，强制 跳转 登录页面
  if(!token)
  return next('/login');
  next();
})

export default router
