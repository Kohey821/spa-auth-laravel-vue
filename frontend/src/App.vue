<script setup lang="ts">
import { ref } from 'vue';
import Navbar from './components/Navbar.vue';
import Nav from './components/Nav.vue';
import NavToggle from './components/NavToggle.vue';

// nav
const navIsShowing = ref<boolean>(false);
function toggleNavFlag(flag?: boolean) {
  navIsShowing.value = typeof flag === 'boolean' ? flag : !navIsShowing.value;
}

const navbarHeight = 6;
</script>

<template>
  <div class="text-xs">
    <Navbar
      :height='navbarHeight'
    />

    <Nav
      class="md:hidden"
      :isShowing="navIsShowing"
      :navbarHeight="navbarHeight"
      @navLinkClicked="toggleNavFlag(false)"
    />

    <div class="max-w-lg p-2 mx-auto md:flex">
      <div class="flex-none hidden md:w-28 md:block">
        <Nav />
      </div>

      <div class="flex-auto mx-auto md:ml-2">
        <router-view/>
      </div>
    </div>

    <NavToggle
      class="md:hidden"
      :navIsShowing="navIsShowing"
      @navToggled="toggleNavFlag"
    />
  </div>
</template>

<style>
body {
  @apply bg-gradient-to-r from-purple-400 via-pink-400 via-green-400 to-red-400;
}
</style>
