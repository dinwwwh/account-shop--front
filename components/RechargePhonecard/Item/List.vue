<template>
  <ul class="space-y-2">
    <li
      v-for="rechargePhonecard in rechargePhonecards"
      :key="rechargePhonecard.id"
      class="bg-white shadow rounded overflow-hidden px-3 py-4"
    >
      <RechargePhonecardItem :recharge-phonecard="rechargePhonecard" />
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    rechargePhonecards: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
};
</script>
