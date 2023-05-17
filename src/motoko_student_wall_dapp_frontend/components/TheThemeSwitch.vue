<script setup lang="ts">
const { isDark, toggleTheme } = useTheme()
</script>

<template>
  <div class="p-1">
    <label class="swap swap-rotate text-base-content">
      <!-- this hidden checkbox controls the state -->
      <input ref="input" :checked="isDark.value" @input.passive="toggleTheme" type="checkbox" />

      <!-- sun icon -->

      <i-ic-outline-wb-sunny class="swap-on h-8 w-8 fill-current" />
      <!-- moon icon -->

      <i-mdi-weather-night class="swap-off h-8 w-8 fill-current" />
    </label>
  </div>
</template>
