<template>
  <div class="space-y-6">
    <RechargePhonecardItemList :recharge-phonecards="phonecards" />

    <PaginationCenteredNumbers
      v-if="lastPage > 1"
      v-model="page"
      :last-page="lastPage"
      @change="onChangePage"
    />
  </div>
</template>

<script>
export default {
  async asyncData({ $axios, query }) {
    const { data: phonecards, meta } = await $axios.$get(
      'recharge-phonecard/own',
      {
        params: {
          page: query.page,
        },
      }
    );

    return {
      phonecards,
      page: meta.current_page,
      lastPage: meta.last_page,
    };
  },
  methods: {
    async onChangePage(page) {
      this.$router.push({
        ...this.$route,
        query: {
          ...this.$route.query,
          page,
        },
      });

      const { data: phonecards } = await this.$axios.$get(
        'recharge-phonecard/own',
        {
          params: {
            page,
          },
        }
      );

      this.phonecards = phonecards;
    },
  },
};
</script>
