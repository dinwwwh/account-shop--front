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

    <!-- Game info section - account trading section -->
    <div class="grid grid-cols-1 md:grid-cols-5 gap-3">
      <div class="md:col-span-3">
        <div
          class="
            bg-white
            shadow
            sm:rounded-lg sm:overflow-hidden
            px-4
            py-6
            sm:px-6
            space-y-2
          "
        >
          <HeadingBase4 class="text-center">Thông tin game</HeadingBase4>
          <AccountGameInfoSection :game-infos="account.gameInfos" />
        </div>
      </div>

      <div class="md:col-span-2">
        <div
          class="
            bg-white
            shadow
            sm:rounded-lg sm:overflow-hidden
            px-4
            py-6
            sm:px-6
          "
        >
          <AccountTradingSection :account="account" />
        </div>
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
        params: {
          _requiredModelRelationships: [
            'representativeImage',
            'otherImages',
            'accountType.game',
            'gameInfos',
            'accountInfos',
          ],
        },
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
      const mainImagePath = this.account.representativeImage?.path;
      const otherImagePaths = this.account.otherImages.map(
        (image) => image.path
      );
      return [mainImagePath, ...otherImagePaths];
    },
  },
};
</script>
