<template>
  <div>
    <!-- Account Infos -->
    <GroupSeparated>
      <div class="space-y-6">
        <HeadingBase4> Thông tin tài khoản </HeadingBase4>

        <InputBase
          v-model="accountInfos.name"
          class="sm:w-4/5 md:w-3/5"
          placeholder="Lê Định, ..."
        >
          <template #label> Tên hiển thị </template>
          <template #description>
            Sử dụng để hiện khi chát, giao dịch, ...
          </template>
        </InputBase>

        <InputBaseAvatar v-model="accountInfos.rawRepresentativeImage">
          <template #label> Ảnh đại diện </template>
        </InputBaseAvatar>
      </div>
      <template #bottom>
        <div class="flex justify-end items-center gap-2">
          <MessageSimple :message="accountInfos.message" />
          <ButtonPrimary
            theme="gray"
            :loading="accountInfos.loading"
            @click="updateAccountInfos"
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
      accountInfos: {
        name: this.$store.state.auth.profile?.name,
        message: {
          error: undefined,
          success: undefined,
          warning: undefined,
        },
        loading: false,
      },
    };
  },
  computed: {
    profile() {
      return this.$axios.state.auth.profile ?? {};
    },
  },
  validations() {
    return {
      accountInfos: {
        name: {},
      },
    };
  },
  methods: {
    updateAccountInfos() {
      this.accountInfos.message.warning = 'Chức năng đang hoàn thiện';
    },
  },
};
</script>
