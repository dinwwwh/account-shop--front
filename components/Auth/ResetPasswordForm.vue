<template>
  <div class="space-y-4">
    <!-- Email -->
    <InputBaseValidatable
      v-model="authInfos.email"
      type="email"
      name="email"
      placeholder="example@mail.com"
      :rules="{
        required: $rules.required,
        email: $rules.email,
      }"
      @emit-validator="validators[0] = $event"
    >
      <template #label> Email </template>
    </InputBaseValidatable>

    <!-- Password -->
    <InputBaseValidatable
      v-model="authInfos.password"
      type="password"
      name="mật khẩu"
      placeholder="*****"
      :rules="{
        required: $rules.required,
      }"
      @emit-validator="validators[1] = $event"
    >
      <template #label> Mật khẩu mới </template>
    </InputBaseValidatable>

    <!-- Password confirm -->
    <InputBaseValidatable
      v-model="authInfos.passwordConfirmation"
      type="password"
      name="mật khẩu xác nhận"
      placeholder="*****"
      :rules="{
        required: $rules.required,
        equal: $rules.equal(authInfos.password),
      }"
      @emit-validator="validators[2] = $event"
    >
      <template #label> Xác nhận mật khẩu </template>
    </InputBaseValidatable>
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
      type: Object,
      default() {
        const val = {};
        this.$emit('change', val);
        return val;
      },
    },
  },
  data() {
    return {
      validators: [],
    };
  },
  computed: {
    authInfos: {
      get() {
        return this.model;
      },
      set(val) {
        this.$emit('change', val);
      },
    },
    panel() {
      const panel = {
        validators: this.validators,
        check() {
          this.validators.forEach((validator) => validator.vuelidate.$touch());
          for (const validator of this.validators) {
            if (!(validator.check() === true)) {
              return validator.check();
            }
          }

          return true;
        },
      };

      this.$emit('emit-panel', panel);
      return panel;
    },
  },
  created() {
    return this.panel;
  },
};
</script>
