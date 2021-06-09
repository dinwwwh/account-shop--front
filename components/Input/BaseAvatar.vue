<template>
  <div>
    <label class="block text-sm font-medium text-gray-700" :for="id">
      <slot name="label" />
    </label>
    <input
      :id="id"
      ref="file"
      type="file"
      class="hidden"
      accept="image/*"
      @change="uploadFile"
    />
    <div class="mt-1 flex items-center space-x-5">
      <span
        class="inline-block h-12 w-12 overflow-hidden bg-gray-100"
        :class="`rounded-${rounded}`"
      >
        <img
          v-if="previewSrc"
          :src="previewSrc"
          alt="avatar"
          class="w-full h-full object-cover object-center"
        />
        <svg
          v-else
          class="h-full w-full text-gray-300"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      </span>
      <button
        type="button"
        class="
          bg-white
          py-2
          border border-gray-300
          px-3
          rounded-md
          shadow-sm
          text-sm
          leading-4
          font-medium
          text-gray-700
          hover:bg-gray-50
          focus:outline-none
          focus:ring-2
          focus:ring-offset-2
          focus:ring-indigo-500
        "
        @click="$refs.file.click()"
      >
        <slot name="button-content">Change</slot>
      </button>
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
      default: null,
    },
    rounded: {
      type: String,
      default: 'full',
    },
  },
  data() {
    return {
      id: undefined,
      file: undefined,
      fileReader: undefined,
      previewSrc: undefined,
    };
  },
  computed: {
    // fileReader() {},
  },
  mounted() {
    this.fileReader = new window.FileReader();
    this.id = this._uid;

    // File Reader
    this.fileReader.onloadend = () => {
      this.previewSrc = this.fileReader.result;
    };
  },
  methods: {
    uploadFile(e) {
      this.file = e.target.files[0];
      if (this.file) {
        this.fileReader.readAsDataURL(this.file);
      }

      this.$emit('change', this.file);
    },
  },
};
</script>
