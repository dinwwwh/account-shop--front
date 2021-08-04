export default function ({ $axios, store: { commit, getters } }, inject) {
  inject('auth', {
    login,
    logout,
    can,
    hasPermissionTo,
    hasAnyPermission,
    hasAllPermissions,
  });

  async function login(email, password, remember = false) {
    const profile = await $axios.$post(
      'login',
      {
        email,
        password,
        remember,
      },
      {
        params: {
          _requiredModelRelationships: ['roles.permissions', 'permissions'],
        },
      }
    );
    commit('auth/user', profile.data);
    return profile.data;
  }

  function logout() {
    return $axios.post('logout').then(() => {
      commit('auth/user', null);
    });
  }

  function hasPermissionTo(key) {
    if (!getters['auth/authenticated']) return false;
    return !!getters['auth/allPermissions'].find(
      (permission) => permission.key === key
    );
  }
  function hasAnyPermission(...keys) {
    if (!getters['auth/authenticated']) return false;
    keys = keys.flat();
    return keys.some((key) => hasPermissionTo(key));
  }
  function hasAllPermissions(...keys) {
    if (!getters['auth/authenticated']) return false;
    keys = keys.flat();
    return keys.every((key) => hasPermissionTo(key));
  }

  async function can(ability, params) {
    if (!getters['auth/authenticated']) {
      return false;
    }

    const { status } = await $axios.get(`can/${ability}`, {
      params: { params },
      validateStatus: () => true,
    });

    if (status >= 200 && status < 300) return true;

    return false;
  }
}
