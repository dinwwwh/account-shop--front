<template>
  <FrameBox>
    <AccountActionForm
      v-model="accountAction"
      :can-edit="canUpdateAccountAction"
    >
      <template #actions>
        <div class="flex flex-row-reverse gap-4 items-center">
          <ButtonPrimary v-if="canUpdateAccountAction" @click="update">
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
    </AccountActionForm>
  </FrameBox>
</template>

<script>
export default {
  layout: 'admin',
  async asyncData({ $axios, $auth, params }) {
    const [{ data: accountAction }, canUpdateAccountAction] = await Promise.all(
      [
        $axios.$get(`account-action/${params.id}`, {
          params: { _requiredModelRelationships: ['rule'] },
        }),
        $auth.can('update', `AccountAction:${params.id}`),
      ]
    );
    return {
      accountAction,
      canUpdateAccountAction,
      message: {
        success: undefined,
        error: undefined,
      },
    };
  },
  methods: {
    update() {
      this.$axios
        .$put(`account-action/${this.$route.params.id}`, this.accountAction)
        .then(({ data }) => {
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
