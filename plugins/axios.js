export default function ({ $axios, redirect, error }, inject) {
  $axios.setHeader('Accept', 'application/json');

  inject('withFile', withFile);

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

  function withFile(data, formData = new FormData(), initKey = null) {
    // Advanced data please toss it higher than instanceof Object

    // Case data is a file
    if (data instanceof File) {
      formData.append(initKey, data, data.name);
      return formData;
    }

    // Case: data is an object
    else if (data instanceof Object) {
      Object.keys(data).forEach((key) => {
        if (initKey) {
          formData = withFile(data[key], formData, `${initKey}[${key}]`);
        } else {
          formData = withFile(data[key], formData, key);
        }
      });
    }

    // Case: data is an Array
    else if (Array.isArray(data)) {
      // Case must has initKey
      if (!initKey) {
        // eslint-disable-next-line no-console
        console.error('$axios.withFile() first argument must be an object!');
        return formData;
      }
      data.forEach((val) => {
        formData = inject(val, formData, initKey + '[]');
      });
    }

    // Case: data is an String or Number
    else if (typeof data === 'string' || typeof data === 'number') {
      formData.append(initKey, data);
    }

    // Case: data is invalid
    else {
      // eslint-disable-next-line no-console
      console.error(`$axios.withFile() datatype ${typeof data} is invalid`);
      return formData;
    }

    return formData;
  }
}
