<template>
  <div class="bg-white shadow overflow-hidden sm:rounded-md">
    <ul class="divide-y divide-gray-200">
      <AccountActionListItem
        v-for="(accountAction, i) in accountActions"
        :key="i"
        :account-action="accountAction"
      />
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    // List account info to render
    accountActions: {
      type: Array,
      required: true,
    },
  },
};
</script>
