<script setup lang="ts" >
const props=defineProps<{
    msg:string
}>();

onMounted(() => {
    setTimeout(()=> emit('removeToast'),2000)
});

const emit=defineEmits(['removeToast'])


</script>

<template>
    <div class="alert alert-success shadow-lg">
        <div>
          <span>{{props.msg}}</span>
        </div>
        <div class="flex-none">
            <button @click="emit('removeToast')" class="btn btn-sm btn-circle btn-success"><i-ic-baseline-close/></button>
          </div>
      </div>
</template>