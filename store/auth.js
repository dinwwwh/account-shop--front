export const state = () => ({
  authenticated: false,
  profile: undefined,
  permissions: [],
});

export const getters = {};

export const actions = {};

export const mutations = {
  user(state, profile) {
    state.authenticated = !!profile;
    state.profile = profile;
  },
};
