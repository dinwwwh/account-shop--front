<template>
  <button
    type="button"
    class="
      inline-flex
      items-center
      border border-transparent
      font-medium
      shadow-sm
      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
    "
    :class="{
      ' px-2.5 py-1.5  text-xs rounded ': actualSize === 'xs',
      ' px-3 py-2  text-sm leading-4 rounded-md ': actualSize === 'sm',
      ' px-4 py-2  text-sm rounded-md ': actualSize === 'base',
      ' px-4 py-2  text-base rounded-md ': actualSize === 'lg',
      ' px-6 py-3  text-base rounded-md ': actualSize === 'xl',
      'text-white bg-indigo-600 hover:bg-indigo-700': theme === 'indigo',
    }"
    v-on="$listeners"
  >
    <slot />
  </button>
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
  },
  computed: {
    actualSize() {
      return this.size.toLowerCase();
    },
  },
};
</script>
