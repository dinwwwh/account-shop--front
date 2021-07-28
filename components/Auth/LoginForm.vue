<template>
  <div class="space-y-6">
    <!-- Email -->
    <InputBaseValidatable
      v-model="authInfos.email"
      type="email"
      name="email"
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
      name="password"
      :rules="{
        required: $rules.required,
      }"
      @emit-validator="validators[1] = $event"
    >
      <template #label> Mật khẩu </template>
    </InputBaseValidatable>

    <!-- Options -->
    <div class="flex items-center justify-between">
      <CheckboxBase v-model="authInfos.remember">
        <template #label> Lưu thông tin </template>
      </CheckboxBase>

      <NuxtLink
        :to="{ name: 'forgot-password' }"
        class="text-sm font-medium text-indigo-600 hover:text-indigo-500"
      >
        Quên mật khẩu?
      </NuxtLink>
    </div>
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
