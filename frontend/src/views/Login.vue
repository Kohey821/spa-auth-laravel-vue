<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios, { AxiosResponse } from 'axios';
import useInitCsrfProtection from '@/compositions/useInitCsrfProtection';
import Box from '@/components/Box.vue';
import Heading from '@/components/Heading.vue';
import FormInput from '@/components/FormInput.vue';
import FormButton from '@/components/FormButton.vue';

const email = ref<string>('');
const password = ref<string>('');

const emailErrors = ref<string[]>([]);
const passwordErrors = ref<string[]>([]);

const loginFailedError = ref<string>('');

const {
  errorMessage: csrfError,
  initCsrfProtection,
} = useInitCsrfProtection();

const router = useRouter();

async function handleSubmit() {
  const { dir, log } = console;

  if (!await initCsrfProtection()) {
    return;
  }

  try {
    const result = await axios({
      method: 'POST',
      url: '/login',
      data: {
        email: email.value,
        password: password.value,
      },
    });

    dir(result);

    // TODO: 一先ずhomeにリダイレクトするが、変更する
    router.push({ name: 'home' });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      loginFailedError.value = 'ログインに失敗しました';

      dir(error);
    } else {
      log('general error');
      dir(error);
    }
  }
}
</script>

<template>
  <Box>
    <Heading>
      ログイン
    </Heading>

    <form
      @submit.prevent="handleSubmit"
    >
      <template v-if="loginFailedError">
        <p class="mb-2 text-red-500">
          {{ loginFailedError }}
        </p>
      </template>

      <FormInput
        name="email"
        type="email"
        placeholder="Eメール"
        v-model:modelValue="email"
        :errors="emailErrors"
      />
      <FormInput
        name="password"
        type="password"
        placeholder="パスワード"
        v-model:modelValue="password"
        :errors="passwordErrors"
      />

      <FormButton
        :error="csrfError"
      >
        送信
      </FormButton>
    </form>
  </Box>
</template>
