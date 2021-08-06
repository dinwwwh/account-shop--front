export const actions = {
  async nuxtServerInit({ commit }, { $axios }) {
    const [profile, configs] = await Promise.all([
      $axios.$get('profile', {
        params: {
          _requiredModelRelationships: ['roles.permissions', 'permissions'],
        },
        validateStatus: () => true,
      }),
      $axios.$get('config/public', {
        validateStatus: () => true,
      }),
    ]);

    commit('auth/user', profile.data);
    commit('app/dynamicConfigs', configs.data);
  },
};
