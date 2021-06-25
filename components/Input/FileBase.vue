<template>
  <div>
    <!-- Label -->
    <label class="block text-sm font-medium text-gray-700" :for="id">
      <slot name="label" />
    </label>
    <!-- Input -->
    <div class="mt-1 relative">
      <input
        :id="id"
        ref="fileInput"
        type="file"
        :placeholder="placeholder"
        :disabled="!canEdit"
        :multiple="multiple"
        :accept="accept"
        @change="onChange"
      />

      <!-- Icon error -->
      <div
        v-show="error"
        class="
          absolute
          inset-y-0
          right-0
          pr-3
          flex
          items-center
          pointer-events-none
        "
      >
        <!-- Icon error in here -->
      </div>
    </div>

    <!-- Description -->
    <p
      class="mt-1 text-sm"
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
import createFileList from 'create-file-list';
import { typeCheck } from 'type-check';

export default {
  model: {
    prop: 'value',
    event: 'change',
  },
  props: {
    // Contain value transfer by v-model in parent scope
    value: {
      required: true,
      validator(val) {
        return typeCheck('Array|File|Undefined', val);
      },
    },
    accept: {
      type: String,
      default: undefined,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: [String, Number],
      default: undefined,
    },
    // Determine whether this tag error
    error: {
      type: Boolean,
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
  watch: {
    value() {
      this.initFileInput();
    },
  },
  mounted() {
    this.id = this._uid;
    this.initFileInput();
  },
  methods: {
    onChange(e) {
      if (this.multiple) {
        this.$emit('change', [...e.target.files]);
      } else {
        this.$emit('change', e.target.files[0]);
      }
    },
    initFileInput() {
      if (this.$typeCheck('Array|File', this.value)) {
        // this method work in both non-array and array => same result
        this.$refs.fileInput.files = createFileList(this.value);
      }
    },
  },
};
</script>
