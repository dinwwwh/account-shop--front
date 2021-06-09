<template>
  <div class="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
    <div class="md:grid md:grid-cols-3 md:gap-6">
      <div class="md:col-span-1">
        <!-- Title -->
        <h3 class="text-lg font-medium leading-6 text-gray-900">
          <slot name="title">Thông tin kiểu tài khoản</slot>
        </h3>
        <!-- Description -->
        <p class="mt-1 text-sm text-gray-500">
          <slot name="description">...</slot>
        </p>
      </div>
      <div class="mt-5 md:mt-0 md:col-span-2 space-y-6">
        <!-- Name -->
        <div class="grid grid-cols-3 gap-6">
          <div class="col-span-3 sm:col-span-2">
            <InputPlain
              v-model="modelAccountType.name"
              placeholder="Đăng ký ảo..."
            >
              <template #label> Tên </template>
              <template #description> This is a description </template>
            </InputPlain>
          </div>
        </div>

        <!-- roles that can used -->
        <div class="grid grid-cols-3 gap-6">
          <div class="col-span-3 sm:col-span-2">
            <InputPlain
              v-model="modelAccountType.name"
              placeholder="Đăng ký ảo..."
            >
              <template #label> Tên </template>
              <template #description> This is a description </template>
            </InputPlain>
          </div>
        </div>

        <!-- Description -->
        <TextareaBase
          v-model="modelAccountType.description"
          placeholder="Không thể lấy lại mật khẩu nếu bạn quên nó ..."
        >
          <template #label> Mô tả kiểu tài khoản </template>
          <template #description> Hãy nghi những gì bạn thích. </template>
        </TextareaBase>

        <!-- Roles that can used -->
        <SelectModernMultiple
          v-model="modelAccountType.requiredRoleKeys"
          :options="roles"
          display-key="name"
        >
          <template #label> Mô tả kiểu tài khoản </template>
          <template #description> Hãy nghi những gì bạn thích. </template>
        </SelectModernMultiple>

        <!-- Actions -->
        <div>
          <slot name="actions"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  model: {
    prop: 'accountType',
    event: 'input',
  },
  props: {
    accountType: {
      type: Object,
      required: true,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      roles: [
        {
          id: 1,
          name: 'administrator',
        },
        {
          id: 2,
          name: 'guest',
        },
        {
          id: 3,
          name: 'tester',
        },
      ],
    };
  },
  computed: {
    modelAccountType: {
      get() {
        return this.accountType;
      },
      set(val) {
        this.$emit('input', val);
      },
    },
  },
};
</script>
