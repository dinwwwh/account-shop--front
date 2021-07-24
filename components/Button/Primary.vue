<template>
  <div
    class="
      relative
      rounded-md
      overflow-hidden
      focus-within:ring-2 focus-within:ring-offset-2
    "
    :class="{
      rounded: actualSize === 'xs',
      'focus-within:ring-indigo-500': theme === 'indigo',
      'focus-within:ring-red-500': theme === 'red',
      'focus-within:ring-green-500': theme === 'green',
      'focus-within:ring-yellow-500': theme === 'yellow',
      'focus-within:ring-blue-500': theme === 'blue',
      'focus-within:ring-gray-500': theme === 'gray',
      'focus-within:ring-purple-500': theme === 'purple',
      'focus-within:ring-pink-500': theme === 'pink',
    }"
    v-on="$listeners"
  >
    <button
      type="button"
      class="
        w-full
        focus:outline-none
        flex
        items-center
        justify-center
        m-x-auto
        font-medium
        border border-transparent
        shadow-sm
      "
      :class="{
        ' px-2.5 py-1.5  text-xs': actualSize === 'xs',
        ' px-3 py-2  text-sm leading-4': actualSize === 'sm',
        ' px-4 py-2  text-sm': actualSize === 'base',
        ' px-4 py-2  text-base': actualSize === 'lg',
        ' px-6 py-3  text-base': actualSize === 'xl',
        'text-white bg-indigo-600 hover:bg-indigo-700 ': theme === 'indigo',
        'text-white bg-red-600 hover:bg-red-700 ': theme === 'red',
        'text-white bg-green-600 hover:bg-green-700 ': theme === 'green',
        'text-white bg-yellow-600 hover:bg-yellow-700 ': theme === 'yellow',
        'text-white bg-blue-600 hover:bg-blue-700 ': theme === 'blue',
        'text-white bg-gray-600 hover:bg-gray-700 ': theme === 'gray',
        'text-white bg-purple-600 hover:bg-purple-700 ': theme === 'purple',
        'text-white bg-pink-600 hover:bg-pink-700 ': theme === 'pink',
        'text-opacity-10': loading,
      }"
    >
      <slot />
    </button>

    <!-- Indicator loading -->
    <div
      v-if="loading"
      class="
        absolute
        inset-0
        flex
        items-center
        justify-center
        bg-black bg-opacity-10
      "
    >
      <IconLoading class="size-xl animate-spin text-white" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    size: {
      type: String,
      default: 'base',
    },
    theme: {
      type: String,
      default: 'indigo',
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    actualSize() {
      return this.size.toLowerCase();
    },
  },
};
</script>
