import { AuthClient } from '@dfinity/auth-client'
import { createActor, canisterId } from '@declarations/motoko_student_wall_dapp_backend'
import { toRaw } from 'vue'
import type { Identity, ActorSubclass } from '@dfinity/agent'
import type { _SERVICE } from '@declarations/motoko_student_wall_dapp_backend/motoko_student_wall_dapp_backend.did'
import { useRouter } from 'vue-router'
const router=useRouter();

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
}

export const useAuthStore = defineStore('auth', {
  state: () => {
    return {
      isReady: false,
      isAuthenticated: false,
      authClient: null,
      isRegistered: false,
      identity: null,
      wallActor: null
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
      return  this.router.push('/')
    }
  }
})
