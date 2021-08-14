<template>
  <FrameBox>
    <div class="space-y-6 py-12">
      <div class="bg-white rounded-sm sm:rounded-md overflow-hidden">
        <CouponTable :coupons="coupons" />
      </div>

      <PaginationCenteredNumbers
        v-model="currentPage"
        :last-page="lastPage"
        @change="reloadData"
      />
    </div>
  </FrameBox>
</template>

<script>
async function loadData($axios, page) {
  return await $axios.$get('coupon', {
    params: {
      page,
      _requiredModelRelationships: ['creator'],
    },
  });
}

export default {
  layout: 'admin',
  async asyncData({ $axios, query }) {
    const { data: coupons, meta } = await loadData($axios, query.page);

    return {
      coupons,
      lastPage: meta.last_page,
      currentPage: meta.current_page,
    };
  },
  methods: {
    async reloadData() {
      const { data: coupons, meta } = await loadData(
        this.$axios,
        this.currentPage
      );

      this.coupons = coupons;
      this.lastPage = meta.last_page;
      this.currentPage = meta.current_page;

      this.$router.push({
        name: this.$route.name,
        params: this.$route.params,
        query: {
          ...this.$route.query,
          page: this.currentPage,
        },
      });
    },
  },
};
</script>
