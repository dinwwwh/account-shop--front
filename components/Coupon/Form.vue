<template>
  <div class="space-y-4">
    <div class="space-y-2">
      <InputBase v-model="coupon.name" :error="$v.coupon.name.$error">
        <template #label> Tên mã giảm giá </template>
        <template #description>
          {{ $getValidatorErrorMessage($v.coupon.name, 'tên') }}
        </template>
      </InputBase>

      <InputBase v-model="coupon.code" :error="$v.coupon.code.$error">
        <template #label> Mã giảm giá </template>
        <template #description>
          {{ $getValidatorErrorMessage($v.coupon.code, 'mã') }}
        </template>
      </InputBase>

      <TextareaBase
        v-model="coupon.description"
        :error="$v.coupon.description.$error"
      >
        <template #label> Mô tả </template>
        <template #description>
          {{ $getValidatorErrorMessage($v.coupon.description, 'tên') }}
        </template>
      </TextareaBase>

      <InputBase
        v-model.number="coupon.percentageDiscount"
        type="number"
        :error="$v.coupon.percentageDiscount.$error"
      >
        <template #label> Giảm giá theo % </template>
        <template #description>
          {{ $getValidatorErrorMessage($v.coupon.percentageDiscount) }}
        </template>
      </InputBase>

      <InputBase
        v-model.number="coupon.directDiscount"
        type="number"
        :error="$v.coupon.directDiscount.$error"
      >
        <template #label> Giảm giá trực tiếp </template>
        <template #description>
          {{ $getValidatorErrorMessage($v.coupon.directDiscount) }}
        </template>
      </InputBase>

      <InputBase
        v-model.number="coupon.maximumDiscount"
        type="number"
        :error="$v.coupon.maximumDiscount.$error"
      >
        <template #label> Giá trị tối đa </template>
        <template #description>
          {{
            $getValidatorErrorMessage($v.coupon.maximumDiscount) ||
            'Giá trị tối đa của phiếu giảm giá này.'
          }}
        </template>
      </InputBase>

      <InputBase
        v-model.number="coupon.minimumDiscount"
        type="number"
        :error="$v.coupon.minimumDiscount.$error"
      >
        <template #label> Giá trị tối thiểu </template>
        <template #description>
          {{
            $getValidatorErrorMessage($v.coupon.minimumDiscount) ||
            'Giá trị tối thiểu của phiếu giảm giá này.'
          }}
        </template>
      </InputBase>

      <InputBase
        v-model.number="coupon.maximumValue"
        type="number"
        :error="$v.coupon.maximumValue.$error"
      >
        <template #label> Giới hạn tối đa </template>
        <template #description>
          {{
            $getValidatorErrorMessage($v.coupon.maximumValue) ||
            'Giá trị tối đa của đối tượng mà phiếu giảm giá này hỗ trợ.'
          }}
        </template>
      </InputBase>

      <InputBase
        v-model.number="coupon.minimumValue"
        type="number"
        :error="$v.coupon.minimumValue.$error"
      >
        <template #label> Giới hạn tối thiểu </template>
        <template #description>
          {{
            $getValidatorErrorMessage($v.coupon.minimumValue) ||
            'Giá trị tối thiểu của đối tượng mà phiếu giảm giá này hỗ trợ.'
          }}
        </template>
      </InputBase>

      <InputDatetime
        v-model="coupon.usableAt"
        type="datetime"
        :error="$v.coupon.usableAt.$error"
      >
        <template #label> Ngày có hiệu lực </template>
        <template #description>
          {{ $getValidatorErrorMessage($v.coupon.usableAt, 'tên') }}
        </template>
      </InputDatetime>

      <InputDatetime
        v-model="coupon.usableClosedAt"
        type="datetime"
        :error="$v.coupon.usableClosedAt.$error"
      >
        <template #label> Ngày hết hiệu lực </template>
        <template #description>
          {{ $getValidatorErrorMessage($v.coupon.usableClosedAt, 'tên') }}
        </template>
      </InputDatetime>

      <HeadingBase4> Bán phiếu giảm giá này hay không? </HeadingBase4>
      <DescriptionBase>
        Nếu bạn điền giá trị dưới đây, những phiếu giảm giá này chỉ được sử dụng
        bởi những người mua nó. Ngược lại thì không bán và ai có code của mã
        giảm giá này đều sử dụng được.
      </DescriptionBase>

      <InputBase
        v-model.number="coupon.price"
        type="number"
        :error="$v.coupon.price.$error"
      >
        <template #label> Giá bán </template>
        <template #description>
          {{ $getValidatorErrorMessage($v.coupon.price) }}
        </template>
      </InputBase>

      <InputDatetime
        v-model="coupon.offeredAt"
        type="datetime"
        :error="$v.coupon.offeredAt.$error"
      >
        <template #label> Ngày mở bán </template>
        <template #description>
          {{ $getValidatorErrorMessage($v.coupon.offeredAt, 'ngày mở bán') }}
        </template>
      </InputDatetime>

      <InputDatetime
        v-model="coupon.offerClosedAt"
        type="datetime"
        :error="$v.coupon.offerClosedAt.$error"
      >
        <template #label> Ngày kết thúc bán </template>
        <template #description>
          {{
            $getValidatorErrorMessage(
              $v.coupon.offerClosedAt,
              'ngày kết thúc bán'
            )
          }}
        </template>
      </InputDatetime>
    </div>

    <div>
      <slot name="actions" />
    </div>
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
      type: Object,
      required: true,
      default() {
        const coupon = {};
        this.$emit('change', coupon);
        return coupon;
      },
    },
  },
  computed: {
    coupon: {
      get() {
        return this.model;
      },
      set(coupon) {
        this.$emit('change', coupon);
      },
    },
  },
  validations() {
    const { required, minValue, maxValue, gte, lte, maxLength } = this.$rules;
    return {
      coupon: {
        name: {
          required,
        },
        code: {
          required,
          maxLength: maxLength(36),
        },
        description: {},

        maximumDiscount: {
          gte: gte(this.coupon.minimumDiscount),
        },
        maximumValue: {
          gte: gte(this.coupon.minimumValue),
        },
        minimumDiscount: {
          lte: lte(this.coupon.maximumDiscount),
        },
        minimumValue: {
          lte: lte(this.coupon.maximumValue),
        },
        percentageDiscount: {
          minValue: minValue(0),
          maxValue: maxValue(100),
        },
        directDiscount: {
          minValue: minValue(0),
        },
        usableAt: {},
        usableClosedAt: {},

        price: {
          minValue: minValue(1),
        },
        offeredAt: {},
        offerClosedAt: {},
      },
    };
  },
  watch: {
    $v() {
      this.$emit('emit-vuelidate', this.$v.coupon);
    },
  },
  created() {
    this.$emit('emit-vuelidate', this.$v.coupon);
  },
};
</script>
