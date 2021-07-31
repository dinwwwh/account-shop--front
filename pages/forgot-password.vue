<template>
  <div class="bg-gray-50 flex flex-col justify-center py-8 sm:px-6 lg:px-8">
    <!-- Logo -->
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Quên mật khẩu
      </h2>
      <p class="mt-2 text-center text-sm text-gray-600">
        Hoặc
        <NuxtLink
          :to="{ name: 'login' }"
          class="font-medium text-indigo-600 hover:text-indigo-500"
        >
          Đăng nhập
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
      <InputBaseValidatable
        v-model="email"
        :rules="{
          required: $rules.required,
          email: $rules.email,
        }"
        placeholder="example@mail.com"
        @emit-validator="validator = $event"
      >
        <template #label> Email </template>
      </InputBaseValidatable>

      <!-- actions -->
      <div class="space-y-4">
        <MessageBase :message="message" />
        <ButtonPrimary :loading="loading" @click="forgotPassword">
          Quên mật khẩu
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
      email: undefined,
      validator: undefined,
      loading: false,
      message: {
        error: undefined,
        warn: undefined,
        success: undefined,
      },
    };
  },
  methods: {
    forgotPassword() {
      this.message.error = null;
      this.message.warn = null;
      this.message.success = null;

      if (!this.validator.check()) {
        return;
      }

      this.loading = true;
      this.$axios
        .$post('forgot-password', {
          email: this.email,
        })
        .then(() => {
          this.message.success = 'Vui lòng kiểm tra email';
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
