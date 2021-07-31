<template>
  <div class="bg-gray-50 flex flex-col justify-center py-6 sm:px-6 lg:px-8">
    <!-- Logo -->
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Đăng ký
      </h2>
      <p class="mt-2 text-center text-sm text-gray-600">
        Hoặc
        <NuxtLink
          :to="{ name: 'login' }"
          class="font-medium text-indigo-600 hover:text-indigo-500"
        >
          đăng nhập
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
      <AuthRegisterForm
        v-model="authInfos"
        @emit-panel="registerFormPanel = $event"
      />

      <!-- actions -->
      <div class="space-y-4">
        <MessageBase :message="message" />
        <ButtonPrimary :loading="loading" @click="register">
          Đăng ký
        </ButtonPrimary>
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
      registerFormPanel: undefined,
      message: {
        error: undefined,
        warn: undefined,
        success: undefined,
      },
      loading: false,
    };
  },
  methods: {
    register() {
      this.message.error = null;
      this.message.warn = null;
      this.message.success = null;

      if (!this.registerFormPanel.check()) {
        return;
      }

      this.loading = true;
      this.$axios
        .$post('register', {
          name: this.authInfos.name,
          email: this.authInfos.email,
          password: this.authInfos.password,
        })
        .then(() => {
          this.message.success = 'Bạn có thể đăng nhập ngay.';
        })
        .catch(() => {
          this.message.error = 'Thất bại vui lòng thử lại sau.';
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>
