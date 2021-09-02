<template>
  <div class="py-6 space-y-4">
    <!-- Tittle -->
    <div>
      <HeadingBase2>
        Tài khoản #{{ account.id }}

        <span
          class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
          :class="getClassNameByStatusCode(account.latestAccountStatus.code)"
        >
          {{ getStatusCodeMeaning(account.latestAccountStatus.code) }}
        </span>
      </HeadingBase2>
      <div class="flex items-center gap-2">
        <div class="flex-shrink-0">
          <img class="h-8 w-8 rounded-full" :src="gameImagePath" />
        </div>
        <HeadingBase5>
          {{ account.accountType.game.name }}
          <span class="text-base font-normal">
            ({{ account.accountType.game.publisherName }})
          </span>
        </HeadingBase5>
      </div>
    </div>

    <MessageBaseError
      v-if="
        account.latestAccountStatus.code >= 300 &&
        account.latestAccountStatus.code <= 399
      "
    >
      {{
        'Lý do bị từ chối: ' +
        (account.latestAccountStatus.shortDescription || '(không có)')
      }}
    </MessageBaseError>

    <!-- Images -->
    <AccountImageSection :image-paths="imagePaths" />

    <!-- Approval -->
    <AccountApprovalSection
      v-if="account.canStartApproving || account.canEndApproving"
      :account="account"
    />

    <!-- Management -->
    <GroupBase>
      <AccountManagementSection :account="account" />
    </GroupBase>

    <!-- Game info section - account trading section -->
    <div class="grid grid-cols-1 md:grid-cols-5 gap-3">
      <div class="md:col-span-3">
        <GroupBase>
          <HeadingBase4 class="text-center">Thông tin game</HeadingBase4>
          <AccountGameInfoSection :game-infos="account.gameInfos" />
        </GroupBase>
      </div>

      <div class="md:col-span-2">
        <GroupBase>
          <AccountTradingSection :account="account" />
        </GroupBase>
      </div>
    </div>

    <!-- Panel -->
    <AccountPanelSection :account="account" />
  </div>
</template>

<script>
import {
  getStatusCodeMeaning,
  getClassNameByStatusCode,
} from '~/utils/status-code';

export default {
  async asyncData({ $axios, params }) {
    const { data: account } = await $axios.$get(`account/${params.id}`, {
      params: {
        _requiredModelRelationships: [
          'representativeImage',
          'otherImages',
          'accountType.game.gameInfos.rule',
          'accountType.game.representativeImage',
          'accountType.accountInfos.rule',
          'gameInfos',
          'accountInfos',
          'latestAccountStatus',
        ],
        _isRequiredPermissions: true,
      },
    });

    return {
      account,
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
    gameImagePath() {
      return this.account.accountType.game?.representativeImage?.path;
    },
  },
  methods: {
    getStatusCodeMeaning,
    getClassNameByStatusCode,
  },
};
</script>
