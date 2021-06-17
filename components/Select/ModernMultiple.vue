<template>
  <div>
    <div
      class="
        border-solid border border-gray-300
        shadow-sm
        rounded-md
        px-4
        py-2
        flex flex-wrap
        gap-2
      "
    >
      <!-- Elements -->
      <div
        v-for="(option, i) in selectedOptions"
        :key="option.key"
        class="relative bg-indigo-500 rounded px-2 py-1"
        @click="removeValue(i)"
      >
        <span class="text-white">
          {{ displayKey ? option[displayKey] : option }}
        </span>
        <IconX
          class="
            absolute
            size-xs
            -top-1
            -right-1
            bg-red-500
            text-white
            rounded-full
            cursor-pointer
          "
        />
      </div>

      <!-- adds -->
      <div
        class="
          rounded
          px-2
          py-1
          bg-green-400
          cursor-pointer
          flex
          items-center
          justify-between
          text-gray-50
        "
        @click="hiddenOptions = false"
      >
        Thêm
        <IconPlus class="size-lg" />
      </div>
    </div>

    <LayerFloat v-show="!hiddenOptions" @close="hiddenOptions = true">
      <template #title>Danh sách vai trò</template>
      <ul class="mt-8 space-y-2">
        <li
          v-for="option in unselectedOptions"
          :key="option.key"
          class="
            flex
            items-center
            justify-between
            shadow
            bg-gray-100
            rounded
            pl-2
          "
          @click="addValue(option)"
        >
          <p>{{ displayKey ? option[displayKey] : option }}</p>
          <div
            class="
              rounded
              px-2
              py-1
              bg-green-400
              cursor-pointer
              flex
              items-center
              justify-between
              text-gray-50
            "
            @click="hiddenOptions = false"
          >
            Thêm
            <IconPlus class="size-lg" />
          </div>
        </li>
      </ul>
    </LayerFloat>
  </div>
</template>

<script>
export default {
  model: {
    prop: 'values',
    event: 'change',
  },
  props: {
    values: {
      type: Array,
      required: true,
      default() {
        return [];
      },
    },
    options: {
      type: Array,
      required: true,
      default() {
        return [];
      },
    },
    displayKey: {
      type: String,
      required: true,
      default: 'name',
    },
    valueKey: {
      type: String,
      required: true,
      default: 'value',
    },
  },
  data() {
    return {
      hiddenOptions: true,
    };
  },
  computed: {
    unselectedOptions() {
      return this.options.filter(
        (val) => !this.values.includes(val[this.valueKey])
      );
    },
    selectedOptions() {
      return this.options.filter((val) =>
        this.values.includes(val[this.valueKey])
      );
    },
  },
  methods: {
    removeValue(index) {
      const newValues = this.values.filter((val, i) => i !== index);
      this.$emit('change', newValues);
    },
    addValue(option) {
      const newValues = this.values;
      newValues.push(option[this.valueKey]);
      this.$emit('change', newValues);
    },
  },
};
</script>
