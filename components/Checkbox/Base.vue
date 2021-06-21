<template>
  <div class="flex items-start">
    <div class="flex items-center h-5">
      <input
        :id="id"
        :value="value"
        :checked="checked"
        type="checkbox"
        class="h-4 w-4 rounded"
        :class="{
          'text-indigo-600 border-gray-300 focus:ring-indigo-500': !error,
          'text-red-600 border-red-300 focus:ring-red-500': error,
        }"
        @change="changeInput"
      />
    </div>

    <div class="ml-3 text-sm">
      <!-- Label -->
      <label :for="id" class="font-medium text-gray-700">
        <slot name="label" />
      </label>

      <!-- Description -->
      <p :class="{ 'text-gray-500': !error, 'text-red-500': error }">
        <slot name="description" />
      </p>
    </div>
  </div>
</template>

<script>
export default {
  model: {
    prop: 'modelValue',
    event: 'change',
  },
  props: {
    // Provide by v-model
    modelValue: {
      type: null,
      required: true,
    },
    // Contain value of this input tag
    value: {
      type: null,
      default: true,
    },
    // Determine whether this input tag has error
    error: {
      type: null,
      default: false,
    },
  },
  data() {
    return {
      id: undefined,
    };
  },
  computed: {
    // Determine whether checkbox need checked
    checked() {
      // Case: this.modelValue is an array
      if (Array.isArray(this.modelValue)) {
        return this.modelValue.find((val) => val === this.value);
      }

      // The rest case
      return this.modelValue === this.value;
    },
  },
  mounted() {
    this.id = this._uid;
  },
  methods: {
    changeInput(e) {
      // case: model value is an array
      if (this.modelValue instanceof Array) {
        this.handleArrayModel(e);
        return;
      }

      // the rest case
      this.handleFundamentalModel(e);
    },
    // Handle if value model is an array
    handleArrayModel(e) {
      const isChecked = e.target.checked;
      const isExistValue = this.modelValue.find((val) => val === this.value);

      if (isChecked && !isExistValue) {
        this.$emit('change', [this.value, ...this.modelValue]);
      } else if (!isChecked && isExistValue) {
        const newModelValue = this.modelValue.filter(
          (val) => val !== this.value
        );
        this.$emit('change', newModelValue);
      }
    },
    // Handle if value model is an fundamental value
    handleFundamentalModel(e) {
      const isChecked = e.target.checked;

      if (isChecked) {
        this.$emit('change', this.value);
      } else {
        this.$emit('change', null);
      }
    },
  },
};
</script>
