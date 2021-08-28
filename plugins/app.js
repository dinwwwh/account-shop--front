export default function ({ $axios, store: { commit } }, inject) {
  initDynamicConfigs();

  async function initDynamicConfigs() {
    const { data: dynamicConfigs } = await $axios.$get('config/public', {
      validateStatus: () => true,
    });

    commit('app/dynamicConfigs', dynamicConfigs);
  }
}
