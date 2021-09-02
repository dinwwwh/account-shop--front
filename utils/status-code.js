const statusCodeMeanings = {
  0: 'chờ duyệt',
  200: 'đang duyệt',
  300: 'bị từ chối',
  440: 'đang bán',
  480: 'đang bán',
  600: 'đang kiểm tra',
  840: 'đã bán',
  880: 'đã bán',
};

export function getStatusCodeMeaning(statusCode) {
  return statusCodeMeanings[statusCode] ?? statusCode;
}

export function getClassNameByStatusCode(statusCode) {
  return `status-code-${parseInt(statusCode / 100)}xx`;
}
