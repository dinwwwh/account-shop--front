<template>
  <div class="relative">
    <div class="absolute inset-0 flex items-center" aria-hidden="true">
      <div class="h-0.5 w-full bg-indigo-600"></div>
    </div>
    <a
      href="#"
      class="
        relative
        w-8
        h-8
        flex
        items-center
        justify-center
        bg-indigo-600
        rounded-full
        hover:bg-indigo-900
      "
    >
      <IconCheck class="size-xl text-white" />
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
