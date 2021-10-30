<script setup lang="ts">
import {
  defineEmits,
  defineProps,
} from 'vue';
import { useLink } from 'vue-router';

// NOTE: toRefsでラップするとdefineProps is not definedとなる
const props = defineProps<{
  to: string,
}>();

const {
  href,
  isActive,
  navigate,
} = useLink({
  to: props.to,
});

/* eslint-disable no-spaced-func, func-call-spacing */
const emit = defineEmits<{
  (e: 'navLinkClicked'): void,
}>();
/* eslint-enable no-spaced-func, func-call-spacing */

function handleClick() {
  emit('navLinkClicked');
  navigate();
}
</script>

<template>
  <a
    class="block p-2 hover:bg-pink-500 hover:text-white transition-colors"
    :class="{ 'router-link-active': isActive }"
    :href="href"
    @click.prevent="handleClick"
  >
    <slot />
  </a>
</template>

<style>
.router-link-active {
  @apply bg-pink-500 text-white;
}
</style>
