<template>
  <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
    <div
      v-for="game in games"
      :key="game.id"
      class="
        relative
        rounded-lg
        bg-white
        px-6
        py-5
        shadow-sm
        flex
        items-center
        space-x-3
        hover:bg-gray-50
        focus-within:ring-2
        focus-within:ring-offset-2
        focus-within:ring-indigo-500
      "
      :class="{
        'border border-gray-300': !isSelectedGame(game),
        'border-2 border-red-400': isSelectedGame(game),
      }"
      @click="selectGame(game)"
    >
      <div class="flex-shrink-0">
        <img
          class="h-10 w-10 rounded-full"
          :src="game.representativeImage.path"
          alt=""
        />
      </div>
      <div class="flex-1 min-w-0">
        <a href="#" class="focus:outline-none">
          <span class="absolute inset-0" aria-hidden="true"></span>
          <p class="text-sm font-medium text-gray-900">{{ game.name }}</p>
          <p class="text-sm text-gray-500 truncate">{{ game.publisherName }}</p>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  model: {
    prop: 'modelGame',
    event: 'changed',
  },
  props: {
    modelGame: {
      type: Object,
      required: true,
      default() {
        return {};
      },
    },
    games: {
      type: Array,
      required: true,
    },
  },
  computed: {
    selectedGame: {
      get() {
        return this.modelGame;
      },
      set(val) {
        this.$emit('changed', val);
      },
    },
  },
  methods: {
    selectGame(game) {
      this.selectedGame = game;
    },
    isSelectedGame(game) {
      return this.selectedGame.id === game.id;
    },
  },
};
</script>
