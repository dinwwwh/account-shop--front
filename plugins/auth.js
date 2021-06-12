export default function ({ $axios, store }, inject) {
  // const { profile } = store.auth.state;
  const {
    'auth/permissionKeys': permissionKeys,
    'auth/authenticated': authenticated,
  } = store.getters;

  inject('auth', {
    login,
    logout,
    hasPermissionTo,
    hasAnyPermission,
    hasAllPermissions,
  });

  async function login(email, password, remember = false) {
    const profile = await $axios.$post('login', {
      email,
      password,
      remember,
    });
    store.commit('auth/user', profile.data);
    return profile.data;
  }

  function logout() {
    return $axios.post('logout').then(() => {
      store.commit('auth/user', null);
    });
  }

  function hasPermissionTo(key) {
    if (!authenticated) return false;
    return permissionKeys.includes(key);
  }
  function hasAnyPermission(...keys) {
    if (!authenticated) return false;
    keys = keys.flat();
    return keys.some((key) => hasPermissionTo(key));
  }
  function hasAllPermissions(...keys) {
    if (!authenticated) return false;
    keys = keys.flat();
    return keys.every((key) => hasPermissionTo(key));
  }
}
