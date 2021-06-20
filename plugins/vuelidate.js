import Vue from 'vue';
import Vuelidate from 'vuelidate';
Vue.use(Vuelidate);

export default function (context, inject) {
  inject('getValidatorErrorMessage', getValidatorErrorMessage);
}

const messages = {
  required: 'là bắt buộc.',
  integer: 'phải là số nguyên dương.',
};

function getValidatorErrorMessage(validator, options) {
  if (!validator.$error) return null;

  let errorMessage;
  ['required', 'integer'].some((field) => {
    if (validator[field] === false) {
      errorMessage = `Trường này ${messages[field]}`;
      return true;
    }

    return false;
  });

  return errorMessage;
}
