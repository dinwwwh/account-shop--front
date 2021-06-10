import moment from 'moment';
export default function (context, inject) {
  const location = 'vi';

  init();
  inject('moment', {
    fromNow,
  });

  function init() {
    moment.locale(location);
  }

  function fromNow(time) {
    return moment(time).fromNow();
  }
}
