<template>
  <FrameBox>
    <AccountActionForm v-model="accountAction">
      <template #actions>
        <div class="flex flex-row-reverse items-center gap-4">
          <ButtonPrimary @click="create"> Thêm </ButtonPrimary>
          <NuxtLink
            v-if="createdAccountAction"
            :to="{
              name: 'account-action-id',
              params: { id: createdAccountAction.id },
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
    </AccountActionForm>
  </FrameBox>
</template>

<script>
export default {
  layout: 'admin',
  async middleware({ $auth, params, error }) {
    if (!(await $auth.can('create', `AccountAction,AccountType:${params.id}`)))
      return error(403);
  },
  data() {
    return {
      accountAction: {},
      createdAccountAction: undefined,
      message: {
        error: undefined,
        success: undefined,
      },
    };
  },
  methods: {
    create() {
      this.$axios
        .$post(`account-action/${this.$route.params.id}`, this.accountAction)
        .then(({ data }) => {
          this.createdAccountAction = data;
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
