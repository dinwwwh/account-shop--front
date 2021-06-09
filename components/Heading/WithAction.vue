<template>
  <div class="bg-white px-4 py-5 sm:px-6">
    <div
      class="
        -ml-4
        -mt-2
        flex
        items-center
        justify-between
        flex-wrap
        sm:flex-nowrap
      "
    >
      <div class="ml-4 mt-2">
        <h3 class="text-lg leading-6 font-medium text-gray-900">
          <slot />
        </h3>
      </div>
      <div class="ml-4 mt-2">
        <slot name="actions" />
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>
