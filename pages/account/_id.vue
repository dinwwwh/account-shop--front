<template>
  <div class="py-6 space-y-4">
    <!-- Tittle -->
    <div>
      <HeadingBase2> Tài khoản #{{ account.id }} </HeadingBase2>
      <HeadingBase5>
        Game {{ account.accountType.game.name }}
        <span class="text-base font-normal">
          ({{ account.accountType.game.publisherName }})
        </span>
      </HeadingBase5>
    </div>

    <!-- Images -->
    <AccountImageSection :image-paths="imagePaths" />
    <div class="grid grid-cols-5 grid-rows-1">
      <!-- Game infos -->
      <div class="col-span-3">
        <AccountGameInfoSection :game-infos="account.gameInfos" />
      </div>
      <!-- Actions and other infos -->
      <div class="col-span-2 bg-green-200">
        <!-- <div>
          <ButtonPrimary theme="yellow"> Mua Trả Góp </ButtonPrimary>
          <ButtonPrimary theme="indigo"> Mua Ngay </ButtonPrimary>
        </div> -->
        <AccountCommentSection />
      </div>
    </div>

    <!-- Panel -->
    <AccountPanelSection :account="account" />
  </div>
</template>

<script>
export default {
  async asyncData({ $axios, $auth, params }) {
    const [{ data: account }, canUpdateAccount] = await Promise.all([
      $axios.$get(`account/${params.id}`, {
        params: { _requiredModelRelationships: ['images', 'accountType.game'] },
      }),
      $auth.can('update', `Account:${params.id}`),
    ]);

    return {
      account,
      canUpdateAccount,
    };
  },
  computed: {
    imagePaths() {
      const mainImagePath = this.account.representativeImagePath;
      const otherImagePaths = this.account.images.map((image) => {
        return image.path;
      });
      return [mainImagePath, ...otherImagePaths];
    },
  },
};
</script>
