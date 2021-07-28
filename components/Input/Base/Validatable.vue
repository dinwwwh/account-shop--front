<template>
  <InputBase
    v-model="value"
    v-bind="$attrs"
    :error="!!errorMessage"
    v-on="$listeners"
  >
    <template #label> <slot name="label" /> </template>

    <template #description>
      <template v-if="errorMessage">
        {{ errorMessage }}
      </template>

      <template v-else>
        <slot name="description" />
      </template>
    </template>
  </InputBase>
</template>

<script>
export default {
  inheritAttrs: false,
  model: {
    prop: 'model',
    event: 'change',
  },
  props: {
    model: {
      type: null,
      required: true,
    },
    rules: {
      type: Object,
      default: () => ({}),
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
    validator() {
      const validator = {
        vuelidate: this.$v.value,
        check: () => {
          this.$v.$touch();
          if (this.$v.$error) return false;
          if (this.$v.$pending) return null;
          return true;
        },
      };

      this.$emit('emit-validator', validator);
      return validator;
    },
    errorMessage() {
      return this.$getValidatorErrorMessage(this.$v.value, this.$attrs.name);
    },
  },
  validations() {
    return {
      value: this.rules,
    };
  },
  created() {
    return this.validator;
  },
};
</script>
