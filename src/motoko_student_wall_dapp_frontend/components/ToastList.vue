<script setup lang="ts" >
import toast  from '@/composables/toast';






</script>

<template>
    <div class="toast toast-top top-20 toast-end z-50">

        <ToastListItem v-for="(item, index) in toast.items" :key="(item.key as symbol)" :msg="item.message" @remove-toast="toast.remove(index)"/>
       
    </div>

</template>