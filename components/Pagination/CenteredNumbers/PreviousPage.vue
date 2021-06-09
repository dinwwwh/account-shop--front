<template>
  <div
    class="
      border-t-2 border-transparent
      pt-4
      pr-1
      inline-flex
      items-center
      text-sm
      font-medium
      text-gray-500
      hover:text-gray-700 hover:border-gray-300
      cursor-pointer
    "
    v-on="$listeners"
  >
    <!-- Heroicon name: solid/arrow-narrow-left -->
    <IconArrowNarrowLeft class="mr-3 size-lg text-gray-400" />
    Previous
  </div>
</template>

<script>
export default {};
</script>
