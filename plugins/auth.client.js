export default function ({ $axios, store }, inject) {
  inject('auth', {
    login,
    logout,
  });

  async function login(email, password, remember = false) {
    const profile = await $axios.$post('login', {
      email,
      password,
      remember,
    });

    store.commit('auth/user', profile.data);
    return profile.data;
  }

  function logout() {
    return $axios.post('logout').then(() => {
      store.commit('auth/user', null);
    });
  }
}
