<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import axios, { AxiosResponse } from 'axios';
import Box from '@/components/Box.vue';
import Heading from '@/components/Heading.vue';
import FormInput from '@/components/FormInput.vue';

const email = ref<string>('');
const name = ref<string>('');
const password = ref<string>('');
const passwordConfirmation = ref<string>('');

const emailErrors = ref<string[]>([]);
const nameErrors = ref<string[]>([]);
const passwordErrors = ref<string[]>([]);

const csrfError = ref<string>('');

const router = useRouter();

// TODO: バリデーション
watchEffect(() => {
  console.log(email.value);
});
watchEffect(() => {
  console.log(name.value);
});
watchEffect(() => {
  console.log(password.value);
});
watchEffect(() => {
  console.log(passwordConfirmation.value);
});

// TODO: コンポジション化
async function initCsrfProction() {
  const { dir, log } = console;

  try {
    await axios({
      method: 'GET',
      url: '/sanctum/csrf-cookie',
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      log('axios error');
      dir(error);
    } else {
      log('general error');
      dir(error);
    }

    csrfError.value = 'CSRFの初期化に失敗しました';
  }
}
async function handleSubmit() {
  const { dir, log } = console;

  await initCsrfProction();

  try {
    const result = await axios({
      method: 'POST',
      url: '/api/register',
      data: {
        name: name.value,
        email: email.value,
        password: password.value,
        password_confirmation: passwordConfirmation.value,
      },
    });

    dir(result);

    // TODO: 一先ずhomeにリダイレクトするが、変更する
    router.push({ name: 'home' });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // NOTE: もっとスマートな書き方があるはず
      const { response } = error;
      const { data } = response as AxiosResponse;
      const { errors } = data as any;
      ({
        name: nameErrors.value,
        email: emailErrors.value,
        password: passwordErrors.value,
      } = errors);
      dir(errors);
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
      サイナップ
    </Heading>

    <form
      @submit.prevent="handleSubmit"
    >
      <FormInput
        name="name"
        type="text"
        placeholder="名前"
        v-model:modelValue="name"
        :errors="nameErrors"
      />
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
        :displayErrors="false"
        :errors="passwordErrors"
      />
      <FormInput
        name="passwordConfirmation"
        type="password"
        placeholder="パスワード確認"
        v-model:modelValue="passwordConfirmation"
        :errors="passwordErrors"
      />

      <!-- TODO: コンポーネント化 -->
      <button
        class="w-full py-2 mt-1 text-base text-white bg-pink-500 rounded shadow-md"
      >
        送信
      </button>

      <template v-if="csrfError">
        <p class="mt-2 text-red-500">
          {{ csrfError }}
        </p>
      </template>
    </form>
  </Box>
</template>
