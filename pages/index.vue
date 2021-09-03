<template>
  <div class="py-6 space-y-8">
    <!-- Background -->
    <div
      class="h-96 w-full bg-center bg-cover bg-fixed opacity-80 rounded-lg"
      style="background-image: url('/bg.jpg')"
    ></div>

    <HeadingBase1> Danh sách game </HeadingBase1>

    <ul class="md:grid-cols-2 xl:grid-cols-3 grid grid-cols-1 gap-x-6 gap-y-8">
      <li v-for="game in games" :key="game.id">
        <GameCard :game="game" />
      </li>
    </ul>

    <PaginationCenteredNumbers
      v-if="lastPage > 1"
      v-model="currentPage"
      :last-page="lastPage"
      @change="refreshData()"
    />
  </div>
</template>

<script>
async function fetchData($axios, params = {}, query = {}) {
  const [{ data: games, meta }] = await Promise.all([
    $axios.$get(`game`, {
      params: {
        _requiredModelRelationships: ['representativeImage'],
        page: query.page ?? 1,
      },
    }),
  ]);

  return {
    games,
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
        .then(({ games, currentPage, lastPage }) => {
          this.$nuxt.$loading.finish();
          this.games = games;
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
