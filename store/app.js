export const state = () => ({
  publicSettings: [],
});

export const getters = {};

export const actions = {};

export const mutations = {
  publicSettings(state, publicSettings) {
    state.publicSettings = publicSettings ?? [];
  },
};
