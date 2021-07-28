<template>
  <div
    class="
      min-h-screen
      bg-gray-50
      flex flex-col
      justify-center
      py-12
      sm:px-6
      lg:px-8
    "
  >
    <!-- Logo -->
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <img
        class="mx-auto h-12 w-auto"
        src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
        alt="Workflow"
      />
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Khôi phục mật khẩu
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
      <AuthResetPasswordForm
        v-model="authInfos"
        @emit-panel="formPanel = $event"
      />

      <!-- actions -->
      <div class="space-y-4">
        <MessageBase :message="message" />
        <ButtonPrimary :loading="loading" @click="reset">
          Xác nhận
        </ButtonPrimary>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      authInfos: {},
      formPanel: undefined,
      loading: false,
      message: {
        error: undefined,
        warn: undefined,
        success: undefined,
      },
    };
  },
  methods: {
    async reset() {
      this.message.error = null;
      this.message.warn = null;
      this.message.success = null;

      if (!this.formPanel.check()) {
        return;
      }

      try {
        this.loading = true;
        await this.$axios.$post('reset-password', {
          email: this.authInfos.email,
          token: this.$route.query.token,
          password: this.authInfos.password,
          password_confirmation: this.authInfos.passwordConfirmation,
        });

        this.message.success = 'Bạn có thể đăng nhập ngay.';
      } catch (e) {
        this.message.error = 'Thất bại, vui lòng thử lại sau.';
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
