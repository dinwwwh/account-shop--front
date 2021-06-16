<template>
  <div>
    <!-- Label -->
    <label :for="id" class="block text-sm font-medium text-gray-700">
      <slot name="label"></slot>
    </label>
    <!-- Main textarea -->
    <div class="mt-1">
      <textarea
        :id="id"
        v-model="modelValue"
        :rows="rows"
        class="
          shadow-sm
          focus:ring-indigo-500 focus:border-indigo-500
          block
          w-full
          sm:text-sm
          border-gray-300
          rounded-md
        "
        :class="{
          'bg-gray-100 cursor-not-allowed': !canEdit,
        }"
        :placeholder="placeholder"
        :disabled="!canEdit"
      />
    </div>
    <!-- Description -->
    <p class="mt-2 text-sm text-gray-500">
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
    value: {
      type: String,
      required: true,
      default: '',
    },
    placeholder: {
      type: String,
      default: undefined,
    },
    rows: {
      type: Number,
      default: 3,
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
  mounted() {
    this.id = this._uid;
  },
};
</script>
