export default function ({ $axios }, inject) {
  init();
  inject('sanctum', {
    refreshToken,
  });

  function init() {
    refreshToken();
  }

  function refreshToken() {
    $axios.get('csrf-cookie');
  }
}
