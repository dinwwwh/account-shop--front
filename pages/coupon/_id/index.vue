<template>
  <div class="py-10">
    <div class="grid grid-cols-1 md:grid-cols-2">
      <!-- Card -->
      <div class="rounded-xl md:rounded-3xl">
        <CouponCard
          class="text-gray-500 bg-green-200 rounded-2xl p-4"
          :coupon="coupon"
        />
      </div>

      <!-- Actions -->
      <div>
        <NuxtLink :to="{ name: 'coupon-id-update', params: { id: coupon.id } }">
          <ButtonPrimary> Cập nhật </ButtonPrimary>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ $axios, params: { id } }) {
    const { data: coupon } = await $axios.$get(`coupon/${id}`);
    return {
      coupon,
    };
  },
};
</script>
