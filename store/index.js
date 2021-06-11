export const actions = {
  async nuxtServerInit({ commit }, { $axios }) {
    // Init auth
    await $axios
      .$get('profile', {
        validateStatus(status) {
          return true;
        },
      })
      .then((data) => {
        commit('auth/user', data.data);
      });
  },
};
