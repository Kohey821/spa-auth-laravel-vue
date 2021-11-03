<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';
import { useStore } from './store';
import Navbar from './components/Navbar.vue';
import Nav from './components/Nav.vue';
import NavToggle from './components/NavToggle.vue';
import Alert from './components/Alert.vue';

const store = useStore();
const route = useRoute();
watch(
  () => route.params,
  () => {
    store.dispatch('setCurrentUser');
  },
);

// メール確認
// TODO: 遷移後も表示する
const verifiedEmailUserOrGest = computed(() => store.getters.verifiedEmailUserOrGest);
const verificationNotificationHasBeenSent = ref<boolean>(false);
async function sendEmailVerificationNotification() {
  const { dir, log } = console;

  try {
    axios({
      method: 'POST',
      url: '/email/verification-notification',
    });

    verificationNotificationHasBeenSent.value = true;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      log('axios error');
      dir(error);
    } else {
      log('general error');
      dir(error);
    }
  }
}

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
        <template
          v-if="!verifiedEmailUserOrGest"
        >
          <template
            v-if="!verificationNotificationHasBeenSent"
          >
            <Alert
              warning
              class="mb-2"
            >
              <span
                class="font-bold underline cursor-pointer"
                @click="sendEmailVerificationNotification"
              >
                確認メールを送信
              </span>
              してユーザーを有効にしてください
            </Alert>
          </template>
        </template>
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
