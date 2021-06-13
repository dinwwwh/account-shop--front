export default function ({ $axios, store: { commit } }, inject) {
  // const { profile } = store.auth.state;
  // const {
  //   'auth/permissionKeys': permissionKeys,
  //   'auth/authenticated': authenticated,
  // } = store.getters;

  inject('auth', {
    login,
    logout,
    can,
    // hasPermissionTo,
    // hasAnyPermission,
    // hasAllPermissions,
    // canAccessLink,
  });
  inject('can', can);

  async function login(email, password, remember = false) {
    const profile = await $axios.$post('login', {
      email,
      password,
      remember,
    });
    commit('auth/user', profile.data);
    return profile.data;
  }

  function logout() {
    return $axios.post('logout').then(() => {
      commit('auth/user', null);
    });
  }

  // function hasPermissionTo(key) {
  //   if (!authenticated) return false;
  //   return permissionKeys.includes(key);
  // }
  // function hasAnyPermission(...keys) {
  //   if (!authenticated) return false;
  //   keys = keys.flat();
  //   return keys.some((key) => hasPermissionTo(key));
  // }
  // function hasAllPermissions(...keys) {
  //   if (!authenticated) return false;
  //   keys = keys.flat();
  //   return keys.every((key) => hasPermissionTo(key));
  // }

  function can(ability, params) {
    return $axios
      .get(`can/${ability}`, { params: { params } })
      .then(() => {
        return true;
      })
      .catch(() => {
        return false;
      });
  }
}
