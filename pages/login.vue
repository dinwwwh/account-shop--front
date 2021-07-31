<template>
  <div class="bg-gray-50 flex flex-col justify-center py-6 sm:px-6 lg:px-8">
    <!-- Title -->
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 class="text-center text-3xl font-extrabold text-gray-900">
        Đăng nhập
      </h2>
      <p class="mt-2 text-center text-sm text-gray-600">
        Hoặc
        <NuxtLink
          :to="{ name: 'register' }"
          class="font-medium text-indigo-600 hover:text-indigo-500"
        >
          đăng ký miễn phí
        </NuxtLink>
      </p>
    </div>

    <!-- Form -->
    <div
      class="
        bg-white
        py-8
        px-4
        shadow
        sm:rounded-lg sm:px-10
        mt-8
        sm:mx-auto sm:w-full sm:max-w-md
        space-y-6
      "
    >
      <AuthLoginForm
        v-model="authInfos"
        @emit-panel="loginFormPanel = $event"
      />

      <!-- actions -->
      <div class="space-y-4">
        <MessageBase :message="message" />
        <ButtonPrimary @click="login"> Đăng nhập </ButtonPrimary>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'guest',
  data() {
    return {
      authInfos: {},
      loginFormPanel: undefined,
      message: {
        error: undefined,
        warn: undefined,
        success: undefined,
      },
    };
  },
  methods: {
    login() {
      this.message.error = null;
      this.message.warn = null;
      this.message.success = null;

      if (!this.loginFormPanel.check()) {
        return;
      }

      this.$auth
        .login(
          this.authInfos.email,
          this.authInfos.password,
          this.authInfos.remember
        )
        .then(() => {
          if (this.$router.history._startLocation !== this.$route.path) {
            this.$router.back();
          } else {
            this.$router.push({ name: 'index' });
          }
        })
        .catch(() => {
          this.message.error = 'Thông tin không chính xác.';
        });
    },
  },
};
</script>
