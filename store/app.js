export const state = () => ({
  dynamicConfigs: [],
});

export const getters = {
  getDynamicConfigByKey({ dynamicConfigs }) {
    return (key) => dynamicConfigs.find((config) => config.key === key);
  },
};

export const actions = {};

export const mutations = {
  dynamicConfigs(state, dynamicConfigs) {
    state.dynamicConfigs = dynamicConfigs ?? [];
  },
};
