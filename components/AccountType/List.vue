<template>
  <div class="bg-white shadow overflow-hidden sm:rounded-md">
    <ul class="divide-y divide-gray-200">
      <AccountTypeListItem
        v-for="(accountType, i) in accountTypes"
        :key="i"
        :account-type="accountType"
      ></AccountTypeListItem>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    // List game usedg to render
    accountTypes: {
      type: Array,
      required: true,
    },
  },
};
</script>
