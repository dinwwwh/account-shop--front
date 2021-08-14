<template>
  <div class="sm:flex justify-center py-10">
    <div class="space-y-4">
      <HeadingBase2 class="text-center"> Tạo phiếu giảm giá </HeadingBase2>

      <CouponForm v-model="coupon" @emit-vuelidate="vuelidateOfCoupon = $event">
        <template #actions>
          <div class="space-y-4">
            <MessageBase :message="message" />

            <div v-if="createdCoupon">
              <NuxtLink
                :to="{
                  name: 'coupon-id',
                  params: {
                    id: createdCoupon.id,
                  },
                }"
              >
                <ButtonPrimary>Truy cập ngay</ButtonPrimary>
              </NuxtLink>
            </div>

            <ButtonPrimary theme="green" :loading="loading" @click="create">
              Tạo
            </ButtonPrimary>
          </div>
        </template>
      </CouponForm>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      coupon: undefined,
      vuelidateOfCoupon: undefined,
      loading: false,
      message: {
        error: undefined,
        success: undefined,
      },
      createdCoupon: undefined,
    };
  },
  methods: {
    async create() {
      this.message = {
        error: undefined,
        success: undefined,
      };

      this.vuelidateOfCoupon.$touch();
      if (this.vuelidateOfCoupon.$invalid) {
        this.message.error = 'Vui lòng kiểm tra lại thông tin';
        return;
      }

      try {
        this.loading = true;
        const { data: coupon } = await this.$axios.$post('coupon', this.coupon);
        this.createdCoupon = coupon;
        this.message.success = 'Tạo thành công';
      } catch (e) {
        this.message.error = 'Thất bại vui lòng thử lại sau';
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
