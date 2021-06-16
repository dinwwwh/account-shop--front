<template>
  <div>
    <!-- Label for select tag -->
    <label
      id="listbox-label"
      class="block text-sm font-medium text-gray-700"
      @click="clickedLabel"
    >
      <slot name="label" />
    </label>

    <!-- Select tag -->
    <div class="mt-1 relative" @click="showOptions = !showOptions">
      <!-- Current display value -->
      <button
        ref="button"
        type="button"
        class="
          bg-white
          relative
          w-full
          border
          rounded-md
          shadow-sm
          pl-3
          pr-10
          py-2
          text-left
          cursor-default
          focus:outline-none focus:ring-1
          sm:text-sm
        "
        :class="{
          'border-red-300 focus:border-red-500 focus:ring-red-500': error,
          'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500':
            !error,
        }"
      >
        <!-- Current display value -->
        <span
          class="block truncate"
          :class="{ 'text-gray-400': !currentDisplayValue }"
        >
          {{ currentDisplayValue || placeholder }}
        </span>

        <!-- Icon extend -->
        <span
          class="
            absolute
            inset-y-0
            right-0
            flex
            items-center
            pr-2
            pointer-events-none
          "
        >
          <!-- Heroicon name: solid/selector -->
          <svg
            class="h-5 w-5"
            :class="{
              'text-gray-400': !error,
              'text-red-400': error,
            }"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </span>
      </button>

      <!-- Item list -->
      <transition name="change-o">
        <ul
          v-show="showOptions"
          class="
            absolute
            mt-1
            min-w-full
            bg-white
            shadow-lg
            max-h-60
            rounded-md
            py-1
            text-base
            ring-1 ring-black ring-opacity-5
            overflow-auto
            focus:outline-none
            sm:text-sm
          "
          tabindex="-1"
          role="listbox"
          aria-labelledby="listbox-label"
          aria-activedescendant="listbox-option-3"
        >
          <li
            v-for="(option, i) of customOptions"
            :key="i"
            class="cursor-pointer select-none relative py-2 pl-3 pr-9"
            :class="{
              'text-white bg-indigo-600': option.highlighted,
              'text-gray-900': !option.highlighted,
            }"
            role="option"
            @click="clickedOption(option)"
            @mouseenter="currentHighlighted = i"
            @mouseleave="currentHighlighted = undefined"
          >
            <!-- show display value of item -->
            <span
              class="block truncate"
              :class="{
                'font-semibold': option.selected,
                'font-normal': !option.selected,
              }"
            >
              {{ option.displayValue }}
            </span>

            <!-- Icon check show when selected -->
            <span
              v-show="option.value == value"
              class="absolute inset-y-0 right-0 flex items-center pr-4"
              :class="{
                'text-white': option.highlighted,
                'text-indigo-600': !option.highlighted,
              }"
            >
              <!-- Heroicon name: solid/check -->
              <svg
                class="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
          </li>
        </ul>
      </transition>
    </div>

    <!-- Description -->
    <p
      class="mt-2 text-sm"
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
export default {
  props: {
    // Contain entire option to show in sellect
    options: {
      type: Array,
      required: true,
      default() {
        return [];
      },
    },
    // Current value transfer by v-model
    value: {
      type: null,
      required: true,
    },

    // Placeholder of select tag
    placeholder: {
      type: [String, Number],
      default: 'Vui lòng chọn một',
    },
    // Determine value key in option to return it's value for scope parent
    valueKey: {
      type: String,
      default: 'value',
    },
    // Determine display key in option to show it's value for user interface
    displayKey: {
      type: String,
      default: 'displayValue',
    },
    // Determine whether this tag have error
    error: {
      type: null,
      default: false,
    },
  },
  data() {
    return {
      showOptions: false,
      currentHighlighted: undefined,
    };
  },
  computed: {
    // Determine current display value to show it for user interface
    currentDisplayValue() {
      return this.customOptions.find((option) => option.value === this.value)
        ?.displayValue;
    },
    // Change options was provide by parent scope => new option base (this.options, this.valueKey, this.displayKey)
    customOptions() {
      return this.options.map((option, i) => {
        return {
          displayValue: option[this.displayKey],
          value: option[this.valueKey],
          selected: option[this.valueKey] === this.value,
          highlighted: this.currentHighlighted === i,
        };
      });
    },
  },
  methods: {
    clickedOption(option) {
      if (option.value === this.value) {
        this.$emit('input', undefined);
        return;
      }
      this.$emit('input', option.value);
    },
    clickedLabel() {
      this.$refs.button.focus();
      this.showOptions = true;
    },
  },
};
</script>

<style scoped>
.change-o-leave-active {
  animation: c-o ease-in 0.08s;
}

@keyframes c-o {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
