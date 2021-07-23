<template>
  <PopupBase v-model="show">
    <div class="min-w-[320px] space-y-7">
      <HeadingBase2> Mua tài khoản #{{ account.id }} </HeadingBase2>

      <div class="text-gray-700 font-medium flex items-center gap-1 flex-wrap">
        Bạn đồng ý mua nick #{{ account.id }} với giá
        <span class="flex items-center gap-1 tracking-wider">
          {{ formatNumber(price) }} <AppCoinGold class="size-xl" />
        </span>
      </div>

      <div class="space-y-4">
        <CheckboxBase v-model="hasCoupon">
          <template #label> Bạn có phiếu giảm giá? </template>
        </CheckboxBase>

        <div v-if="hasCoupon" class="flex items-center justify-around">
          <InputBase v-model="couponCode" placeholder="Mã giảm giá ..." />
          <ButtonPrimary size="xs" @click="checkCoupon"> Check </ButtonPrimary>
        </div>
      </div>

      <div class="space-y-2">
        <MessageBase :message="message" />

        <div class="flex items-center justify-end gap-3">
          <ButtonPrimary theme="green" :loading="buying" @click="buy">
            Xác nhận và mua
          </ButtonPrimary>
          <ButtonPrimary theme="red" @click="show = false"> Huỷ </ButtonPrimary>
        </div>
      </div>
    </div>
  </PopupBase>
</template>

<script>
import { format } from '~/utils/number';

export default {
  model: {
    prop: 'model',
    event: 'change',
  },
  props: {
    model: {
      type: Boolean,
      default: false,
    },
    account: {
      type: Object,
      required: true,
      default: () => ({}),
    },
  },
  data() {
    return {
      buying: false,
      price: this.account.price,
      hasCoupon: false,
      couponCode: undefined,
      message: {
        error: undefined,
        success: undefined,
      },
    };
  },
  computed: {
    show: {
      get() {
        return this.model;
      },
      set(val) {
        this.$emit('change', val);
      },
    },
  },
  methods: {
    formatNumber: format,
    buy() {
      this.buying = true;
      this.$axios
        .$post(`account-trading/buy/${this.account.id}`, {
          couponCode: this.couponCode,
        })
        .then(() => {
          this.message.error = null;
          this.message.success = 'Thành công!';
        })
        .catch(() => {
          this.message.error = 'Thất bại';
          this.message.success = null;
        })
        .finally(() => {
          this.buying = false;
        });
    },
    checkCoupon() {
      this.$axios
        .$get(`account-trading/detail-price/${this.account.id}`)
        .then(({ data }) => {
          this.price = data.cost + data.fee;
        })
        .catch();
    },
  },
};
</script>
