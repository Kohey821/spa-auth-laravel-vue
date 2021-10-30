<script setup lang="ts">
import {
  defineProps,
  defineEmits,
  withDefaults,
} from 'vue';

withDefaults(defineProps<{
  displayErrors?: boolean,
  errors?: string[],
  name: string,
  type: string,
  placeholder: string,
  modelValue: string,
}>(), {
  displayErrors: true,
  errors: () => [],
});

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
    :class="{ 'bg-red-200': errors.length }"
    :placeholder="placeholder"
    :value="modelValue"
    @change="updateModelValue"
  />

  <template v-if="displayErrors">
    <template
      v-for="error in errors"
      :key="error"
    >
      <p class="mb-2 text-red-500">
        {{ error }}
      </p>
    </template>
  </template>
</template>
