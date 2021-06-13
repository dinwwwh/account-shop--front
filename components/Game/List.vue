<template>
  <div class="bg-white shadow overflow-hidden sm:rounded-md">
    <ul class="divide-y divide-gray-200">
      <li v-for="game in games" :key="game.id">
        <GameListItem :game="game" />
      </li>
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
