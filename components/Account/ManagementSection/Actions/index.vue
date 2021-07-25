<template>
  <div class="flex flex-wrap gap-3">
    <ButtonPrimary
      v-if="canUpdateLoginInfos"
      theme="gray"
      @click="currentAction = 'UPDATE-LOGIN-INFOS'"
    >
      <IconPencilAlt class="size-xl mr-2" /> Thông tin đăng nhập
    </ButtonPrimary>

    <ButtonPrimary
      v-if="canUpdateAccountInfos"
      theme="yellow"
      @click="currentAction = 'UPDATE-ACCOUNT-INFOS'"
    >
      <IconPencilAlt class="size-xl mr-2" /> Thông tin tài khoản
    </ButtonPrimary>

    <ButtonPrimary
      v-if="canUpdateGameInfos"
      theme="green"
      @click="currentAction = 'UPDATE-GAME-INFOS'"
    >
      <IconPencilAlt class="size-xl mr-2" /> Thông tin game
    </ButtonPrimary>

    <ButtonPrimary
      v-if="canUpdateImages"
      theme="pink"
      @click="currentAction = 'UPDATE-IMAGES'"
    >
      <IconPencilAlt class="size-xl mr-2" /> Hình ảnh
    </ButtonPrimary>

    <PopupFullScreen v-model="isShowPopup">
      <div class="flex justify-center max-w-[100wv] p-2">
        <div class="md:min-w-[460px]">
          <!-- Update login infos -->
          <AccountManagementSectionActionsUpdateLoginInfos
            v-if="currentAction === 'UPDATE-LOGIN-INFOS'"
            :account="account"
          />
          <!-- Update account infos -->
          <AccountManagementSectionActionsUpdateAccountInfos
            v-if="currentAction === 'UPDATE-ACCOUNT-INFOS'"
            :account="account"
          />
          <!-- Update game infos -->
          <AccountManagementSectionActionsUpdateGameInfos
            v-if="currentAction === 'UPDATE-GAME-INFOS'"
            :account="account"
          />
          <!-- Update images -->
          <AccountManagementSectionActionsUpdateImages
            v-if="currentAction === 'UPDATE-IMAGES'"
            :account="account"
          />
        </div>
      </div>
    </PopupFullScreen>
  </div>
</template>

<script>
export default {
  props: {
    account: {
      type: Object,
      required: true,
      default: () => ({}),
    },
  },
  data() {
    return {
      currentAction: undefined,
      canUpdateLoginInfos: false,
      canUpdateAccountInfos: false,
      canUpdateGameInfos: false,
      canUpdateImages: false,
    };
  },
  async fetch() {
    const [
      canUpdateLoginInfos,
      canUpdateAccountInfos,
      canUpdateGameInfos,
      canUpdateImages,
    ] = await Promise.all([
      this.$auth.can('updateLoginInfos', `Account:${this.account.id}`),
      this.$auth.can('updateAccountInfos', `Account:${this.account.id}`),
      this.$auth.can('updateGameInfos', `Account:${this.account.id}`),
      this.$auth.can('updateImages', `Account:${this.account.id}`),
    ]);

    this.canUpdateLoginInfos = canUpdateLoginInfos;
    this.canUpdateAccountInfos = canUpdateAccountInfos;
    this.canUpdateGameInfos = canUpdateGameInfos;
    this.canUpdateImages = canUpdateImages;
  },
  computed: {
    isShowPopup: {
      get() {
        return !!this.currentAction;
      },
      set(val) {
        this.currentAction = val ? this.currentAction : null;
      },
    },
  },
};
</script>
