export const actions = {
  async nuxtServerInit({ commit }, { $axios }) {
    // Init auth
    await $axios
      .$get('profile')
      .then((data) => {
        commit('auth/user', data.data);
      })
      .catch(() => {});
  },
};
