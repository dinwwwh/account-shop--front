<template>
  <div class="space-y-4">
    <AccountManagementSectionDashboard :account="account" />
    <AccountManagementSectionActions :account="account" />
  </div>
</template>

<script>
export default {
  props: {
    account: {
      type: Object,
      required: true,
      default: () => ({}),
    },
  },
};
</script>
