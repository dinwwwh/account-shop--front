<template>
  <div class="space-y-8">
    <AccountTable
      :accounts="accounts"
      :fields="['game/username', 'sold-price', 'sold-at', 'actions']"
    />

    <PaginationCenteredNumbers
      v-if="lastPage > 1"
      v-model="currentPage"
      :last-page="lastPage"
      @change="onChangePage"
    />
  </div>
</template>

<script>
async function fetchData($axios, page = 1) {
  return await $axios.$get('account/bought-by-me', {
    params: {
      page,
      _requiredModelRelationships: [
        'representativeImage',
        'accountType.game.representativeImage',
        'accountInfos',
      ],
    },
  });
}

export default {
  async asyncData({ $axios, query: { page } }) {
    const { data: accounts, meta } = await fetchData($axios, page);
    return {
      accounts,
      currentPage: meta.current_page,
      lastPage: meta.last_page,
    };
  },
  methods: {
    async onChangePage(page) {
      const { data: accounts, meta } = await fetchData(this.$axios, page);

      this.accounts = accounts;
      this.currentPage = meta.current_page;
      this.lastPage = meta.last_page;

      this.$router.push({
        name: this.$route.name,
        params: this.$route.params,
        query: {
          ...this.$route.query,
          page: meta.current_page,
        },
      });
    },
  },
};
</script>
