export default function ({ $axios, redirect, error, $typeCheck }, inject) {
  $axios.setHeader('Accept', 'application/json');

  inject('withFile', withFile);

  $axios.onError(({ response }) => {
    if (response === undefined) return;

    if (response.status === 401) {
      redirect('/login');
      return;
    }

    if (response.status === 419) {
      $axios.$get('profile');
      return;
    }

    if (response.status === 500) {
      error(500);
    }
  });

  function withFile(data, formData = new FormData(), initKey = null) {
    // Case: data is an object or list
    if ($typeCheck('Object|Array|FileList', data)) {
      Object.keys(data).forEach((key) => {
        if (initKey) {
          formData = withFile(data[key], formData, `${initKey}[${key}]`);
        } else {
          formData = withFile(data[key], formData, key);
        }
      });
    }

    // Case: data is Boolean type
    else if ($typeCheck('Boolean', data)) {
      formData.append(initKey, data ? 1 : 0);
    }

    // Case: data is NULL
    else if ($typeCheck('Null', data)) {
      formData.append(initKey, '');
    }

    // Case: data isn't undefined
    else if (!$typeCheck('Undefined', data)) {
      formData.append(initKey, data);
    }

    return formData;
  }
}
