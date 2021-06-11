export default function ({ $axios, redirect, error }) {
  $axios.onError(({ response }) => {
    if (response === undefined) return;

    if (response.status === 401) {
      redirect('/login');
      return;
    }

    if (response.status === 500) {
      error(500);
    }
  });
}
