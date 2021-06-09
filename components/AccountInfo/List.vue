<template>
  <div class="bg-white shadow overflow-hidden sm:rounded-md">
    <ul class="divide-y divide-gray-200">
      <AccountInfoListItem
        v-for="(accountInfo, i) in accountInfos"
        :key="i"
        :account-info="accountInfo"
      ></AccountInfoListItem>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    // List account info to render
    accountInfos: {
      type: Array,
      required: true,
    },
  },
};
</script>
