<template>
  <div class="pt-[18%] h-full">
    <div class="flex flex-col bg-white rounded-2xl shadow-xl h-full">
      <div class="flex-1 relative pt-20 md:pt-16 px-6 pb-8 md:px-8">
        <div
          class="
            absolute
            top-0
            left-1/2
            -translate-x-1/2
            sm:translate-x-0
            md:left-auto
            inline-block
            rounded-2xl
            transform
            -translate-y-1/2
            w-1/3
            pt-[33.3333%]
            sm:w-1/4 sm:pt-[25%]
            bg-center bg-cover
          "
          :style="`background-image: url(${
            representativeImage || '/images/errors/404/base.jpg'
          })`"
        ></div>
        <h3 class="text-xl font-medium text-blue-gray-900">
          {{ game.name }}
        </h3>
        <span class="font-normal size-base text-blue-gray-700">
          ({{ game.publisherName }})
        </span>

        <p class="mt-4 text-base text-blue-gray-500">
          {{ game.description }}
        </p>
      </div>
      <div class="p-6 bg-blue-gray-50 rounded-bl-2xl rounded-br-2xl md:px-8">
        <NuxtLink
          :to="{
            name: 'game-id',
            params: {
              id: game.id,
            },
          }"
          class="text-base font-medium text-blue-700 hover:text-blue-600"
        >
          Xem chi tiết
          <span aria-hidden="true"> →</span></NuxtLink
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    game: {
      type: Array,
      required: true,
      validator(game) {
        return game?.representativeImage?.path;
      },
    },
  },
  computed: {
    representativeImage() {
      return this.game?.representativeImage?.path;
    },
  },
};
</script>
