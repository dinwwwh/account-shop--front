<template>
  <div class="bg-white shadow">
    <div class="px-4 sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
      <div
        :class="{
          'lg:border-t lg:border-gray-200': divideLine,
        }"
      >
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // Determine whether show top border to divide
    divideLine: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
