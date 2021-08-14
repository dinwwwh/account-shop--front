<template>
  <div class="h-60 relative">
    <!-- Name and code -->
    <div class="absolute right-4 bottom-4 text-current">
      <div class="uppercase text-xl tracking-wider text-right">
        {{ coupon.name }}
      </div>
      <div class="uppercase font-mono">{{ coupon.code || 'XXXXXXXX' }}</div>
    </div>

    <!-- Used time -->
    <div class="absolute top-4 left-4">
      <div class="uppercase text-xl tracking-wider">
        <template v-if="coupon.usableAt">
          Sử dụng được: {{ $moment.fromNow(coupon.usableAt) }}
        </template>
        <template v-else> Sử dụng được ngay </template>
      </div>
      <div
        v-if="coupon.usableClosedAt"
        class="uppercase text-xl tracking-wider"
      >
        Hết hạn lúc: {{ $moment.fromNow(coupon.usableClosedAt) }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    coupon: {
      type: Object,
      required: true,
    },
  },
};
</script>
