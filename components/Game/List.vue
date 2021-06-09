<template>
  <div class="bg-white shadow overflow-hidden sm:rounded-md">
    <ul class="divide-y divide-gray-200">
      <GameListItem
        v-for="(game, i) in games"
        :key="i"
        :game="game"
      ></GameListItem>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    // List game used to render
    games: {
      type: Array,
      required: true,
    },
  },
};
</script>
