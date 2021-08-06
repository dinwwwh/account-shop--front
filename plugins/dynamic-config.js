export default function ({ store }, inject) {
  inject('dynamicConfig', dynamicConfig);

  function dynamicConfig(key) {
    return store.getters['app/getDynamicConfigByKey'](key)?.data;
  }
}
