<template>
  <ul>
    <li v-for="game in games" :key="game.name">{{ game.id }}</li>

    <NuxtLink :to="{ name: 'index', query: { page: 1 } }">page 1</NuxtLink>
    <NuxtLink :to="{ name: 'index', query: { page: 2 } }">page 2</NuxtLink>
    <NuxtLink :to="{ name: 'index', query: { page: 3 } }">page 3</NuxtLink>
  </ul>
</template>

<script>
export default {
  asyncData({ $axios, query: { page } }) {
    return $axios
      .$get('game', {
        params: {
          page,
        },
      })
      .then(({ data, meta }) => ({
        games: data,
      }));
  },
  watchQuery: ['page'],
  // watch: {
  //   page() {
  //     this.freshGames();
  //   },
  // },
  // methods: {
  //   freshGames() {
  //     return this.$axios
  //       .$get(`game?page=${this.page}`, {
  //         progress: true,
  //       })
  //       .then(({ data }) => {
  //         this.games = data;
  //       });
  //   },
  // },
};
</script>
