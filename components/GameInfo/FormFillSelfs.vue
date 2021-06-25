<template>
  <div>
    <div v-for="(gameInfo, i) in gameInfos" :key="gameInfo.id">
      <InputWithValidation
        v-model="filledGameInfos[`id${gameInfo.id}`]"
        :rule="gameInfo.rule"
        :is-touch-auto="isTouchAuto"
        @emitted-validator-panel="mergeValidatorPanels($event, i)"
      >
        <template #label>{{ gameInfo.name }}</template>
        <template #description>{{ gameInfo.description }}</template>
      </InputWithValidation>
    </div>
  </div>
</template>

<script>
export default {
  model: {
    prop: 'modelGameInfos',
    event: 'input',
  },
  props: {
    modelGameInfos: {
      type: Object,
      required: true,
    },
    gameInfos: {
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
    filledGameInfos: {
      get() {
        return this.modelGameInfos;
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
            isInvalid: false,
            isPending: false,
          };

          this.validatorPanels.forEach((panel) => panel.$touch());
          for (const panel of this.validatorPanels) {
            if (panel.$invalid) {
              result.isInvalid = true;
            }
            if (panel.$pending) {
              result.isPending = true;
            }
            if (result.isInvalid && result.isPending) {
              break;
            }
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
