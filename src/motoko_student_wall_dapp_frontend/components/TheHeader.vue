<script lang="ts" setup>

</script>
<template>
   
    <div class="drawer w-full text-base-content">
        <input id="my-drawer-3" type="checkbox" class="drawer-toggle" /> 
        <div class="drawer-content flex flex-col">
          <!-- Navbar -->
          <div class="w-full navbar bg-base-300 fixed left-0 right-0 top-0  z-10 mb-5  text-base-content">
            <div class="flex-none lg:hidden">
              <label htmlFor="my-drawer-3" class="btn btn-square btn-ghost">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
              </label>
            </div> 
            <div class="flex-1 px-2 mx-2"> <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="75" height="75" /> Motoko Bootcamp Wall</div>
           
            <div class="flex-none hidden lg:block">
              <ul class="menu menu-horizontal rounded">
                <!-- Navbar menu content here -->
               <li> <RouterLink activeClass="active"  to="/">Home</RouterLink></li>
               <li> <RouterLink to="/about"  activeClass="active" >About
                </RouterLink></li>
                <li><TheThemeSwitch/></li>
              </ul>
            </div>
          </div>
          <!-- Page content here -->
          <div class="w-full h-full mt-10 overflow-y-scroll px-4">
            
            <slot/>
          </div>

        </div> 
        <div class="drawer-side">
          <label htmlFor="my-drawer-3" class="drawer-overlay"></label> 
          <ul class="menu p-4 w-40 md:w-80 bg-base-100">
            <!-- Sidebar content here -->
            <li> <RouterLink activeClass="active"  to="/">Home</RouterLink></li>
            <li> <RouterLink to="/about"  activeClass="active" >About
             </RouterLink></li>
            <li><TheThemeSwitch/></li>
          </ul>
          
        </div>
      </div>
</template>