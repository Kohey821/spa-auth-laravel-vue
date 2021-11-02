import { Ref, ref, watch } from 'vue';
import { ValidatorFunction } from './useValidator';

export type Validate = (validators: Array<ValidatorFunction>) => void;

export type UseValidate = {
  errors: Ref<string[]>
  input: Ref<string>
  validate: Validate
};

export default function (): UseValidate {
  const errors = ref<string[]>([]);

  const input = ref('');

  const validate: Validate = (validatorFunctions) => {
    watch(input, (newValue) => {
      validatorFunctions.forEach((validatorFunction) => {
        errors.value = [];

        const error = validatorFunction(newValue);
        if (error) {
          errors.value.push(error);
        }
      });
    });
  };

  return {
    errors,
    input,
    validate,
  };
}
