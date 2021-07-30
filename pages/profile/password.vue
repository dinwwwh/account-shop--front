<template>
  <div>
    <GroupSeparated>
      <template #default>
        <div>
          <div>
            <h2
              id="payment-details-heading"
              class="text-lg leading-6 font-medium text-gray-900"
            >
              Mật khẩu đăng nhập
            </h2>
            <p class="mt-1 text-sm text-gray-500">
              Cập nhật mật khẩu dùng để đăng nhập vào hệ thống.
            </p>
          </div>

          <div class="space-y-3 w-full sm:w-4/5 md:w-3/5">
            <InputBase
              v-model="password.old"
              type="password"
              placeholder="******"
              :error="$v.password.old.$error"
            >
              <template #label> Mật khẩu cũ </template>
              <template #description>
                {{ $getValidatorErrorMessage($v.password.old, 'mật khẩu cũ') }}
              </template>
            </InputBase>
            <InputBase
              v-model="password.new"
              type="password"
              placeholder="******"
              :error="$v.password.new.$error"
            >
              <template #label> Mật khẩu mới </template>
              <template #description>
                {{ $getValidatorErrorMessage($v.password.new, 'mật khẩu mới') }}
              </template>
            </InputBase>
            <InputBase
              v-model="password.confirmed"
              type="password"
              placeholder="******"
              :error="$v.password.confirmed.$error"
            >
              <template #label> Xác nhận mật khẩu </template>
              <template #description>
                {{
                  $getValidatorErrorMessage(
                    $v.password.confirmed,
                    'mật khẩu xác nhận'
                  )
                }}
              </template>
            </InputBase>
          </div>
        </div>
      </template>
      <template #bottom>
        <div class="flex justify-end items-center gap-4">
          <MessageSimple :message="message" />

          <ButtonPrimary
            theme="gray"
            :loading="loading"
            @click="updatePassword"
          >
            Cập nhật
          </ButtonPrimary>
        </div>
      </template>
    </GroupSeparated>
  </div>
</template>

<script>
export default {
  data() {
    return {
      password: {},
      message: {
        error: undefined,
        success: undefined,
        warning: undefined,
      },
      loading: false,
    };
  },
  validations() {
    return {
      password: {
        old: {
          required: this.$rules.required,
        },
        new: {
          required: this.$rules.required,
        },
        confirmed: {
          required: this.$rules.required,
          sameAs: this.$rules.sameAs('new'),
        },
      },
    };
  },
  methods: {
    updatePassword() {
      this.message = {
        error: undefined,
        success: undefined,
        warning: undefined,
      };
      this.$v.password.$touch();

      if (this.$v.password.$pending) {
        this.message.warning = 'Vui lòng đợi thêm';
        return;
      }

      if (this.$v.password.$invalid) {
        this.message.error = 'Vui lòng kiểm tra lại thông tin';
        return;
      }

      this.loading = true;
      this.$axios
        .$patch('password', {
          newPassword: this.password.new,
          _confirmedPassword: this.password.old,
        })
        .then(() => {
          this.message.success = 'Cập nhật thành công';
        })
        .catch(({ response: { status } }) => {
          if (status === 423)
            this.message.error = 'Mật khẩu xác nhận không chính xác';
          else this.message.error = 'Thất bại, vui lòng thử lại sau';
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>
