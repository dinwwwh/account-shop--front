<template>
  <div class="relative h-screen w-screen overflow-x-hidden overflow-y-auto">
    <div class="relative bg-white">
      <div
        class="absolute inset-0 shadow z-30 pointer-events-none"
        aria-hidden="true"
      ></div>
      <div class="relative z-20">
        <div
          class="
            max-w-7xl
            mx-auto
            flex
            justify-between
            items-center
            px-4
            py-5
            sm:px-6 sm:py-4
            lg:px-8
            md:justify-start md:space-x-10
          "
        >
          <!-- Logo -->
          <div>
            <a href="#s" class="flex">
              <span class="sr-only">Workflow</span>
              <img
                class="h-8 w-auto sm:h-10"
                src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                alt=""
              />
            </a>
          </div>
          <!-- Open mobile menu -->
          <div class="-mr-2 -my-2 md:hidden">
            <button
              type="button"
              class="
                bg-white
                rounded-md
                p-2
                inline-flex
                items-center
                justify-center
                text-gray-400
                hover:text-gray-500 hover:bg-gray-100
                focus:outline-none
                focus:ring-2
                focus:ring-inset
                focus:ring-indigo-500
              "
              aria-expanded="false"
              @click="isShowMobileMenu = true"
            >
              <span class="sr-only">Open menu</span>
              <IconMenu class="size-2xl" />
            </button>
          </div>
          <!-- Menu of laptop  -->
          <div
            class="hidden md:flex-1 md:flex md:items-center md:justify-between"
          >
            <nav class="flex space-x-10">
              <LayoutDefaultExampleMenuItemDropDown />
              <a
                href="#"
                class="text-base font-medium text-gray-500 hover:text-gray-900"
              >
                Pricing
              </a>
              <a
                href="#"
                class="text-base font-medium text-gray-500 hover:text-gray-900"
              >
                Docs
              </a>
            </nav>

            <!-- Section 2: Login - Register -->
            <div class="flex items-center md:ml-12">
              <a
                href="#"
                class="text-base font-medium text-gray-500 hover:text-gray-900"
              >
                Sign in
              </a>
              <a
                href="#"
                class="
                  ml-8
                  inline-flex
                  items-center
                  justify-center
                  px-4
                  py-2
                  border border-transparent
                  rounded-md
                  shadow-sm
                  text-base
                  font-medium
                  text-white
                  bg-indigo-600
                  hover:bg-indigo-700
                "
              >
                Sign up
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Mobile menu determine show/hidden by isShowMobileMenu property -->
      <transition
        enter-active-class="duration-200 ease-out"
        enter-class="opacity-0 scale-95"
        enter-to-class="opacity-100 scale-100"
        leave-active-class="duration-100 ease-in"
        leave-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-95"
      >
        <div
          v-show="isShowMobileMenu"
          class="
            absolute
            z-30
            top-0
            inset-x-0
            p-2
            transition
            transform
            origin-top-right
            md:hidden
          "
        >
          <div
            class="
              rounded-lg
              shadow-lg
              ring-1 ring-black ring-opacity-5
              bg-white
              divide-y-2 divide-gray-50
            "
          >
            <!-- Header -->
            <div class="pt-5 pb-6 px-5 sm:pb-8">
              <div class="flex items-center justify-between">
                <!-- Logo in mobile menu -->
                <div>
                  <img
                    class="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                    alt="Workflow"
                  />
                </div>
                <!-- Hide mobile menu -->
                <div class="-mr-2">
                  <button
                    type="button"
                    class="
                      bg-white
                      rounded-md
                      p-2
                      inline-flex
                      items-center
                      justify-center
                      text-gray-400
                      hover:text-gray-500 hover:bg-gray-100
                      focus:outline-none
                      focus:ring-2
                      focus:ring-inset
                      focus:ring-indigo-500
                    "
                    @click="isShowMobileMenu = false"
                  >
                    <span class="sr-only">Close menu</span>
                    <IconX class="size-2xl" />
                  </button>
                </div>
              </div>
              <div class="mt-6 sm:mt-8">
                <nav>
                  <div class="grid gap-7 sm:grid-cols-2 sm:gap-y-8 sm:gap-x-4">
                    <a
                      href="#"
                      class="
                        -m-3
                        flex
                        items-center
                        p-3
                        rounded-lg
                        hover:bg-gray-50
                      "
                    >
                      <div
                        class="
                          flex-shrink-0 flex
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
                      </div>
                      <div class="ml-4 text-base font-medium text-gray-900">
                        Analytics
                      </div>
                    </a>

                    <a
                      href="#"
                      class="
                        -m-3
                        flex
                        items-center
                        p-3
                        rounded-lg
                        hover:bg-gray-50
                      "
                    >
                      <div
                        class="
                          flex-shrink-0 flex
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
                      </div>
                      <div class="ml-4 text-base font-medium text-gray-900">
                        Engagement
                      </div>
                    </a>

                    <a
                      href="#"
                      class="
                        -m-3
                        flex
                        items-center
                        p-3
                        rounded-lg
                        hover:bg-gray-50
                      "
                    >
                      <div
                        class="
                          flex-shrink-0 flex
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
                      </div>
                      <div class="ml-4 text-base font-medium text-gray-900">
                        Security
                      </div>
                    </a>

                    <a
                      href="#"
                      class="
                        -m-3
                        flex
                        items-center
                        p-3
                        rounded-lg
                        hover:bg-gray-50
                      "
                    >
                      <div
                        class="
                          flex-shrink-0 flex
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
                      </div>
                      <div class="ml-4 text-base font-medium text-gray-900">
                        Integrations
                      </div>
                    </a>
                  </div>
                  <div class="mt-8 text-base">
                    <a
                      href="#"
                      class="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      View all products
                      <span aria-hidden="true">&rarr;</span></a
                    >
                  </div>
                </nav>
              </div>
            </div>
            <!-- Main menu -->
            <div class="py-6 px-5">
              <div class="grid grid-cols-2 gap-4">
                <a
                  href="#"
                  class="
                    rounded-md
                    text-base
                    font-medium
                    text-gray-900
                    hover:text-gray-700
                  "
                >
                  Pricing
                </a>

                <a
                  href="#"
                  class="
                    rounded-md
                    text-base
                    font-medium
                    text-gray-900
                    hover:text-gray-700
                  "
                >
                  Docs
                </a>

                <a
                  href="#"
                  class="
                    rounded-md
                    text-base
                    font-medium
                    text-gray-900
                    hover:text-gray-700
                  "
                >
                  Company
                </a>

                <a
                  href="#"
                  class="
                    rounded-md
                    text-base
                    font-medium
                    text-gray-900
                    hover:text-gray-700
                  "
                >
                  Resources
                </a>

                <a
                  href="#"
                  class="
                    rounded-md
                    text-base
                    font-medium
                    text-gray-900
                    hover:text-gray-700
                  "
                >
                  Blog
                </a>

                <a
                  href="#"
                  class="
                    rounded-md
                    text-base
                    font-medium
                    text-gray-900
                    hover:text-gray-700
                  "
                >
                  Contact Sales
                </a>
              </div>
              <div class="mt-6">
                <a
                  href="#"
                  class="
                    w-full
                    flex
                    items-center
                    justify-center
                    px-4
                    py-2
                    border border-transparent
                    rounded-md
                    shadow-sm
                    text-base
                    font-medium
                    text-white
                    bg-indigo-600
                    hover:bg-indigo-700
                  "
                >
                  Sign up
                </a>
                <p class="mt-6 text-center text-base font-medium text-gray-500">
                  Existing customer?
                  <a href="#" class="text-indigo-600 hover:text-indigo-500">
                    Sign in
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
    <main class="bg-gray-50">
      <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <Nuxt />
      </div>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShowMobileMenu: false,
    };
  },
};
</script>
