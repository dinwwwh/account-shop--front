export default function ({ $axios, $dynamicConfig }, inject) {
  inject('rechargePhonecard', {
    getMeanOfStatus,
    getTelcoName,
  });

  function getMeanOfStatus(status) {
    if (status === 0) return 'chờ duyệt';
    if (status === 10) return 'đang duyệt';
    if (status === 20) return 'thành công';
    if (status === 30) return 'thất bại';
    if (status === 40) return 'sai mệnh giá';
    return 'ERROR';
  }

  function getTelcoName(key) {
    return (
      $dynamicConfig('recharge-phonecard.manual_telcos').find(
        (telco) => telco.key === key
      )?.name ?? key
    );
  }
}
