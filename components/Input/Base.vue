<template>
  <div>
    <!-- Label -->
    <label class="block text-sm font-medium text-gray-700" :for="id">
      <slot name="label"></slot>
    </label>
    <!-- Input -->
    <div class="mt-1 relative">
      <input
        :id="id"
        class="shadow-sm block w-full sm:text-sm rounded-md"
        :class="{
          'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500':
            !error,
          'border-red-300 focus:border-red-500 focus:ring-red-500': error,
          'bg-gray-100 cursor-not-allowed': !canEdit,
        }"
        :type="type"
        :value="value"
        :placeholder="placeholder"
        :disabled="!canEdit"
        @input="changeInput"
      />

      <!-- Icon error -->
      <div
        v-show="error"
        class="
          absolute
          inset-y-0
          right-0
          pr-3
          flex
          items-center
          pointer-events-none
        "
      >
        <!-- Heroicon name: solid/exclamation-circle -->
        <svg
          class="h-5 w-5 text-red-500"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
    </div>

    <!-- Description -->
    <p
      class="mt-1 text-sm"
      :class="{
        'text-gray-500': !error,
        'text-red-500': error,
      }"
    >
      <slot name="description"></slot>
    </p>
  </div>
</template>

<script>
export default {
  model: {
    prop: 'value',
    event: 'input',
  },
  props: {
    // Contain value transfer by v-model in parent scope
    value: {
      type: [String, Number],
      default: undefined,
    },
    type: {
      type: String,
      default: 'text',
    },
    placeholder: {
      type: [String, Number],
      default: undefined,
    },
    // Determine whether this tag errored
    error: {
      type: null,
      default: false,
    },
    canEdit: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      id: undefined,
    };
  },
  mounted() {
    this.id = this._uid;
  },
  methods: {
    changeInput(e) {
      this.$emit('input', e.target.value);
    },
  },
};
</script>
