
<script setup lang="ts">
import toast, { ToastType } from '@/composables/toast';
import { useAuthStore } from '@/stores/auth';
import { useRouter, } from 'vue-router';

const router=useRouter()
const authStore=useAuthStore();
const name=ref('')

const submit= async ()=>{
    try {
        authStore.wallActor?.addMyProfile({name:name.value}).then(()=>{
            authStore.user={name:name.value}
            authStore.isRegistered=true;
            toast.add({message:'Successfully registered!',type:ToastType.success})
            router.push('/')
        })
        
    } catch (error) {
        console.log(error)
    }

}

</script>

<template>
    <div class="flex content-center justify-center">
        <div class="card w-1/3 bg-base-200 shadow-xl dark:shadow-white/20">
          <div class="card-body items-center text-center">
            <h2 class="card-title text-center">Register</h2>
            <form @submit.prevent="submit" class="form-control">
              <div class="input-group">
                <input
                  v-model="name"
                  type="text"
                  placeholder="Your Name"
                  required
                  class="input-bordered input"
                />
                <button type="submit" class="btn-square btn">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              </div>
            </form>
          
          </div>
        </div>
    </div>
</template>