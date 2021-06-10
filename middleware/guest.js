export default function ({ store, error }) {
  if (store.state.auth.authenticated) {
    return error(404);
  }
}
