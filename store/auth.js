export const state = () => ({
  profile: undefined,
  permissions: [],
});

export const getters = {
  authenticated({ profile }) {
    return !!profile?.name;
  },
  allPermissions({ profile }, { authenticated }) {
    if (!authenticated) return [];
    const result = [...profile.permissions];
    profile.roles.forEach((role) => {
      role.permissions.forEach((permission) => {
        if (!result.find((p) => p.key === permission.key)) {
          result.push(permission);
        }
      });
    });
    return result;
  },
};

export const actions = {};

export const mutations = {
  user(state, profile) {
    state.profile = profile;
  },
};
