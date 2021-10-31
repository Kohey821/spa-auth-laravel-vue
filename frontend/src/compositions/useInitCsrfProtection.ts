import { Ref, ref } from 'vue';
import axios from 'axios';

// NOTE: functionにインラインで記述したい...
type UseInitCsrfProtection = {
  errorMessage: Ref<string>;
  initCsrfProtection: () => Promise<boolean>;
};

export default function (): UseInitCsrfProtection {
  const errorMessage = ref('');

  const initCsrfProtection = async (): Promise<boolean> => {
    const { dir, log } = console;

    try {
      await axios({
        method: 'GET',
        url: '/sanctum/csrf-cookie',
      });

      return true;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        log('axios error');
        dir(error);
      } else {
        log('general error');
        dir(error);
      }

      errorMessage.value = 'CSRFの初期化に失敗しました';

      return false;
    }
  };

  return {
    errorMessage,
    initCsrfProtection,
  };
}
