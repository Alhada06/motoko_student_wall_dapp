<script setup lang="ts" >
import { ToastType } from '@/composables/toast';
const props=defineProps<{
    msg:string,
    type:ToastType
}>();

onMounted(() => {
    setTimeout(()=> emit('removeToast'),5000)
});

const emit=defineEmits(['removeToast'])


</script>

<template>
    <div class="alert shadow-lg" :class="{'alert-info':props.type==ToastType.info,'alert-success':props.type==ToastType.success,'alert-warning':props.type==ToastType.warning,'alert-error':props.type==ToastType.error,}" >
        <div>
          <span>{{props.msg}}</span>
        </div>
        <div class="flex-none">
            <button @click="emit('removeToast')" class="btn btn-sm btn-circle " :class="{'btn-info':props.type==ToastType.info,'btn-success':props.type==ToastType.success,'btn-warning':props.type==ToastType.warning,'btn-error':props.type==ToastType.error,}"  ><i-ic-baseline-close/></button>
          </div>
       
      </div>
</template>