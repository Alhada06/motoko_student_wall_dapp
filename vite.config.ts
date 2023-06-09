import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import EnvironmentPlugin from 'vite-plugin-environment'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'

// eslint-disable-next-line no-undef
const isDev = process.env['DFX_NETWORK'] !== 'ic'
// setting host to avoid errors when calling backend in the front end ;
const host = isDev ? 'http://127.0.0.1:8000' : 'https://ic0.app'

// https://vitejs.dev/config/
export default defineConfig({
  // to proxy were the dfx canisters run to be able to do calls to the backend while on dev and enable hot reload
  server: {
    proxy: {
      '/api': {
        target: 'http://0.0.0.0:8000',
        changeOrigin: true
      }
    }
  },

  plugins: [
    vue(),
    AutoImport({ dts: true,dirs:['src/motoko_student_wall_dapp_frontend/composables'], imports: ['vue', 'pinia', '@vueuse/core'] }),
    Components({
      dirs:['src/motoko_student_wall_dapp_frontend/components'],
      dts: true,
      types: [
        {
          from: 'vue-router',
          names: ['RouterLink', 'RouterView']
        }
      ],
      resolvers: [IconsResolver()]
    }),
    Icons(),
    // This is required for now because the code generated by dfx relies on process.env being set
    EnvironmentPlugin('all', { prefix: 'CANISTER_' }),
    EnvironmentPlugin('all', { prefix: 'DFX_' }),
    EnvironmentPlugin({ BACKEND_CANISTER_ID: '' })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src/motoko_student_wall_dapp_frontend', import.meta.url)),
      '@declarations': fileURLToPath(new URL('./src/declarations/', import.meta.url))
    }
  },
  define: {
    global: 'window',
    // This is required for now because the code generated by dfx relies on process.env being set
    'process.env.NODE_ENV': JSON.stringify(isDev ? 'development' : 'production'),
    //needed mostly for development to be able to call the backend
    'process.env.VITE_HOST': JSON.stringify(host)
  }
})
