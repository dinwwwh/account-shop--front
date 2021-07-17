<template>
  <div>
    <div
      class="
        h-96
        md:grid-cols-2 md:rounded-2xl
        relative
        grid-cols-1 grid-rows-1
        gap-2
        overflow-hidden
        shadow-sm
        rounded-md
      "
    >
      <!-- Main image -->
      <div
        class="h-full bg-center bg-cover"
        :style="`background-image: url(${imagePaths[0]});`"
      ></div>
      <!-- Other images -->
      <div class="md:grid hidden h-full grid-cols-2 grid-rows-2 gap-2">
        <div
          v-for="i in 4"
          :key="imagePaths[i]"
          class="bg-center bg-cover"
          :style="`background-image: url(${imagePaths[i]});`"
        ></div>
      </div>

      <!-- View full images -->
      <button
        class="
          bottom-2
          right-2
          hover:transform hover:scale-105
          absolute
          flex
          items-center
          gap-1
          px-2
          py-1
          transition-transform
          bg-white
          border border-gray-400 border-solid
          rounded-md
          shadow
        "
        @click="isShowDetail = true"
      >
        <IconViewGrid class="size-lg text-gray-600" />
        <span class="text-sm font-medium text-gray-600"> Xem chi tiết </span>
      </button>
    </div>

    <!-- View detail -->
    <PopupFullScreen v-model="isShowDetail">
      <div class="max-w-2xl px-2 mx-auto space-y-4">
        <div v-for="imagePath in imagePaths" :key="imagePath + 'detail'">
          <img :src="imagePath" class="w-full rounded" />
        </div>
      </div>
    </PopupFullScreen>
  </div>
</template>

<script>
export default {
  props: {
    imagePaths: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      isShowDetail: false,
    };
  },
};
</script>
