<template>
  <div ref="datetime" class="space-y-1 relative">
    <!-- Label -->
    <label
      class="block text-sm font-medium text-gray-700"
      :for="id"
      @click="onClickLabel"
    >
      <slot name="label"></slot>
    </label>

    <Datetime
      v-model="date"
      :class="{
        'vdatetime--normal': !error,
        'vdatetime--disable': !canEdit,
        'vdatetime--error': error,
      }"
      v-bind="$attrs"
      v-on="$listeners"
    ></Datetime>

    <!-- Description -->
    <p
      class="mt-1 text-sm"
      :class="{
        'text-gray-500': !error,
        'text-red-500': error,
      }"
    >
      <slot name="description"></slot>
    </p>

    <div v-if="!canEdit" class="absolute inset-0 cursor-not-allowed"></div>
  </div>
</template>

<script>
import { Datetime } from 'vue-datetime';

export default {
  components: { Datetime },
  inheritAttrs: false,
  model: {
    prop: 'model',
    event: 'change',
  },
  props: {
    model: {
      type: String,
      required: true,
      default() {
        const date = new Date().toISOString();
        this.$emit('change', date);
        return date;
      },
    },
    error: {
      type: null,
      default: false,
    },
    canEdit: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      id: undefined,
    };
  },
  computed: {
    date: {
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
  methods: {
    onClickLabel() {
      this.$refs.datetime.querySelector('.vdatetime-input').click();
    },
  },
};
</script>

<style>
.vdatetime .vdatetime-input {
  @apply shadow-sm block w-full sm:text-sm rounded-md;
}

.vdatetime--normal .vdatetime-input {
  @apply border-gray-300 focus:border-indigo-500 focus:ring-indigo-500;
}

.vdatetime--disable .vdatetime-input {
  @apply bg-gray-100 cursor-not-allowed;
}

.vdatetime--error .vdatetime-input {
  @apply border-red-300 focus:border-red-500 focus:ring-red-500;
}
</style>
