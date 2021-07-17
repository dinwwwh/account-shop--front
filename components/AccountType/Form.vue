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
              :can-edit="canEdit"
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
          :can-edit="canEdit"
          placeholder="Không thể lấy lại mật khẩu nếu bạn quên nó ..."
        >
          <template #label> Mô tả kiểu tài khoản </template>
          <template #description> Hãy nghi những gì bạn thích. </template>
        </TextareaBase>

        <!-- Usable Users -->
        <HeadingBase3 class="mt-4">
          Users được phép sử dụng kiểu tài khoản này
        </HeadingBase3>
        <table class="table-auto min-w-full">
          <tr>
            <td class="font-bold text-gray-500">ID</td>
            <td class="font-bold text-gray-500">Mã</td>
            <td class="font-bold text-gray-500">Hành động</td>
          </tr>
          <tr
            v-for="user in modelAccountType.usableUsers"
            :key="user.id"
            class="min-w-full"
          >
            <td>{{ user.id }}</td>
            <td>{{ user.statusCode }}</td>
            <td>
              <ButtonPrimary
                size="xs"
                theme="red"
                @click="removeUsableUser(user)"
              >
                Xoá
              </ButtonPrimary>
            </td>
          </tr>
        </table>

        <!-- Add usable users -->
        <div class="flex gap-4 items-end">
          <!-- user -->
          <InputBase v-model="newUsableUser.id" placeholder="ID user">
            <template #label> ID người dùng </template>
          </InputBase>
          <!-- Code -->
          <SelectBase
            v-model="newUsableUser.statusCode"
            :options="statusCodesForUse"
            :display-key="'description'"
            :value-key="'statusCode'"
          >
            <template #label> Mã </template>
          </SelectBase>
          <div class="pb-2">
            <ButtonPrimary size="sm" @click="addUsableUser">
              Thêm
            </ButtonPrimary>
          </div>
        </div>

        <!-- approvable Users -->
        <HeadingBase3 class="mt-4">
          Users được phép phê duyệt nick được tạo từ kiểu tài khoản này
        </HeadingBase3>
        <table class="table-auto min-w-full">
          <tr>
            <td class="font-bold text-gray-500">ID</td>
            <td class="font-bold text-gray-500">Mã</td>
            <td class="font-bold text-gray-500">Hành động</td>
          </tr>
          <tr
            v-for="user in modelAccountType.approvableUsers"
            :key="user.id"
            class="min-w-full"
          >
            <td>{{ user.id }}</td>
            <td>{{ user.statusCode }}</td>
            <td>
              <ButtonPrimary
                size="xs"
                theme="red"
                @click="removeApprovableUser(user)"
              >
                Xoá
              </ButtonPrimary>
            </td>
          </tr>
        </table>

        <!-- Add approvable users -->
        <div class="flex gap-4 items-end">
          <!-- user -->
          <InputBase v-model="newApprovableUser.id" placeholder="ID user">
            <template #label> ID người dùng </template>
          </InputBase>
          <!-- Code -->
          <SelectBase
            v-model="newApprovableUser.statusCode"
            :options="statusCodesForApproval"
            :display-key="'description'"
            :value-key="'statusCode'"
          >
            <template #label> Mã </template>
            <template #description>
              Mã nick sau khi phê duyệt thành công
            </template>
          </SelectBase>
          <div class="pb-2">
            <ButtonPrimary size="sm" @click="addApprovableUser">
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
    canEdit: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      newUsableUser: {},
      newApprovableUser: {},
      statusCodesForUse: [
        {
          statusCode: 0,
          description: '0: Bình thường, đăng nick phải duyệt.',
        },
        {
          statusCode: 440,
          description: '440: Đăng nick không cần duyệt.',
        },
      ],
      statusCodesForApproval: [
        {
          statusCode: 480,
          description: '480: không ai coi được tt trừ adm.',
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
  methods: {
    addUsableUser() {
      const newUsableUser = { ...this.newUsableUser };
      this.newUsableUser = {};

      if (!this.modelAccountType.usableUsers) {
        this.modelAccountType.usableUsers = [];
      }

      if (
        !this.modelAccountType.usableUsers.find(
          (user) => user.id === newUsableUser.id
        )
      ) {
        this.modelAccountType.usableUsers.push(newUsableUser);
      }
    },
    removeUsableUser(user) {
      this.modelAccountType.usableUsers =
        this.modelAccountType.usableUsers.filter(({ id }) => id !== user.id);
    },
    addApprovableUser() {
      const newApprovableUser = { ...this.newApprovableUser };
      this.newApprovableUser = {};

      if (!this.modelAccountType.approvableUsers) {
        this.modelAccountType.approvableUsers = [];
      }

      if (
        !this.modelAccountType.approvableUsers.find(
          (user) => user.id === newApprovableUser.id
        )
      ) {
        this.modelAccountType.approvableUsers.push(newApprovableUser);
      }
    },
    removeApprovableUser(user) {
      this.modelAccountType.approvableUsers =
        this.modelAccountType.approvableUsers.filter(
          ({ id }) => id !== user.id
        );
    },
  },
};
</script>
