<template>
  <div class="space-y-6">
    <UnderHeader :divide-line="true">
      <HeadingWithAction>
        Danh thẻ nạp vào hệ thống
        <template #actions> </template>
      </HeadingWithAction>
    </UnderHeader>

    <div class="px-6">
      <RechargePhonecardItemList :recharge-phonecards="rechargePhonecards" />
    </div>

    <PaginationCenteredNumbers
      v-model="currentPage"
      :last-page="lastPage"
      @change="onPageChange"
    />
  </div>
</template>

<script>
function fetchData($axios, page = 1) {
  return $axios.$get('recharge-phonecard', {
    params: {
      page,
    },
  });
}

export default {
  layout: 'admin',
  async asyncData({ $axios, query }) {
    const { data: rechargePhonecards, meta } = await fetchData(
      $axios,
      query.page
    );

    return {
      rechargePhonecards,
      lastPage: meta.last_page,
      currentPage: meta.current_page,
    };
  },

  methods: {
    async onPageChange(page) {
      const { data: rechargePhonecards, meta } = await fetchData(
        this.$axios,
        page
      );

      this.rechargePhonecards = rechargePhonecards;
      this.currentPage = meta.current_page;
      this.lastPage = meta.last_page;
    },
  },
};
</script>
