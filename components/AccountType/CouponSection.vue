<template>
  <div>
    <div class="flex items-center justify-between mb-4">
      <div>
        <HeadingBase3> Danh sách phiếu giảm giá có thể sử dụng </HeadingBase3>
        <MessageSimple :message="detachingMessage" />
      </div>
      <ButtonPrimary @click="showAdd = true"> Thêm </ButtonPrimary>
    </div>

    <ul class="flex gap-2 flex-wrap">
      <li v-for="coupon in coupons" :key="coupon.id">
        <div
          class="flex items-center gap-2 bg-white shadow py-2 px-3 rounded-md"
        >
          <span> ID: {{ coupon.id }} - {{ coupon.name }} </span>
          <div>
            <ButtonPrimary
              size="xs"
              theme="red"
              :loading="detaching === coupon.id"
              @click="detach(coupon.id)"
            >
              <IconTrash class="size-base" />
            </ButtonPrimary>
          </div>
        </div>
      </li>
    </ul>

    <!-- Add coupon popup -->
    <PopupBase v-model="showAdd">
      <div class="space-y-4">
        <InputBase v-model="attachingId" :error="$v.attachingId.$error">
          <template #label> ID của mã giảm giá </template>
          <template #description>
            {{
              $getValidatorErrorMessage($v.attachingId, 'ID') ||
              'Chỉ ID hợp lệ và chưa được thêm'
            }}
          </template>
        </InputBase>

        <div class="flex items-center justify-end gap-3">
          <MessageSimple :message="message" />
          <ButtonPrimary theme="red" @click="showAdd = false">
            Huỷ
          </ButtonPrimary>
          <ButtonPrimary theme="green" :loading="attaching" @click="attach">
            Thêm
          </ButtonPrimary>
        </div>
      </div>
    </PopupBase>
  </div>
</template>

<script>
export default {
  model: {
    prop: 'model',
    event: 'change',
  },
  props: {
    model: {
      type: Array,
      required: true,
      default: () => [],
    },
    accountType: {
      type: Object,
      required: true,
      default: () => ({}),
    },
    canAttach: {
      type: Boolean,
      default: false,
    },
    canDetach: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      showAdd: false,
      attachingId: undefined,
      attaching: false,
      detaching: undefined,
      message: {
        success: undefined,
        error: undefined,
      },
      detachingMessage: {
        success: undefined,
        error: undefined,
      },
    };
  },
  computed: {
    coupons: {
      get() {
        return this.model;
      },
      set(val) {
        this.$emit('change', val);
      },
    },
  },
  validations() {
    const { required } = this.$rules;
    return {
      attachingId: {
        required,
      },
    };
  },
  methods: {
    async attach() {
      this.message = {
        success: undefined,
        error: undefined,
      };

      this.$v.attachingId.$touch();
      if (this.$v.attachingId.$invalid) {
        this.message.error = 'Vui lòng kiểm tra lại thông tin';
        return;
      }

      try {
        this.attaching = true;
        await this.$axios.$post(
          `account-type/${this.accountType.id}/coupon/${this.attachingId}`,
          {
            type: 10,
          }
        );
        this.message.success = 'Thêm thành công';
        this.coupons.push({
          id: this.attachingId,
        });
      } catch (e) {
        this.message.error = 'Thất bại vui lòng thử lại sau';
      } finally {
        this.attaching = false;
      }
    },
    async detach(couponId) {
      this.detachingMessage = {
        success: undefined,
        error: undefined,
      };

      try {
        this.detaching = couponId;
        await this.$axios.$delete(
          `account-type/${this.accountType.id}/coupon/${couponId}`
        );
        this.coupons = this.coupons.filter(({ id }) => id !== couponId);
      } catch (e) {
        this.detachingMessage.error = 'Xoá thất bại vui lòng thử lái sau';
      } finally {
        this.detaching = undefined;
      }
    },
  },
};
</script>
