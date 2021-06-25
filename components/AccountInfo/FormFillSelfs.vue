<template>
  <div>
    <div v-for="(accountInfo, i) in accountInfos" :key="accountInfo.id">
      <InputWithValidation
        v-model="filledAccountInfos[`id${accountInfo.id}`]"
        :rule="accountInfo.rule"
        :is-touch-auto="isTouchAuto"
        @emitted-validator-panel="mergeValidatorPanels($event, i)"
      >
        <template #label>{{ accountInfo.name }}</template>
        <template #description>{{ accountInfo.description }}</template>
      </InputWithValidation>
    </div>
  </div>
</template>

<script>
export default {
  model: {
    prop: 'model',
    event: 'input',
  },
  props: {
    model: {
      type: Object,
      required: true,
    },
    accountInfos: {
      type: Array,
      required: true,
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
  },
};
</script>
