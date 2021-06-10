<template>
  <div>
    <UnderHeader :divide-line="true">
      <HeadingWithAction> Danh sách game này hơi dài </HeadingWithAction>
    </UnderHeader>

    <FrameBox>
      <div class="grid grid-cols-5 mb-8">
        <SearchBase
          class="col-start-4 col-span-2"
          placeholder="search..."
        ></SearchBase>
      </div>

      <GameList class="mb-4" :games="games"></GameList>
      <PaginationCenteredNumbers v-model="currentPage" :last-page="lastPage" />
    </FrameBox>
  </div>
</template>

<script>
export default {
  layout: 'admin',
  async asyncData({ $axios, query: { page = 1 } }) {
    const response = await $axios.$get('http://localhost:8000/sanctum/game', {
      params: {
        page,
      },
    });
    return {
      currentPage: response.meta.current_page,
      lastPage: response.meta.last_page,
      games: response.data,
    };
  },
  watch: {
    currentPage(pageNumber) {
      this.$router.push({
        name: this.$route.name,
        query: {
          page: pageNumber,
        },
      });
    },
  },
  watchQuery: ['page'],
};
</script>
