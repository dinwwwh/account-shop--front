<template>
  <div>
    <!-- When on mobile -->
    <div class="sm:hidden">
      <SelectBaseMobile
        v-model="value"
        :options="options"
        :error="error"
        :value-key="valueKey"
        :display-key="displayKey"
        :placeholder="placeholder"
      >
        <template #label> <slot name="label" /> </template>
        <template #description> <slot name="description" /> </template>
      </SelectBaseMobile>
    </div>

    <!-- When on desktop -->
    <div class="hidden sm:block">
      <SelectBaseDefault
        v-model="value"
        :options="options"
        :error="error"
        :value-key="valueKey"
        :display-key="displayKey"
        :placeholder="placeholder"
      >
        <template #label> <slot name="label" /> </template>
        <template #description> <slot name="description" /> </template>
      </SelectBaseDefault>
    </div>
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
      default: undefined,
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
};
</script>
