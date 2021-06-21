<template>
  <div>
    <template v-if="!$typeCheck('Array', rule.values)">
      <InputBase
        v-if="type"
        v-model="value"
        :type="type"
        :error="errorMessage"
        @input="onInput"
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
    <template v-else>
      <SelectBase
        v-model="value"
        :options="options"
        display-key="display"
        value-key="value"
        :error="errorMessage"
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
      </SelectBase>
    </template>
  </div>
</template>

<script>
export default {
  model: {
    prop: 'modelValue',
    event: 'input',
  },
  props: {
    modelValue: {
      type: null,
      required: true,
    },
    rule: {
      type: Object,
      required: true,
    },
    isTouchAuto: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    value: {
      get() {
        return this.modelValue;
      },
      set(val) {
        this.$emit('input', val);
      },
    },
    type() {
      const datatype = this.rule.datatype;
      if (datatype === 'string') {
        return 'text';
      } else if (datatype === 'integer') {
        return 'number';
      }

      return undefined;
    },
    isRequired() {
      const rolesAuthHave = this.$store.state.auth.profile.roles;
      // case is boolean variable
      if (this.$typeCheck('Boolean', this.rule.required)) {
        return this.rule.required;
      }
      // case equal null -> determine by requiredRoles
      else if (this.rule.required === null) {
        for (const requiredRole of this.rule.requiredRoles) {
          for (const roleAuthHas of rolesAuthHave) {
            if (requiredRole.id === roleAuthHas.id) return true;
          }
        }
      }
      return false;
    },
    errorMessage() {
      return this.$getValidatorErrorMessage(this.$v.value);
    },
    options() {
      if (!this.$typeCheck('Array', this.rule.values)) return [];
      return this.rule.values.map((val) => ({ display: val, value: val }));
    },
  },
  validations() {
    const rule = this.rule;
    const ruleOfValue = {};
    const validators = this.$vuelidate.validators;

    if (this.isRequired) {
      ruleOfValue.required = validators.required;
    }

    if (rule.datatype === 'integer') {
      ruleOfValue.integer = validators.integer;
    }

    if (this.$typeCheck('Array', rule.values)) {
      ruleOfValue.in = validators.in(rule.values);
    }

    return {
      value: ruleOfValue,
    };
  },
  watch: {
    $v() {
      this.emitValidator();
    },
  },
  created() {
    this.emitValidator();
  },
  methods: {
    emitValidator() {
      this.$emit('emitted-validator-panel', this.$v.value);
    },
    onInput() {
      if (this.isTouchAuto) this.$v.value.$touch();
    },
  },
};
</script>
