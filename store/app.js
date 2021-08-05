export const state = () => ({
  publicSettings: [],
});

export const getters = {
  getPublicSettingByKey({ publicSettings }) {
    return (key) => publicSettings.find((setting) => setting.key === key);
  },
};

export const actions = {};

export const mutations = {
  publicSettings(state, publicSettings) {
    state.publicSettings = publicSettings ?? [];
  },
};
