<template>
  <div class="bg-white shadow overflow-hidden sm:rounded-md">
    <ul class="divide-y divide-gray-200">
      <GameInfoListItem
        v-for="(gameInfo, i) in gameInfos"
        :key="i"
        :game-info="gameInfo"
      />
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    // List account info to render
    gameInfos: {
      type: Array,
      required: true,
    },
  },
};
</script>
