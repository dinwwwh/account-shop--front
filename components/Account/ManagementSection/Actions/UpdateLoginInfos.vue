<template>
  <div class="space-y-6">
    <HeadingBase2 class="text-center">
      Cập nhật thông tin đăng nhập
    </HeadingBase2>

    <div class="space-y-1">
      <InputBase
        v-model="username"
        :error="$getValidatorErrorMessage($v.username)"
      >
        <template #label> Username </template>
        <template #description>
          {{ $getValidatorErrorMessage($v.username) }}
        </template>
      </InputBase>

      <InputBase
        v-model="password"
        type="password"
        :error="$getValidatorErrorMessage($v.password)"
      >
        <template #label> Password </template>
        <template #description>
          {{ $getValidatorErrorMessage($v.password) }}
        </template>
      </InputBase>
    </div>

    <div class="space-y-3">
      <MessageBase :message="message" />
      <ButtonPrimary theme="green" :loading="loading" @click="update">
        Cập nhật
      </ButtonPrimary>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    account: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      message: {
        error: undefined,
        success: undefined,
        warning: undefined,
      },
      loading: false,
      username: undefined,
      password: undefined,
    };
  },
  validations() {
    const validators = this.$vuelidate.validators;

    return {
      username: {
        required: validators.required,
      },
      password: {
        required: validators.required,
      },
    };
  },
  created() {
    this.username = this.account.username;
    this.password = this.account.password;
  },
  methods: {
    async update() {
      this.message.warning = null;
      this.message.success = null;
      this.message.error = null;

      this.$v.$touch();
      if (this.$v.$pending) {
        this.message.warning = 'Vui lòng đợi thêm một chút.';
        return;
      }

      if (this.$v.$invalid) {
        this.message.error = 'Vui lòng kiểm tra lại thông tin.';
        return;
      }

      this.loading = true;
      try {
        await this.$axios.$patch(`account/${this.account.id}/login-infos`, {
          username: this.username,
          password: this.password,
        });
        this.message.success = 'Cập nhật thành công.';
      } catch (e) {
        this.message.error = 'Thất bại vui lòng thử lại sau.';
      }
      this.loading = false;
    },
  },
};
</script>
