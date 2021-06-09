<template>
  <div>
    <label class="sr-only">Search</label>
    <div class="flex rounded-md shadow-sm">
      <div class="relative flex-grow focus-within:z-10">
        <div
          class="
            absolute
            inset-y-0
            left-0
            pl-3
            flex
            items-center
            pointer-events-none
          "
        >
          <!-- Heroicon name: solid/search -->
          <IconSearch class="size-lg text-gray-400"></IconSearch>
        </div>
        <input
          v-model="modelValue"
          type="text"
          class="
            focus:ring-indigo-500 focus:border-indigo-500
            block
            w-full
            rounded-none rounded-l-md
            pl-10
            sm:hidden
            border-gray-300
          "
          :placeholder="placeholder"
        />
        <input
          v-model="modelValue"
          type="text"
          class="
            hidden
            focus:ring-indigo-500 focus:border-indigo-500
            w-full
            rounded-none rounded-l-md
            pl-10
            sm:block sm:text-sm
            border-gray-300
          "
          :placeholder="placeholder"
        />
      </div>

      <!-- Sort part -->
      <button
        type="button"
        class="
          -ml-px
          relative
          inline-flex
          items-center
          px-4
          py-2
          border border-gray-300
          text-sm
          font-medium
          rounded-r-md
          text-gray-700
          bg-gray-50
          hover:bg-gray-100
          focus:outline-none
          focus:ring-1
          focus:ring-indigo-500
          focus:border-indigo-500
        "
      >
        <!-- Heroicon name: solid/sort-ascending -->
        <svg
          class="h-5 w-5 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            d="M3 3a1 1 0 000 2h11a1 1 0 100-2H3zM3 7a1 1 0 000 2h5a1 1 0 000-2H3zM3 11a1 1 0 100 2h4a1 1 0 100-2H3zM13 16a1 1 0 102 0v-5.586l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 101.414 1.414L13 10.414V16z"
          />
        </svg>
        <span class="ml-2">Sort</span>
        <!-- Heroicon name: solid/chevron-down -->
        <svg
          class="ml-2.5 -mr-1.5 h-5 w-5 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  model: {
    prop: 'value',
    event: 'input',
  },
  props: {
    value: {
      type: String,
      default: undefined,
    },
    placeholder: {
      type: String,
      default: undefined,
    },
  },
  computed: {
    modelValue: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('input', val);
      },
    },
  },
};
</script>
