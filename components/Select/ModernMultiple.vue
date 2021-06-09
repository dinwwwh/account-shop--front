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
        v-for="(value, i) in values"
        :key="i"
        class="relative bg-indigo-500 rounded px-2 py-1"
        @click="removeValue(value)"
      >
        <span class="text-white">
          {{ displayKey ? value[displayKey] : value }}
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
          v-for="(option, i) in unselectedOptions"
          :key="i"
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
      default: null,
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
        (val) => !this.values.find((val2) => val === val2)
      );
    },
  },
  methods: {
    removeValue(deValue) {
      const newValues = this.values.filter((val) => val !== deValue);
      this.$emit('change', newValues);
    },
    addValue(val) {
      const newValues = this.values;
      newValues.push(val);
      this.$emit('change', newValues);
    },
  },
};
</script>
