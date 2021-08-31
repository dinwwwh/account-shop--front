<template>
  <div class="space-y-4">
    <AccountTable
      :accounts="accounts"
      :fields="['game/username', 'price/cost', 'status', 'actions']"
    />

    <PaginationCenteredNumbers
      v-if="lastPage > 1"
      v-model="page"
      class="mt-4"
      :last-page="lastPage"
      @change="refreshAccounts"
    />
  </div>
</template>

<script>
async function fetchAccounts($axios, page = 1) {
  return await $axios.$get('user/accounts', {
    params: {
      page,
      _requiredModelRelationships: ['accountType.game'],
    },
  });
}

export default {
  async asyncData({ $axios, query }) {
    const { data: accounts, meta } = await fetchAccounts($axios, query.page);
    return {
      accounts,
      page: meta.current_page,
      lastPage: meta.last_page,
    };
  },

  methods: {
    async refreshAccounts(newPage) {
      const { data: accounts } = await fetchAccounts(this.$axios, newPage);
      this.accounts = accounts;
    },
  },
};
</script>
