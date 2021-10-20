<script setup lang="ts">
import { defineProps } from 'vue';
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
</script>

<template>
  <a
    class="p-3 hover:bg-pink-500 hover:text-white transition-colors"
    :class="{ 'router-link-active': isActive }"
    :href="href"
    @click="navigate"
  >
    <slot />
  </a>
</template>

<style>
.router-link-active {
  @apply bg-pink-500 text-white;
}
</style>
