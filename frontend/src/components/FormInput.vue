<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

defineProps<{
  name: string,
  type: string,
  placeholder: string,
  modelValue: string,
}>();

/* eslint-disable no-spaced-func, func-call-spacing */
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void,
}>();
/* eslint-enable no-spaced-func, func-call-spacing */

function updateModelValue(e: Event) {
  emit('update:modelValue', (e.target as HTMLInputElement).value);
}
</script>

<template>
  <input
    :name="name"
    :type="type"
    class="w-full p-2 mb-2 rounded form-input"
    :placeholder="placeholder"
    :value="modelValue"
    @change="updateModelValue"
  />
</template>
