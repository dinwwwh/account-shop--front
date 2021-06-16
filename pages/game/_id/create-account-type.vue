<template>
  <FrameBox>
    <AccountTypeForm v-model="accountType">
      <template #actions>
        <div class="flex flex-row-reverse gap-4 items-center">
          <ButtonPrimary @click="create"> Tạo </ButtonPrimary>
          <NuxtLink
            v-if="createdAccountType"
            :to="{
              name: 'account-type-id',
              params: { id: createdAccountType.id },
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
    </AccountTypeForm>
  </FrameBox>
</template>

<script>
export default {
  layout: 'admin',
  async middleware({ $auth, error, params }) {
    if (!(await $auth.can('create', `AccountType,Game:${params.id}`))) {
      return error(403);
    }
  },
  data() {
    return {
      accountType: {},
      message: {
        error: undefined,
        success: undefined,
      },
      createdAccountType: undefined,
    };
  },
  methods: {
    create() {
      this.$axios
        .$post(`account-type/${this.$route.params.id}`, this.accountType)
        .then((data) => {
          this.message.error = null;
          this.message.success = 'Thành công!!';
          this.createdAccountType = data;
        })
        .catch(() => {
          this.message.error = 'Thất bại :((';
          this.message.success = null;
        });
    },
  },
};
</script>
