<template>
  <div class="flex items-center">
    <input
      type="search"
      class="
        focus:ring-indigo-500 focus:border-indigo-500
        block
        w-full
        rounded-lg
        mr-2
        sm:text-sm
        border-gray-300
      "
      :placeholder="placeholder"
    />
    <IconSearch class="text-gray-400 size-3xl"></IconSearch>
  </div>
</template>

<script>
export default {
  props: {
    placeholder: {
      type: String,
      default: undefined,
    },
  },
};
</script>
