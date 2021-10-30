<script setup lang="ts">
import { defineProps } from 'vue';
import { useLink } from 'vue-router';

const props = defineProps<{
  height: number,
}>();

const heightClassName = `h-${props.height}`;

const signupLink = useLink({ to: 'signup' });
const loginLink = useLink({ to: 'login' });
</script>

<template>
  <div class="sticky top-0 bg-white bg-opacity-50">
    <div
      class="flex items-center justify-between max-w-lg px-2 mx-auto"
      :class="heightClassName"
    >
      <p class="font-bold">
        SPA Login
      </p>

      <ul class="flex">
        <li>
          <a
            class="underline"
            :href="signupLink.href"
            @click="signupLink.navigate"
          >
            Signup
          </a>
        </li>

        <li class="ml-2">
          <a
            class="underline"
            :href="loginLink.href"
            @click="loginLink.navigate"
          >
            Login
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>
