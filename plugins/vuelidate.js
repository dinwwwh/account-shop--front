import Vue from 'vue';
import Vuelidate from 'vuelidate';
Vue.use(Vuelidate);

export default function (context, inject) {
  inject('getValidatorErrorMessage', getValidatorErrorMessage);
}

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
};

function getValidatorErrorMessage(validator, options) {
  if (!validator.$error) return null;

  let errorMessage;
  const fields = [
    // Priority group
    'required',
    'sameAs',
    // Advanced group
    'integer',
    'alpha',
    'alphaNum',
    'numeric',
    'decimal',
    'email',
    // Base group
    'minLength',
    'maxLength',
    'minValue',
    'maxValue',
    'between',
  ];

  fields.some((field) => {
    if (validator[field] === false) {
      errorMessage = `Trường này ${messages[field]}`;
      return true;
    }

    return false;
  });

  return errorMessage;
}
