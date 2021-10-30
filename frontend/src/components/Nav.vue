<script setup lang="ts">
import {
  defineEmits,
  defineProps,
  withDefaults,
} from 'vue';
import NavLink from './NavLink.vue';

const props = withDefaults(defineProps<{
  isShowing?: boolean,
  navbarHeight?: number,
}>(), {
  isShowing: false,
  navbarHeight: 0,
});

const topClassName = `top-${props.navbarHeight}`;

/* eslint-disable no-spaced-func, func-call-spacing */
const emit = defineEmits<{
  (e: 'navLinkClicked'): void,
}>();
/* eslint-enable no-spaced-func, func-call-spacing */
</script>

<template>
  <nav
    class="fixed w-40 h-full overflow-hidden bg-white md:rounded md:w-auto md:static transition-all md:h-auto bg-opacity-50"
    :class="[
      topClassName,
      {
        '-left-full': !isShowing,
        '-left-0': isShowing,
      }
    ]"
  >
    <NavLink
      to="/"
      @navLinkClicked="emit('navLinkClicked')"
    >
      Home
    </NavLink>

    <NavLink
      to="/about"
      @navLinkClicked="emit('navLinkClicked')"
    >
      About
    </NavLink>
  </nav>
</template>
