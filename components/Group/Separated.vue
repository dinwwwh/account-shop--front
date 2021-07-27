<template>
  <div class="flex flex-col bg-white rounded-2xl shadow-xl">
    <div class="flex-1 relative px-4 py-6 md:px-6">
      <slot />
    </div>
    <div class="p-4 bg-blue-gray-50 rounded-bl-2xl rounded-br-2xl md:px-8">
      <slot name="bottom" />
    </div>
  </div>
</template>

<script>
export default {};
</script>
