<script lang="ts" setup>

import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const { isAuthenticated } = storeToRefs(authStore)

</script>
<template>
  <div class="drawer w-full text-base-content">
    <input id="my-drawer-3" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content flex flex-col">
      <!-- Navbar -->
      <div class="navbar fixed left-0 right-0 top-0 z-10 mb-5 w-full bg-base-300 text-base-content">
        <div class="flex-none lg:hidden">
          <label htmlFor="my-drawer-3" class="btn-ghost btn-square btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              class="inline-block h-6 w-6 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </label>
        </div>
        <div class="mx-2 flex-1 px-2">
          <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="75" height="75" /> Motoko
          Bootcamp Wall
        </div>

        <div class="hidden flex-none lg:block">
          <ul class="menu menu-horizontal rounded">
            <!-- Navbar menu content here -->
            <li><RouterLink activeClass="active" to="/">Home</RouterLink></li>
            <li><RouterLink to="/about" activeClass="active">About </RouterLink></li>
            <li><TheThemeSwitch /></li>
            <button v-if="isAuthenticated" class="btn-primary btn" @click="authStore.logout()">
              Log Out
            </button>
            <button v-else class="btn-primary btn" @click="authStore.login()">Log In</button>
          </ul>
        </div>
      </div>
      <!-- Page content here -->
      <div class="mt-10 h-full w-full overflow-y-auto px-4">
        <div class="mt-10 grid max-h-full scroll-pt-16 grid-cols-12 gap-2">
          <div class="col-span-10 col-start-2">
            <slot />
          </div>
        </div>
      </div>
    </div>
    <div class="drawer-side">
      <label htmlFor="my-drawer-3" class="drawer-overlay"></label>
      <ul class="menu w-40 bg-base-100 p-4 md:w-80">
        <!-- Sidebar content here -->
        <li><RouterLink activeClass="active" to="/">Home</RouterLink></li>
        <li><RouterLink to="/about" activeClass="active">About </RouterLink></li>
        <li><TheThemeSwitch /></li>
      </ul>
    </div>
  </div>
</template>
