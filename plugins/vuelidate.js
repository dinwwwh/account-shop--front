import Vue from 'vue';
import Vuelidate from 'vuelidate';
import {
  required,
  minLength,
  maxLength,
  minValue,
  maxValue,
  between,
  alpha,
  alphaNum,
  numeric,
  integer,
  decimal,
  email,
  ipAddress,
  macAddress,
  sameAs,
  url,
  helpers,
} from 'vuelidate/lib/validators';

Vue.use(Vuelidate);
const validators = {
  required,
  minLength,
  maxLength,
  minValue,
  maxValue,
  between,
  alpha,
  alphaNum,
  numeric,
  integer,
  decimal,
  email,
  ipAddress,
  macAddress,
  sameAs,
  url,
  in(values) {
    return (val) => !helpers.req(val) || values.includes(val);
  },
};
const messages = {
  required: 'là bắt buộc.',
  minLength: 'quá ngắn, vui lòng bổ sung thêm.',
  maxLength: 'quá dài, vui lòng rút ngắn lại.',
  minValue: 'giá trị quá nhỏ, vui lòng tăng thêm.',
  maxValue: 'giá trị quá lớn, vui lòng giảm xuống.',
  between: 'có giá trị không hợp lệ',
  alpha: 'phải là chữ cái, vui lòng loại bỏ các ký tự không hợp lệ.',
  alphaNum: 'phải là chữ cái hoặc số, vui lòng loại bỏ các ký tự không hợp lệ.',
  numeric: 'phải là số.',
  integer: 'phải là số nguyên dương.',
  decimal: 'có giá trị không hợp lệ',
  email: 'phải là một email hợp lệ.',
  sameAs: 'có giá trị xác nhận không chính xác.',
  ipAddress: 'phải là một địa chỉ IP hợp lệ.',
  macAddress: 'phải là một đại chỉ MAC hợp lệ.',
  url: 'phải là một địa chỉ URL hợp lệ.',
  in: 'có giá trị không hợp lệ',
};

export default function (context, inject) {
  inject('getValidatorErrorMessage', getValidatorErrorMessage);
  inject('vuelidate', {
    validators,
  });
}

function getValidatorErrorMessage(validator, options) {
  if (!validator.$error) return null;

  let errorMessage;

  Object.keys(validators).some((field) => {
    if (validator[field] === false) {
      errorMessage = `Trường này ${messages[field]}`;
      return true;
    }

    return false;
  });

  return errorMessage;
}
