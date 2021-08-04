export const actions = {
  async nuxtServerInit({ commit }, { $axios }) {
    const [profile, settings] = await Promise.all([
      $axios.$get('profile', {
        params: {
          _requiredModelRelationships: ['roles.permissions', 'permissions'],
        },
        validateStatus: () => true,
      }),
      $axios.$get('setting/public', {
        validateStatus: () => true,
      }),
    ]);

    commit('auth/user', profile.data);
    commit('app/publicSettings', settings.data);
  },
};
