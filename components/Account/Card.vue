<template>
  <div class="w-full rounded sm:rounded-lg sm:overflow-hidden shadow">
    <div
      class="pb-[75%] bg-center bg-cover"
      :style="`background-image: url(${representativeImagePath}), url(/images/errors/404/base.jpg);`"
    />

    <div class="px-4 pb-3 pt-2 space-y-3">
      <p class="text-gray-700 line-clamp-3">
        {{ account.description }}
      </p>

      <div class="flex items-center justify-between">
        <span class="flex font-medium items-center gap-1 tracking-wider">
          {{ formatNumber(account.price) }} <AppCoinGold class="size-xl" />
        </span>

        <NuxtLink
          :to="{ name: 'account-id', params: { id: account.id } }"
          class="text-base font-medium text-blue-600 hover:text-blue-500"
        >
          Chi tiết <IconArrowNarrowRight class="inline-block size-lg" />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script>
import { format } from '~/utils/number';

export default {
  props: {
    account: {
      type: Object,
      validator(val) {
        return val?.representativeImage?.path;
      },
      required: true,
      default: () => ({}),
    },
  },
  computed: {
    representativeImagePath() {
      return this.account?.representativeImage?.path;
    },
  },
  methods: {
    formatNumber: format,
  },
};
</script>
