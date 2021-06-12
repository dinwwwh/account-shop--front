export const state = () => ({
  profile: undefined,
  permissions: [],
});

export const getters = {
  authenticated({ profile }) {
    return !!profile?.name;
  },
  permissionKeys({ profile }) {
    return profile?.permissions.map((permission) => permission.key) ?? [];
  },
};

export const actions = {};

export const mutations = {
  user(state, profile) {
    state.profile = profile;
  },
};
