<template>
  <div class="space-y-1 min-w-[220px]">
    <!-- Label -->
    <label class="block text-sm font-medium text-gray-700" :for="uid">
      <slot name="label" />
    </label>
    <!-- Input -->
    <input
      :id="uid"
      ref="input"
      hidden
      type="file"
      :accept="accept"
      :multiple="multiple"
      @change="onChange"
    />
    <!-- Appearance -->
    <div
      class="flex justify-between gap-4 px-2 py-1 bg-gray-300 rounded"
      :class="{
        'border border-solid border-red-400': error,
      }"
    >
      <div class="px-2 text-lg font-semibold text-white bg-gray-400 rounded">
        {{ numberOfFiles }}
        {{ numberOfFiles === 1 ? 'file' : 'files' }}
      </div>

      <div class="flex gap-3">
        <ButtonPrimary
          v-if="multiple || !numberOfFiles"
          theme="green"
          size="xs"
          @click="$refs.input.click()"
        >
          <IconPlus class="size-lg" />
        </ButtonPrimary>

        <ButtonPrimary
          v-if="numberOfFiles"
          theme="red"
          size="xs"
          @click="reset"
        >
          <IconTrash class="size-lg" />
        </ButtonPrimary>
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
      <slot name="description"></slot>
    </p>
  </div>
</template>

<script>
import { typeCheck } from 'type-check';
import createFileList from 'create-file-list';

export default {
  model: {
    prop: 'model',
    event: 'change',
  },
  props: {
    model: {
      validator(val) {
        return typeCheck('Array|File', val);
      },
      required: true,
      default: () => [],
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    accept: {
      type: String,
      default: '*',
    },
    error: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      uid: undefined,
    };
  },
  computed: {
    fileOrFiles: {
      get() {
        return this.model;
      },
      set(val) {
        this.$emit('change', val);
      },
    },
    numberOfFiles() {
      let numberOfFiles = 0;
      if (this.$typeCheck('Array', this.fileOrFiles)) {
        numberOfFiles = this.fileOrFiles.length;
      } else if (this.$typeCheck('File', this.fileOrFiles)) {
        numberOfFiles = 1;
      }
      return numberOfFiles;
    },
  },
  created() {
    if (!this.fileOrFiles[0]) {
      this.$emit('change', this.multiple ? [] : undefined);
    }
  },
  mounted() {
    this.uid = this._uid;
  },
  methods: {
    createFileList,
    onChange() {
      if (!this.multiple) {
        this.$emit('change', this.$refs.input.files[0]);
      } else {
        this.$refs.input.files.forEach((file) => {
          this.fileOrFiles.push(file);
        });
      }
    },
    reset() {
      this.fileOrFiles = this.multiple ? [] : undefined;
      this.$refs.input.files = createFileList();
    },
  },
};
</script>
