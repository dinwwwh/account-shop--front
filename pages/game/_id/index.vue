<template>
  <div class="space-y-6 py-6">
    <HeadingBase1> Danh sách nick đang bán </HeadingBase1>

    <ul
      class="
        grid grid-cols-1
        md:grid-cols-2
        lg:grid-cols-3
        xl:grid-cols-4
        gap-4
      "
    >
      <li v-for="account in accounts" :key="account.id">
        <AccountCard :account="account" />
      </li>
    </ul>

    <PaginationCenteredNumbers
      v-if="lastPage > 1"
      v-model="currentPage"
      :last-page="lastPage"
      @change="refreshData"
    />
  </div>
</template>

<script>
async function fetchData($axios, params = {}, query = {}) {
  const [{ data: accounts, meta }] = await Promise.all([
    $axios.$get(`game/${params.id}/account/buyable`, {
      params: {
        _requiredModelRelationships: ['representativeImage'],
        page: query.page ?? 1,
      },
    }),
  ]);

  return {
    accounts,
    currentPage: meta.current_page,
    lastPage: meta.last_page,
  };
}

export default {
  async asyncData({ $axios, params, query }) {
    return {
      ...(await fetchData($axios, params, query)),
    };
  },
  methods: {
    refreshData() {
      const query = {
        page: this.currentPage,
      };

      this.$nuxt.$loading.start();
      fetchData(this.$axios, this.$route.params, query)
        .then(({ accounts, currentPage, lastPage }) => {
          this.$nuxt.$loading.finish();
          this.accounts = accounts;
          this.currentPage = currentPage;
          this.lastPage = lastPage;

          this.$router.push({
            name: this.$route.name,
            params: this.$route.params,
            query,
          });
        })
        .catch(() => {
          this.$nuxt.$loading.fail();
        });
    },
  },
};
</script>
