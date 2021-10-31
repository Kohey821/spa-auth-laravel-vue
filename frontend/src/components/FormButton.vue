<script setup lang="ts">
import { defineProps } from 'vue';

defineProps<{
  error: string,
}>();
</script>

<template>
  <button
    class="w-full py-2 mt-1 text-base text-white bg-pink-500 rounded shadow-md"
  >
    <slot />
  </button>

  <template v-if="error">
    <p class="mt-2 text-red-500">
      {{ error }}
    </p>
  </template>
</template>
