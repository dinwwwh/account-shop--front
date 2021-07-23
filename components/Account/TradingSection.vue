<template>
  <div class="space-y-5">
    <!-- Account infos -->
    <div class="space-y-2">
      <HeadingBase4 class="text-center"> Thông tin đính kèm </HeadingBase4>

      <div class="flex gap-2 flex-wrap">
        <p
          class="
            px-2
            py-1
            max-w-max
            text-sm
            font-bold
            rounded-md
            bg-trueGray-100
            text-trueGray-700
          "
        >
          Tài khoản
        </p>
        <p
          class="
            px-2
            py-1
            max-w-max
            text-sm
            font-bold
            rounded-md
            bg-trueGray-100
            text-trueGray-700
          "
        >
          Mật khẩu
        </p>
        <div v-for="accountInfo in accountInfos" :key="accountInfo.id">
          <p
            class="
              px-2
              py-1
              max-w-max
              text-sm
              font-bold
              rounded-md
              bg-trueGray-100
              text-trueGray-700
            "
          >
            {{ accountInfo.name }}
          </p>
        </div>
      </div>
    </div>

    <!-- Prices -->
    <div class="flex items-center gap-3 justify-center">
      <div class="text-gray-500">Giá bán:</div>
      <div
        class="flex items-center gap-1 text-gray-700 font-medium tracking-wider"
      >
        {{ formatNumber(account.price) }} <AppCoinGold class="size-xl" />
      </div>
    </div>

    <!-- Actions -->
    <button
      type="submit"
      class="
        w-full
        flex
        justify-center
        py-2
        px-4
        border border-transparent
        rounded-md
        shadow-sm
        text-sm
        font-medium
        text-white
        bg-indigo-600
        hover:bg-indigo-700
        focus:outline-none
        focus:ring-2
        focus:ring-offset-2
        focus:ring-indigo-500
      "
      @click="isShowTradingAccount = true"
    >
      Mua ngay
    </button>

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
