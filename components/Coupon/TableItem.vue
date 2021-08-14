<template>
  <tr>
    <td class="px-6 py-4 whitespace-nowrap">
      <div class="flex items-center">
        <div class="ml-4">
          <div class="text-sm font-medium text-gray-900">
            {{ coupon.name }}
          </div>
          <div class="text-sm text-gray-500">{{ coupon.code }}</div>
        </div>
      </div>
    </td>
    <td class="px-6 py-4 whitespace-nowrap">
      <div class="text-sm text-gray-900">{{ coupon.percentageDiscount }}%</div>
      <div class="text-sm text-gray-500 flex items-end gap-1">
        {{ coupon.directDiscount }}
        <AppCoinGold class="size-base" />
      </div>
    </td>
    <td class="px-6 py-4 whitespace-nowrap">
      <div class="text-sm text-gray-900 flex items-end gap-1">
        {{ coupon.amount }} <IconTicket class="size-base" />
      </div>
      <div class="text-sm text-gray-500 flex items-end gap-1">
        {{ coupon.usedAmount }} <IconTicket class="size-base" />
      </div>
    </td>

    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
      {{ creator.name }}
    </td>

    <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
      <!-- Link to view detail account -->
      <NuxtLink
        :to="{
          name: 'coupon-id',
          params: {
            id: coupon.id,
          },
        }"
        class="text-gray-600 hover:text-indigo-600"
      >
        <IconEye class="size-xl" />
      </NuxtLink>
    </td>
  </tr>
</template>

<script>
import formatNumber from 'format-number';

export default {
  props: {
    coupon: {
      type: Object,
      required: true,
    },
  },
  computed: {
    creator() {
      return this.coupon.creator ?? {};
    },
  },
  methods: {
    formatNumber,
  },
};
</script>
