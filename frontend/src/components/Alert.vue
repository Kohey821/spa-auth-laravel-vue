<script setup lang="ts">
import { defineProps, withDefaults } from 'vue';

withDefaults(defineProps<{
  warning?: boolean,
  danger?: boolean,
  success?: boolean,
}>(), {
  warning: false,
  danger: false,
  success: false,
});
</script>

<template>
  <div
    class="p-4 bg-white rounded bg-opacity-50"
    :class="
      {
        'bg-blue-500': success,
        'bg-yellow-500': warning,
        'bg-red-500': danger,
        'text-white': success || warning || danger,
      }
    "
  >
    <slot />
  </div>
</template>
