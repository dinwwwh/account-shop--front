export default function ({ $axios, redirect, error, $typeCheck }, inject) {
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
    if ($typeCheck('File', data)) {
      formData.append(initKey, data, data.name);
      return formData;
    }

    // Case: data is an object
    else if ($typeCheck('Object', data)) {
      Object.keys(data).forEach((key) => {
        if (initKey) {
          formData = withFile(data[key], formData, `${initKey}[${key}]`);
        } else {
          formData = withFile(data[key], formData, key);
        }
      });
    }

    // Case: data is an Array
    else if ($typeCheck('Array|FileList', data)) {
      // Case must has initKey
      if (!initKey) {
        // eslint-disable-next-line no-console
        console.error('$axios.withFile() first argument must be an object!');
        return formData;
      }
      data.forEach((val) => {
        formData = withFile(val, formData, initKey + '[]');
      });
    }

    // Case: data is an String or Number
    else if ($typeCheck('String | Number', data)) {
      formData.append(initKey, data);
    }

    // Case: data is Boolean type
    else if ($typeCheck('Boolean', data)) {
      formData.append(initKey, data ? 1 : 0);
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
