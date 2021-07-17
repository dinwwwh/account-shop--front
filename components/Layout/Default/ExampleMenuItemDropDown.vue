<template>
  <div>
    <!-- Item active: "text-gray-900", Item inactive: "text-gray-500" -->
    <button
      type="button"
      class="
        text-gray-500
        group
        bg-white
        rounded-md
        inline-flex
        items-center
        text-base
        font-medium
        hover:text-gray-900
        focus:outline-none
        focus:ring-2
        focus:ring-offset-2
        focus:ring-indigo-500
      "
      aria-expanded="false"
      @click="isShowFully = !isShowFully"
    >
      <span>Solutions</span>
      <!--
                Item active: "text-gray-600", Item inactive: "text-gray-400"
              -->
      <IconChevronDown
        class="text-gray-400 ml-2 h-5 w-5 group-hover:text-gray-500"
      />
    </button>

    <!--
              'Solutions' flyout menu, show/hide based on flyout menu state.

              Entering: "transition ease-out duration-200"
                From: "opacity-0 -translate-y-1"
                To: "opacity-100 translate-y-0"
              Leaving: "transition ease-in duration-150"
                From: "opacity-100 translate-y-0"
                To: "opacity-0 -translate-y-1"
            -->
    <transition
      enter-active-class="transition ease-out duration-200"
      enter-class="opacity-0 -translate-y-1"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition ease-in duration-150"
      leave-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-1"
    >
      <div
        v-show="isShowFully"
        class="
          hidden
          md:block
          absolute
          z-10
          top-full
          inset-x-0
          transform
          shadow-lg
          bg-white
        "
      >
        <div
          class="
            max-w-7xl
            mx-auto
            grid
            gap-y-6
            px-4
            py-6
            sm:grid-cols-2 sm:gap-8 sm:px-6 sm:py-8
            lg:grid-cols-4 lg:px-8 lg:py-12
            xl:py-16
          "
        >
          <a
            href="#"
            class="
              -m-3
              p-3
              flex flex-col
              justify-between
              rounded-lg
              hover:bg-gray-50
            "
          >
            <div class="flex md:h-full lg:flex-col">
              <div class="flex-shrink-0">
                <span
                  class="
                    inline-flex
                    items-center
                    justify-center
                    h-10
                    w-10
                    rounded-md
                    bg-indigo-500
                    text-white
                    sm:h-12 sm:w-12
                  "
                >
                  <IconChartBar class="size-2xl" />
                </span>
              </div>
              <div
                class="
                  ml-4
                  md:flex-1 md:flex md:flex-col md:justify-between
                  lg:ml-0 lg:mt-4
                "
              >
                <div>
                  <p class="text-base font-medium text-gray-900">Analytics</p>
                  <p class="mt-1 text-sm text-gray-500">
                    Get a better understanding of where your traffic is coming
                    from.
                  </p>
                </div>
                <p class="mt-2 text-sm font-medium text-indigo-600 lg:mt-4">
                  Learn more <span aria-hidden="true">&rarr;</span>
                </p>
              </div>
            </div>
          </a>

          <a
            href="#"
            class="
              -m-3
              p-3
              flex flex-col
              justify-between
              rounded-lg
              hover:bg-gray-50
            "
          >
            <div class="flex md:h-full lg:flex-col">
              <div class="flex-shrink-0">
                <span
                  class="
                    inline-flex
                    items-center
                    justify-center
                    h-10
                    w-10
                    rounded-md
                    bg-indigo-500
                    text-white
                    sm:h-12 sm:w-12
                  "
                >
                  <IconCursorClick class="size-2xl" />
                </span>
              </div>
              <div
                class="
                  ml-4
                  md:flex-1 md:flex md:flex-col md:justify-between
                  lg:ml-0 lg:mt-4
                "
              >
                <div>
                  <p class="text-base font-medium text-gray-900">Engagement</p>
                  <p class="mt-1 text-sm text-gray-500">
                    Speak directly to your customers in a more meaningful way.
                  </p>
                </div>
                <p class="mt-2 text-sm font-medium text-indigo-600 lg:mt-4">
                  Learn more <span aria-hidden="true">&rarr;</span>
                </p>
              </div>
            </div>
          </a>

          <a
            href="#"
            class="
              -m-3
              p-3
              flex flex-col
              justify-between
              rounded-lg
              hover:bg-gray-50
            "
          >
            <div class="flex md:h-full lg:flex-col">
              <div class="flex-shrink-0">
                <span
                  class="
                    inline-flex
                    items-center
                    justify-center
                    h-10
                    w-10
                    rounded-md
                    bg-indigo-500
                    text-white
                    sm:h-12 sm:w-12
                  "
                >
                  <IconShieldCheck class="size-2xl" />
                </span>
              </div>
              <div
                class="
                  ml-4
                  md:flex-1 md:flex md:flex-col md:justify-between
                  lg:ml-0 lg:mt-4
                "
              >
                <div>
                  <p class="text-base font-medium text-gray-900">Security</p>
                  <p class="mt-1 text-sm text-gray-500">
                    Your customers&#039; data will be safe and secure.
                  </p>
                </div>
                <p class="mt-2 text-sm font-medium text-indigo-600 lg:mt-4">
                  Learn more <span aria-hidden="true">&rarr;</span>
                </p>
              </div>
            </div>
          </a>

          <a
            href="#"
            class="
              -m-3
              p-3
              flex flex-col
              justify-between
              rounded-lg
              hover:bg-gray-50
            "
          >
            <div class="flex md:h-full lg:flex-col">
              <div class="flex-shrink-0">
                <span
                  class="
                    inline-flex
                    items-center
                    justify-center
                    h-10
                    w-10
                    rounded-md
                    bg-indigo-500
                    text-white
                    sm:h-12 sm:w-12
                  "
                >
                  <IconViewGrid class="size-2xl" />
                </span>
              </div>
              <div
                class="
                  ml-4
                  md:flex-1 md:flex md:flex-col md:justify-between
                  lg:ml-0 lg:mt-4
                "
              >
                <div>
                  <p class="text-base font-medium text-gray-900">
                    Integrations
                  </p>
                  <p class="mt-1 text-sm text-gray-500">
                    Connect with third-party tools that you&#039;re already
                    using.
                  </p>
                </div>
                <p class="mt-2 text-sm font-medium text-indigo-600 lg:mt-4">
                  Learn more <span aria-hidden="true">&rarr;</span>
                </p>
              </div>
            </div>
          </a>
        </div>
        <div class="bg-gray-50">
          <div
            class="
              max-w-7xl
              mx-auto
              space-y-6
              px-4
              py-5
              sm:flex sm:space-y-0 sm:space-x-10 sm:px-6
              lg:px-8
            "
          >
            <div class="flow-root">
              <a
                href="#"
                class="
                  -m-3
                  p-3
                  flex
                  items-center
                  rounded-md
                  text-base
                  font-medium
                  text-gray-900
                  hover:bg-gray-100
                "
              >
                <IconPlay class="flex-shrink-0 h-6 w-6 text-gray-400" />
                <span class="ml-3">Watch Demo</span>
              </a>
            </div>

            <div class="flow-root">
              <a
                href="#"
                class="
                  -m-3
                  p-3
                  flex
                  items-center
                  rounded-md
                  text-base
                  font-medium
                  text-gray-900
                  hover:bg-gray-100
                "
              >
                <IconCheckCircle class="flex-shrink-0 h-6 w-6 text-gray-400" />
                <span class="ml-3">View All Products</span>
              </a>
            </div>

            <div class="flow-root">
              <a
                href="#"
                class="
                  -m-3
                  p-3
                  flex
                  items-center
                  rounded-md
                  text-base
                  font-medium
                  text-gray-900
                  hover:bg-gray-100
                "
              >
                <IconPhone class="flex-shrink-0 h-6 w-6 text-gray-400" />
                <span class="ml-3">Contact Sales</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShowFully: false,
    };
  },
};
</script>
