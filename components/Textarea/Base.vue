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
          rounded-md
        "
        :class="{
          'bg-gray-100 cursor-not-allowed': !canEdit,
          'border-gray-300': !error,
          'border-red-300': error,
        }"
        :placeholder="placeholder"
        :disabled="!canEdit"
      />
    </div>
    <!-- Description -->
    <p
      class="mt-2 text-sm"
      :class="{
        'text-red-500': error,
        'text-gray-500': !error,
      }"
    >
      <slot name="description"></slot>
    </p>
  </div>
</template>

<script>
import { typeCheck } from 'type-check';

export default {
  model: {
    prop: 'value',
    event: 'input',
  },
  props: {
    value: {
      validator(val, b) {
        return typeCheck('String | Null', val);
      },
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
    error: {
      type: Boolean,
      default: false,
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
