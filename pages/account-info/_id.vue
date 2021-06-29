<template>
  <FrameBox>
    <AccountInfoForm v-model="accountInfo" :can-edit="canUpdateAccountInfo">
      <template #actions>
        <div class="flex flex-row-reverse gap-4 items-center">
          <ButtonPrimary v-if="canUpdateAccountInfo" @click="update">
            Cập nhật
          </ButtonPrimary>
          <p
            class="text-sm"
            :class="{
              'text-green-500': !message.error,
              'text-red-500': message.error,
            }"
          >
            {{ message.error || message.success }}
          </p>
        </div>
      </template>
    </AccountInfoForm>
  </FrameBox>
</template>

<script>
export default {
  layout: 'admin',
  async asyncData({ $axios, $auth, params }) {
    const [{ data: accountInfo }, canUpdateAccountInfo] = await Promise.all([
      $axios.$get(`account-info/${params.id}`, { params: { _with: ['rule'] } }),
      $auth.can('update', `AccountInfo:${params.id}`),
    ]);
    return {
      accountInfo,
      canUpdateAccountInfo,
      message: {
        success: undefined,
        error: undefined,
      },
    };
  },
  methods: {
    update() {
      this.$axios
        .$put(`account-info/${this.$route.params.id}`, this.accountInfo)
        .then(({ data }) => {
          this.accountInfo = data;
          this.message.error = null;
          this.message.success = 'Thành công!!';
        })
        .catch(() => {
          this.message.error = 'Thất bại :((';
          this.message.success = null;
        });
    },
  },
};
</script>
