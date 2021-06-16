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
            <InputBase
              v-model="modelAccountType.name"
              placeholder="Đăng ký ảo..."
            >
              <template #label> Tên </template>
              <template #description> This is a description </template>
            </InputBase>
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

        <!-- Roles can used -->
        <HeadingBase3 class="mt-4">
          Nhưng role được phép sử dụng kiểu tài khoản này
        </HeadingBase3>
        <table class="table-auto min-w-full">
          <tr>
            <td class="font-bold text-gray-500">Role</td>
            <td class="font-bold text-gray-500">Mã</td>
            <td class="font-bold text-gray-500">Hành động</td>
          </tr>
          <tr
            v-for="(role, i) in modelAccountType.rolesCanUsedAccountType"
            :key="role.key"
            class="min-w-full"
          >
            <td>{{ getRoleNameByKey(role.key) }}</td>
            <td>{{ role.statusCode }}</td>
            <td>
              <ButtonPrimary size="xs" theme="red" @click="removeUsedRole(i)"
                >Xoá</ButtonPrimary
              >
            </td>
          </tr>
        </table>

        <!-- Add role can used -->
        <div class="flex gap-4 items-end">
          <!-- Role -->
          <SelectBase
            v-model="newUsedRole.key"
            :options="unselectedRoles"
            :display-key="'name'"
            :value-key="'key'"
          >
            <template #label> Vai trò </template>
          </SelectBase>
          <!-- Code -->
          <SelectBase
            v-model="newUsedRole.statusCode"
            :options="statusCodes"
            :display-key="'description'"
            :value-key="'statusCode'"
          >
            <template #label> Mã </template>
          </SelectBase>
          <div class="pb-2">
            <ButtonPrimary size="sm" @click="addNewUsedRole">
              Thêm
            </ButtonPrimary>
          </div>
        </div>

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
      plainRoles: [],
      newUsedRole: {},
      statusCodes: [
        {
          statusCode: 0,
          description: '0: Bình thường, đăng nick phải duyệt.',
        },
        {
          statusCode: 440,
          description: '440: Đăng nick không cần duyệt.',
        },
      ],
    };
  },
  async fetch() {
    this.plainRoles = (await this.$axios.$get('role')).data;
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

    unselectedRoles: {
      cache: false,
      get() {
        const selectedRoles = this.accountType.rolesCanUsedAccountType;
        if (!selectedRoles) return this.plainRoles;
        return this.plainRoles.filter(
          (plainRole) =>
            !selectedRoles.find(
              (selectedRole) => selectedRole.key === plainRole.key
            )
        );
      },
    },
  },
  methods: {
    getRoleNameByKey(key) {
      return this.plainRoles.find((role) => role.key === key)?.name;
    },
    addNewUsedRole() {
      const newUsedRole = { ...this.newUsedRole };
      this.newUsedRole = {};

      if (!this.modelAccountType.rolesCanUsedAccountType) {
        this.modelAccountType.rolesCanUsedAccountType = [];
      }
      this.modelAccountType.rolesCanUsedAccountType.push(newUsedRole);
    },
    removeUsedRole(index) {
      this.modelAccountType.rolesCanUsedAccountType.splice(index);
      this.modelAccountType = { ...this.modelAccountType };
    },
  },
};
</script>
