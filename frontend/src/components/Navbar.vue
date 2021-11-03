<script setup lang="ts">
import { computed, defineProps } from 'vue';
import { useLink, useRouter } from 'vue-router';
import axios from 'axios';
import { useStore } from '@/store';
import useCsrfProtection from '@/compositions/useCsrfProtection';

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

const store = useStore();
const currentUser = computed(() => store.state.currentUser);

const {
  initCsrfProtection,
} = useCsrfProtection();

const router = useRouter();

async function handleClickLogout() {
  const { dir, log } = console;

  if (!await initCsrfProtection()) {
    return;
  }

  try {
    await axios({
      method: 'POST',
      url: '/logout',
    });

    router.push({ name: 'home' });
    store.dispatch('setCurrentUser');
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
        <template v-if="currentUser">
          <li class="ml-2">
            <a
              class="underline cursor-pointer"
              @click="handleClickLogout"
            >
              Logout
            </a>
          </li>
        </template>

        <template v-else>
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
        </template>
      </ul>
    </div>
  </div>
</template>
