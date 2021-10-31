<script setup lang="ts">
import { defineProps } from 'vue';
import { useLink, useRouter } from 'vue-router';
import axios from 'axios';
import useInitCsrfProtection from '@/compositions/useInitCsrfProtection';

const props = defineProps<{
  height: number,
}>();

const heightClassName = `h-${props.height}`;

const {
  href: signupFormHref,
  navigate: signupFormNavigate,
} = useLink({ to: '/signup-form' });
const {
  href: loginFormHref,
  navigate: loginFormNavigate,
} = useLink({ to: '/login-form' });

const {
  initCsrfProtection,
} = useInitCsrfProtection();

const router = useRouter();

async function handleClickLogout() {
  const { dir, log } = console;

  if (!await initCsrfProtection()) {
    return;
  }

  try {
    const result = await axios({
      method: 'POST',
      url: '/logout',
    });

    dir(result);

    // TODO: 一先ずhomeにリダイレクトするが、変更する
    router.push({ name: 'home' });
  } catch (error) {
    // TODO: ログアウト失敗処理（があったほうが良い気が...）
    if (axios.isAxiosError(error)) {
      log('axios error');
      dir(error);
    } else {
      log('general error');
      dir(error);
    }
  }
}
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
            :href="signupFormHref"
            @click="signupFormNavigate"
          >
            Signup
          </a>
        </li>

        <li class="ml-2">
          <a
            class="underline"
            :href="loginFormHref"
            @click="loginFormNavigate"
          >
            Login
          </a>
        </li>

        <li class="ml-2">
          <a
            class="underline cursor-pointer"
            @click="handleClickLogout"
          >
            Logout
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>
