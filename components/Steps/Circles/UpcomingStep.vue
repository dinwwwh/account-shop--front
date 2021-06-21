<template>
  <div class="relative">
    <div class="absolute inset-0 flex items-center" aria-hidden="true">
      <div class="h-0.5 w-full bg-gray-200"></div>
    </div>
    <a
      href="#"
      class="
        group
        relative
        w-8
        h-8
        flex
        items-center
        justify-center
        bg-white
        border-2 border-gray-300
        rounded-full
        hover:border-gray-400
      "
    >
      <span
        class="h-2.5 w-2.5 bg-transparent rounded-full group-hover:bg-gray-300"
        aria-hidden="true"
      ></span>
      <span class="sr-only">Step {{ step }}</span>
    </a>
  </div>
</template>

<script>
export default {
  props: {
    step: {
      type: Number,
      default: 0,
    },
  },
};
</script>
