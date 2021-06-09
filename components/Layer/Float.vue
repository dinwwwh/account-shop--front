<template>
  <div class="inset-0 bg-black bg-opacity-20 z-50 fixed flex">
    <div class="relative m-auto bg-white rounded-2xl p-8 pt-4">
      <div class="flex items-center justify-between">
        <!-- Title -->
        <div class="">
          <HeadingBase2>
            <slot name="title" />
          </HeadingBase2>
        </div>

        <!-- Icon close -->
        <div class="ml-4" @click="close">
          <button
            type="button"
            class="
              inline-flex
              bg-gray-50
              rounded-md
              p-1.5
              text-gray-500
              hover:bg-gray-100
              focus:outline-none
              focus:ring-2
              focus:ring-offset-2
              focus:ring-offset-gray-50
              focus:ring-gray-600
            "
          >
            <span class="sr-only">Dismiss</span>
            <svg
              class="h-6 w-6"
              x-description="Heroicon name: solid/x"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
      </div>
      <!-- Main -->
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    close() {
      this.$emit('close');
    },
  },
};
</script>
