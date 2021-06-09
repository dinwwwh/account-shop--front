<template>
  <div class="md:grid md:grid-cols-3 md:gap-6">
    <div class="md:col-span-1">
      <div class="px-4 sm:px-0">
        <!-- Title -->
        <h3 class="text-lg font-medium leading-6 text-gray-900">{{ title }}</h3>
        <!-- Description -->
        <p v-if="description" class="mt-1 text-sm text-gray-600">
          {{ description }}
        </p>
      </div>
    </div>
    <div class="mt-5 md:mt-0 md:col-span-2">
      <div class="shadow sm:rounded-md sm:overflow-hidden">
        <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
          <!-- Slot -->
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: [String, Number],
      required: true,
    },
    description: {
      type: [String, Number],
      default: null,
    },
  },
};
</script>
