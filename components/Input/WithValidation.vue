<template>
  <div>
    <template v-if="!$typeCheck('Array', rule.values)">
      <template v-if="!rule.multiple">
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
        <p class="text-gray-500">
          Vui lòng liện hệ admin để thoàn hiện phần này
        </p>
      </template>
    </template>
    <template v-else>
      <template v-if="!rule.multiple">
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
      <template v-else>
        Vui lòng liện hệ admin để thoàn hiện phần này
      </template>
    </template>
  </div>
</template>

<script>
import { generateValidatorsFromRule } from '~/utils/validation';

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
    errorMessage() {
      return this.$getValidatorErrorMessage(this.$v.value);
    },
    options() {
      if (!this.$typeCheck('Array', this.rule.values)) return [];
      return this.rule.values.map((val) => ({ display: val, value: val }));
    },
  },
  validations() {
    return {
      value: this.generateValidatorsFromRule(this.rule),
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
    generateValidatorsFromRule,
  },
};
</script>
