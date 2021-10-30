<script setup lang="ts">
import {
  defineEmits,
  defineProps,
  withDefaults,
} from 'vue';
import { MenuIcon } from '@heroicons/vue/solid';

withDefaults(defineProps<{
  navIsShowing: boolean,
}>(), {
  navIsShowing: false,
});

/* eslint-disable no-spaced-func, func-call-spacing */
const emit = defineEmits<{
  (e: 'navToggled'): void,
}>();
/* eslint-enable no-spaced-func, func-call-spacing */
</script>

<template>
  <div
    class="fixed flex items-center justify-center w-10 h-10 rounded-full shadow-md right-2 bottom-2"
    :class="{
      'bg-white': !navIsShowing,
      'bg-pink-500': navIsShowing,
    }"
    @click="emit('navToggled')"
  >
    <MenuIcon
      class="w-5 h-5"
      :class="{
        'text-pink-500': !navIsShowing,
        'text-white': navIsShowing,
      }"
    />
  </div>
</template>
