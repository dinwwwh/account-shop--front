<template>
  <div>
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-class="translate-y-1/4 opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-class="translate-y-0 opacity-100"
      leave-to-class="translate-y-1/4 opacity-0"
    >
      <div
        v-if="isShow"
        class="bg-opacity-20 fixed inset-0 z-50 flex bg-black"
        @click.self="isShow = false"
      >
        <div
          class="
            sm:align-middle sm:min-w-max sm:p-6
            inline-block
            px-4
            pt-5
            pb-4
            m-auto
            mt-10
            overflow-auto
            text-left
            align-bottom
            transition-all
            transform
            bg-white
            rounded-lg
            shadow-xl
            max-w-[100wh]
          "
        >
          <div class="sm:block absolute top-0 right-0 pt-4 pr-4">
            <button
              type="button"
              class="
                hover:text-gray-500
                focus:outline-none
                focus:ring-2
                focus:ring-offset-2
                focus:ring-indigo-500
                text-gray-400
                bg-white
                rounded-md
              "
              @click="isShow = false"
            >
              <IconX class="size-2xl" />
            </button>
          </div>

          <slot />
        </div>
      </div>
    </transition>
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
      type: Boolean,
      default: false,
    },
  },
  computed: {
    isShow: {
      get() {
        return this.model;
      },
      set(val) {
        this.$emit('change', !!val);
      },
    },
  },
};
</script>
