<template>
  <div>
    <div v-for="(accountInfo, i) in accountInfos" :key="accountInfo.id">
      <InputWithValidation
        :model-value="get(accountInfo)"
        :rule="accountInfo.rule"
        :is-touch-auto="isTouchAuto"
        @input="set(accountInfo, $event)"
        @emitted-validator-panel="mergeValidatorPanels($event, i)"
      >
        <template #label>{{ accountInfo.name }}</template>
        <template #description>{{ accountInfo.description }}</template>
      </InputWithValidation>
    </div>
  </div>
</template>

<script>
import typeCheck from 'type-check';

export default {
  model: {
    prop: 'model',
    event: 'input',
  },
  props: {
    model: {
      type: Object,
      required: true,
      default() {
        const val = {};
        this.$$emit('input', val);
        return val;
      },
    },
    accountInfos: {
      type: Array,
      required: true,
      validator(accountInfos) {
        return !accountInfos.some(({ rule }) => !typeCheck('Object', rule));
      },
    },
    isTouchAuto: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      validatorPanels: [],
    };
  },
  computed: {
    filledAccountInfos: {
      get() {
        return this.model;
      },
      set(val) {
        this.$emit('input', val);
      },
    },
    panel() {
      return {
        validatorPanels: this.validatorPanels,
        check: () => {
          const result = {
            isPending: false,
            isInvalid: false,
          };

          this.validatorPanels.forEach((v) => {
            v.$touch();
          });

          for (const v of this.validatorPanels) {
            if (v.$pending) result.isPending = true;
            if (v.$invalid) result.isInvalid = true;
            if (result.isPending && result.isInvalid) return result;
          }
          return result;
        },
      };
    },
  },
  created() {
    this.$emit('emit-panel', this.panel);
  },
  methods: {
    mergeValidatorPanels($v, index) {
      this.validatorPanels[index] = $v;
    },
    get(accountInfo) {
      return this.filledAccountInfos[accountInfo.id]?.values;
    },
    set(accountInfo, values) {
      if (!this.filledAccountInfos[accountInfo.id]) {
        this.filledAccountInfos[accountInfo.id] = { values };
      } else {
        this.filledAccountInfos[accountInfo.id].values = values;
      }
      this.$forceUpdate();
    },
  },
};
</script>
