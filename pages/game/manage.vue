<template>
  <div>
    <UnderHeader :divide-line="true">
      <HeadingWithAction>
        Danh sách game
        <template #actions>
          <NuxtLink :to="{ name: 'game-create' }">
            <ButtonPrimary>Thêm mới</ButtonPrimary>
          </NuxtLink>
        </template>
      </HeadingWithAction>
    </UnderHeader>

    <FrameBox>
      <div class="grid grid-cols-5 mb-8">
        <SearchBase class="col-start-4 col-span-2" placeholder="search..." />
      </div>

      <GameList class="mb-4" :games="games" />
      <PaginationCenteredNumbers v-model="page" :last-page="lastPage" />
    </FrameBox>
  </div>
</template>

<script>
export default {
  layout: 'admin',
  async asyncData({ $axios, query: { page = 1 } }) {
    const { data, meta } = await $axios.$get('game', {
      params: {
        page,
      },
    });
    return {
      lastPage: meta.last_page,
      games: data,
    };
  },
  computed: {
    page: {
      get() {
        return parseInt(this.$route.query.page ?? 1);
      },
      set(pageNumber) {
        this.$router.push({
          name: this.$route.name,
          query: {
            page: pageNumber,
          },
        });
      },
    },
  },
  watch: {
    page() {
      this.freshGames();
    },
  },
  methods: {
    freshGames() {
      this.$nuxt.$loading.start();
      return this.$axios
        .$get(`game?page=${this.page}`)
        .then(({ data }) => {
          this.$nuxt.$loading.finish();
          this.games = data;
        })
        .catch(() => {
          this.$nuxt.$loading.fail();
        });
    },
  },
};
</script>
