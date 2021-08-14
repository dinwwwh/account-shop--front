<template>
  <div class="max-w-full overflow-auto">
    <table class="min-w-full divide-y divide-gray-200">
      <thead class="bg-gray-50">
        <tr>
          <th
            scope="col"
            class="
              px-6
              py-3
              text-left text-xs
              font-medium
              text-gray-500
              uppercase
              tracking-wider
            "
          >
            Name/Code
          </th>
          <th
            scope="col"
            class="
              px-6
              py-3
              text-left text-xs
              font-medium
              text-gray-500
              uppercase
              tracking-wider
            "
          >
            Discount
          </th>
          <th
            scope="col"
            class="
              px-6
              py-3
              text-left text-xs
              font-medium
              text-gray-500
              uppercase
              tracking-wider
            "
          >
            Amount/Used Amount
          </th>
          <th
            scope="col"
            class="
              px-6
              py-3
              text-left text-xs
              font-medium
              text-gray-500
              uppercase
              tracking-wider
            "
          >
            Owner
          </th>
          <th scope="col" class="relative px-6 py-3">
            <span class="sr-only">actions</span>
          </th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <!-- Items -->
        <CouponTableItem
          v-for="coupon in coupons"
          :key="coupon.id"
          :coupon="coupon"
        />
      </tbody>
    </table>

    <!-- Case: empty coupons -->
    <div v-if="!coupons.length" class="mt-4">
      <p
        class="
          font-extralight
          tracking-widest
          text-gray-400 text-lg text-center
        "
      >
        Không tìm thấy phiếu giảm giá nào
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    coupons: {
      type: Array,
      required: true,
    },
  },
};
</script>
