<template>
  <!-- This example requires Tailwind CSS v2.0+ -->
  <div>
    <ul class="space-y-2">
      <li v-for="accountType in accountTypes" :key="accountType.id">
        <div
          class="
            bg-white
            shadow-sm
            rounded-md
            hover:bg-gray-50
            focus-within:ring-2
            focus-within:ring-offset-2
            focus-within:ring-indigo-500
            relative
          "
          :class="{
            'border border-gray-300': !isSelectedAccountType(accountType),
            'border-2 border-red-400': isSelectedAccountType(accountType),
          }"
          @click="selectAccountType(accountType)"
        >
          <a href="#" class="absolute inset-0 outline-none"></a>
          <div class="px-4 py-4 sm:px-6">
            <div class="flex items-center justify-between">
              <p class="text-sm font-medium text-indigo-600 truncate">
                {{ accountType.name }}
              </p>
              <div
                class="
                  ml-2
                  flex
                  items-center
                  text-sm text-gray-500
                  sm:mt-0
                  gap-2
                "
              >
                <IconCalendarEdit class="size-sm" />
                <p>
                  Cập nhật lần cuối
                  <time :datetime="accountType.updatedAt">
                    {{ $moment.fromNow(accountType.updatedAt) }}
                  </time>
                </p>
              </div>
            </div>
            <div class="mt-2 sm:flex sm:justify-between">
              <div class="sm:flex">
                <p class="flex items-center text-sm text-gray-500 gap-2">
                  <IconSpeakerphone class="size-sm" />
                  {{ accountType.description }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  model: {
    prop: 'modelAccountType',
    event: 'changed',
  },
  props: {
    modelAccountType: {
      type: Object,
      required: true,
      default() {
        return {};
      },
    },
    accountTypes: {
      type: Array,
      required: true,
    },
  },
  computed: {
    selectedAccountType: {
      get() {
        return this.modelAccountType;
      },
      set(val) {
        this.$emit('changed', val);
      },
    },
  },
  methods: {
    selectAccountType(accountType) {
      this.selectedAccountType = accountType;
    },
    isSelectedAccountType(accountType) {
      return this.selectedAccountType.id === accountType.id;
    },
  },
};
</script>
