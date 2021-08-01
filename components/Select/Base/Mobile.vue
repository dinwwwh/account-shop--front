<template>
  <div>
    <!-- Label -->
    <label :for="id" class="block text-sm font-medium text-gray-700">
      <slot name="label" />
    </label>

    <!-- Select -->
    <select
      :id="id"
      ref="select"
      v-model="value"
      name="location"
      class="
        focus:outline-none focus:ring-indigo-500 focus:border-indigo-500
        sm:text-sm
        block
        w-full
        py-2
        pl-3
        pr-10
        mt-1
        text-base
        rounded-md
      "
      :class="{
        'border-gray-300': !error,
        'border-red-300': error,
        'text-gray-500': value === undefined,
        'text-gray-900': value !== undefined,
      }"
    >
      <!-- Default value as placeholder -->
      <option :value="undefined" class="text-gray-500">
        {{ placeholder }}
      </option>

      <option
        v-for="(item, i) in options"
        :key="i"
        :value="valueKey ? item[valueKey] : item"
        :selected="(valueKey ? item[valueKey] : item) === value"
        class="text-gray-900"
      >
        {{ displayKey ? item[displayKey] : item }}
      </option>
    </select>

    <!-- Description -->
    <p
      class="mt-2 text-sm"
      :class="{
        'text-gray-500': !error,
        'text-red-500': error,
      }"
    >
      <slot name="description" />
    </p>
  </div>
</template>

<script>
export default {
  model: {
    prop: 'model',
    event: 'change',
  },
  props: {
    model: {
      type: null,
      required: true,
    },
    options: {
      type: Array,
      default: () => [],
    },
    valueKey: {
      type: [Number, String],
      default: undefined,
    },
    displayKey: {
      type: [Number, String],
      default: undefined,
    },
    placeholder: {
      type: String,
      default: 'Chọn một ...',
    },
    // Determine whether has any errors
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
    value: {
      get() {
        return this.model;
      },
      set(val) {
        this.$emit('change', val);
      },
    },
  },
  mounted() {
    this.id = this._uid;
  },
};
</script>
