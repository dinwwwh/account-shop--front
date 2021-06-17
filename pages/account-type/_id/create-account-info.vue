<template>
  <FrameBox>
    <AccountInfoForm v-model="accountInfo">
      <template #actions>
        <div class="flex flex-row-reverse gap-4 items-center">
          <ButtonPrimary @click="create"> Thêm </ButtonPrimary>
          <NuxtLink
            v-if="createdAccountInfo"
            :to="{
              name: 'account-info-id',
              params: { id: createdAccountInfo.id },
            }"
          >
            <ButtonPrimary> Truy cập </ButtonPrimary>
          </NuxtLink>
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
  data() {
    return {
      accountInfo: { rule: {} },
      createdAccountInfo: undefined,
      message: {
        success: undefined,
        error: undefined,
      },
    };
  },
  methods: {
    create() {
      this.$axios
        .$post(`account-info/${this.$route.params.id}`, this.accountInfo)
        .then(({ data }) => {
          this.createdAccountInfo = data;
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
