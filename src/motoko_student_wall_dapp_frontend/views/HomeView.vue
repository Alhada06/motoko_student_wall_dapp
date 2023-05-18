<script setup lang="ts">
import { canisterId, createActor } from '@declarations/motoko_student_wall_dapp_backend'
import { useAuthStore } from '@/stores/auth'
import { useRoute, useRouter } from 'vue-router';
import toast from '@/composables/toast';

const rout=useRoute();
const router=useRouter();
if(rout.query){
  console.log(rout.query)
}

const authStore = useAuthStore()
const { isAuthenticated ,user} = storeToRefs(authStore)
const greeting = ref<string>('')
const input = ref<string>('')

const actor = createActor(canisterId, { agentOptions: { host: process.env.VITE_HOST } })
const pendding = ref(false)
const submit = async () => {
  try {
    greeting.value = ''
    pendding.value = true
    actor.greet(input.value).then((greet: string) => {
      pendding.value = false
      greeting.value = greet
    })
  } catch (error) {
    console.error(error)
  }
}
const me = ref('')
const profile =ref();
const proJ=ref();
const whoami = () => {
  authStore.wallActor?.whoami().then((res) => {
    me.value = res as unknown as string
  })
}
const getProfile=()=>{
  authStore.wallActor?.getMyProfile().then((p)=>{
      
      profile.value=p;
  })
}
const addToast=()=>{
toast.add({message:"test tpoast add"})
}
// const submit=()=>{
//     console.log("submited")
// }
</script>

<template>
  <div class="flex content-center justify-center flex-col">
    <div class="card w-1/3 bg-base-200 shadow-xl dark:shadow-white/20">
      <div class="card-body items-center text-center">
        <h2 class="card-title text-center">Test Greet function</h2>
        <form @submit.prevent="submit" class="form-control">
          <div class="input-group">
            <input
              v-model="input"
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
        <div v-if="pendding" class="card-title mt-4 text-center">...</div>
        <div v-if="greeting" class="card-title mt-4 text-center">
          {{ greeting }}
        </div>
      </div>
    </div>
    <div v-if="isAuthenticated" class="card w-1/3 bg-base-200 shadow-xl dark:shadow-white/20">
      <div class="card-body items-center text-center">
        <h2 class="card-title text-center">WHOAMI</h2>
        <form @submit.prevent="whoami" class="form-control">
          <button type="submit" class="btn-secondary btn">who am i ?</button>
        </form>

        <div class="card-title mt-4 text-center">
          {{ me }}
        </div>
      </div>
    </div>
    <div v-if="isAuthenticated">
    <button @click="getProfile" class="btn-secondary btn">profile</button>
    <div v-if="profile">
      {{ profile }}
    </div>
   
  </div> <div v-if="isAuthenticated">
      {{ user }}
    </div>
    <button class="btn btn-secondary"  @click="addToast">add toast</button>
  </div>
</template>
