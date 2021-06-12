export default function ({ store, error }) {
  if (store.getters['auth/authenticated']) {
    return error(404);
  }
}
