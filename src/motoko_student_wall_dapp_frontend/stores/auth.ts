
import { AuthClient } from '@dfinity/auth-client'
import { createActor, canisterId } from '@declarations/motoko_student_wall_dapp_backend'
import { toRaw } from 'vue'
import type { Identity, ActorSubclass } from '@dfinity/agent'
import type { _SERVICE,Profile } from '@declarations/motoko_student_wall_dapp_backend/motoko_student_wall_dapp_backend.did'
import toast, { ToastType } from '@/composables/toast'
import { StorageSerializers } from '@vueuse/core'


const defaultOptions = {
  /**
   *  @type {import("@dfinity/auth-client").AuthClientCreateOptions}
   */
  createOptions: {
    idleOptions: {
      // Set to true if you do not want idle functionality
      disableIdle: true
    }
  },
  /**
   * @type {import("@dfinity/auth-client").AuthClientLoginOptions}
   */
  loginOptions: {
    identityProvider:
      process.env.DFX_NETWORK === 'ic'
        ? 'https://identity.ic0.app/#authorize'
        : `http://localhost:8000?canisterId=${process.env.CANISTER_ID_INTERNET_IDENTITY}#authorize`
  }
}

function actorFromIdentity(identity: Identity) {
  return createActor(canisterId, {
    agentOptions: {
      identity
    }
  })
}

export type RootState = {
  isReady: Boolean
  isAuthenticated: Boolean
  isRegistered: Boolean
  authClient: AuthClient | null
  identity: Identity | null
  wallActor: ActorSubclass<_SERVICE> | null
  user:Profile |null |undefined
}

export const useAuthStore = defineStore('auth', {
  state: () => {
    return {
      isReady: false,
      isAuthenticated: useLocalStorage('isAuth', false) as unknown as Boolean,
      authClient: null,
      isRegistered: useLocalStorage('isReg', false) as unknown as Boolean,
      identity: null,
      wallActor: null,
      user: useLocalStorage('user', null, { serializer: StorageSerializers.object }) as unknown as Profile 
    } as RootState
  },
  actions: {
    async init() {
      const authClient = await AuthClient.create(defaultOptions.createOptions)
      this.authClient = authClient
      const isAuthenticated = await authClient.isAuthenticated()
      const identity = isAuthenticated ? authClient.getIdentity() : null
      const wallActor = identity ? actorFromIdentity(identity) : null

      this.isAuthenticated = isAuthenticated
      this.identity = identity
      this.wallActor = wallActor
      this.isReady = true
    },
    async login() {
      const authClient = toRaw(this.authClient)
      authClient?.login({
        ...defaultOptions.loginOptions,
        onSuccess: async () => {
          this.isAuthenticated = await authClient.isAuthenticated()
          this.identity = this.isAuthenticated ? authClient.getIdentity() : null
          this.wallActor = this.identity ? actorFromIdentity(this.identity) : null
          this.isRegistered = this.identity&&this.wallActor? await this.wallActor.isRegistered(this.identity.getPrincipal()) :false;
          this.user= this.isRegistered&&this.wallActor? await this.wallActor.getMyProfile().then((p)=>{if(p){return p[0]}else{return null}}):null;
          toast.add({message:"You're logged in!",type:ToastType.success})
          if(this.isAuthenticated&& !this.isRegistered){
          return  this.router.push('/register')
          }
          
        }
      })
    },
    async logout() {
      const authClient = toRaw(this.authClient)
      await authClient?.logout()
      this.isAuthenticated = false
      this.identity = null
      this.wallActor = null
      this.user=null
        toast.add({message:"You have logged out!",type:ToastType.info})
      return  this.router.push('/')
    
    }
  }
})
