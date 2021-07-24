<template>
  <div class="space-y-7">
    <!-- Account infos -->
    <div class="space-y-2">
      <HeadingBase4 class="text-center"> Thông tin đính kèm </HeadingBase4>

      <ul class="space-y-5">
        <li class="lg:col-span-1 flex items-start">
          <div class="flex-shrink-0">
            <IconCheckCircle class="size-lg text-green-400" />
          </div>
          <p class="ml-3 text-sm text-gray-700">Tài khoản</p>
        </li>
        <li class="lg:col-span-1 flex items-start">
          <div class="flex-shrink-0">
            <IconCheckCircle class="size-lg text-green-400" />
          </div>
          <p class="ml-3 text-sm text-gray-700">Mật khẩu</p>
        </li>
        <li
          v-for="accountInfo in accountInfos"
          :key="accountInfo.id"
          class="lg:col-span-1 flex items-start"
        >
          <div class="flex-shrink-0">
            <IconCheckCircle class="size-lg text-green-400" />
          </div>
          <p class="ml-3 text-sm text-gray-700">{{ accountInfo.name }}</p>
        </li>
      </ul>
    </div>

    <!-- Prices -->
    <div class="flex items-center justify-center gap-3">
      <div class="text-gray-500">Giá bán:</div>
      <div
        class="flex items-center gap-1 font-medium tracking-wider text-gray-700"
      >
        {{ formatNumber(account.price) }} <AppCoinGold class="size-xl" />
      </div>
    </div>

    <!-- Actions -->
    <ButtonPrimary @click="isShowTradingAccount = true">
      Mua ngay
    </ButtonPrimary>

    <!-- Popup trading-account -->
    <AccountTradingPopup v-model="isShowTradingAccount" :account="account" />
  </div>
</template>

<script>
import { format } from '~/utils/number';

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
      isShowTradingAccount: false,
    };
  },
  computed: {
    accountInfos() {
      return this.account?.accountInfos ?? [];
    },
  },
  methods: {
    formatNumber: format,
  },
};
</script>
