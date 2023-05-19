import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutViewVue from '@/views/AboutView.vue'
import RegisterView from '@/views/RegisterView.vue'
import { useAuthStore } from '@/stores/auth'
import toast ,{ToastType}from '@/composables/toast'


const router = createRouter({
  
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
     
    },
    {
      path: '/about',
      name: 'about',
      component: AboutViewVue,
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import('../views/AboutView.vue')
      
    },
    {
      path:'/register',
      name:'register',
      component:RegisterView,
      meta:{
        requiresAuth:true,
        requiresNotReg:true,
      }

    
    }
  ]
})
// router.beforeEach((to,from)=>{

//   const {isAuthenticated, isRegistered}=useAuthStore();
  
//   if(to.name==='register' && !isAuthenticated){
//     return {name:'home'}
//   }else if(to.name==='register'&& (isAuthenticated && isRegistered)){
//     return {name:'home'}
//   }

// })
// const {isAuthenticated, isRegistered}=useAuthStore();
// router.beforeEach((to, from, next) => {
//   if (to.name !== 'home' && !isAuthenticated) next({ name: 'home' })
//   else next()
// })

router.beforeEach((to,from )=>{

  const authStore=useAuthStore();

  // if (to.meta.requiresAuth && !authStore.isAuthenticated) return '/'
  if(to.matched.some((record)=>record.meta.requiresAuth)){
    console.log(authStore.isAuthenticated)
    if(!authStore.isAuthenticated){
     
      toast.add({message:'You are not Authenticated please Login',type:ToastType.info})
        return {name:'home'}
    }else{
      //is authenticaded but needs to match other 
      if(to.matched.some((record)=>record.meta.requiresNotReg)){
        if(authStore.isRegistered){
          console.log("this shouldnt happen")
          toast.add({message:"You don't have premission",type:ToastType.error})
          return{name:'home'}
        }

      }



    }
    
  };

  // //notreg
  // if(to.matched.some((record)=>record.meta.requiresNotReg)){
  //   if(!authStore.isRegistered){
  //     next();
  //   }else{
  //     next({name:'home'});
  //   }

  // }else{
  //   next();
  // }
  


})

export default router
