<template>
  <div class="space-y-12">
    <GroupSeparated>
      <div class="space-y-4">
        <div>
          <HeadingBase4> Nạp thủ công </HeadingBase4>
          <DescriptionBase>
            Có thể mất đến hàng giờ để duyệt thẻ cào.
          </DescriptionBase>
        </div>

        <div class="space-y-2">
          <SelectBase
            v-model="manualCard.type"
            class="md:w-4/5 lg:w-3/5"
            :options="manualCard.typeOptions"
            display-key="display"
            value-key="type"
            :error="$v.manualCard.type.$error"
          >
            <template #label> Loại thẻ </template>
            <template #description>
              {{ $getValidatorErrorMessage($v.manualCard.type, 'loại thẻ') }}
            </template>
          </SelectBase>

          <InputBase
            key="
          "
            v-model="manualCard.seri"
            class="md:w-4/5 lg:w-3/5"
            placeholder="10007719909801"
            :error="$v.manualCard.seri.$error"
          >
            <template #label> Số seri </template>
            <template #description>
              {{ $getValidatorErrorMessage($v.manualCard.seri, 'số seri') }}
            </template>
          </InputBase>

          <InputBase
            v-model="manualCard.code"
            class="md:w-4/5 lg:w-3/5"
            placeholder="614381777991793"
            :error="$v.manualCard.code.$error"
          >
            <template #label> Mã thẻ </template>
            <template #description>
              {{ $getValidatorErrorMessage($v.manualCard.seri, 'mã thẻ') }}
            </template>
          </InputBase>
        </div>
      </div>
      <template #bottom>
        <div class="flex justify-end items-center gap-2">
          <ButtonPrimary
            theme="gray"
            :loading="manualCard.loading"
            @click="rechargeManualCard"
          >
            Nạp thẻ
          </ButtonPrimary>
        </div>
      </template>
    </GroupSeparated>

    <GroupSeparated>
      <div class="space-y-4">
        <div>
          <HeadingBase4>
            Nạp tự động
            <span class="font-normal text-base text-gray-500">
              (Thesieure.com)
            </span>
          </HeadingBase4>
          <DescriptionBase> Mất một vài phút để xử lý. </DescriptionBase>
        </div>

        <div class="space-y-2">
          <SelectBase
            v-model="tsrCard.type"
            class="md:w-4/5 lg:w-3/5"
            :options="tsrCard.typeOptions"
            display-key="display"
            value-key="type"
            :error="$v.tsrCard.type.$error"
          >
            <template #label> Loại thẻ </template>
            <template #description>
              {{ $getValidatorErrorMessage($v.tsrCard.type, 'loại thẻ') }}
            </template>
          </SelectBase>

          <InputBase
            key="
          "
            v-model="tsrCard.seri"
            class="md:w-4/5 lg:w-3/5"
            placeholder="10007719909801"
            :error="$v.tsrCard.seri.$error"
          >
            <template #label> Số seri </template>
            <template #description>
              {{ $getValidatorErrorMessage($v.tsrCard.seri, 'số seri') }}
            </template>
          </InputBase>

          <InputBase
            v-model="tsrCard.code"
            class="md:w-4/5 lg:w-3/5"
            placeholder="614381777991793"
            :error="$v.tsrCard.code.$error"
          >
            <template #label> Mã thẻ </template>
            <template #description>
              {{ $getValidatorErrorMessage($v.tsrCard.seri, 'mã thẻ') }}
            </template>
          </InputBase>
        </div>
      </div>
      <template #bottom>
        <div class="flex justify-end items-center gap-2">
          <ButtonPrimary
            theme="gray"
            :loading="tsrCard.loading"
            @click="rechargeTsrCard"
          >
            Nạp thẻ
          </ButtonPrimary>
        </div>
      </template>
    </GroupSeparated>
  </div>
</template>

<script>
export default {
  data() {
    return {
      manualCard: {
        typeOptions: [
          { display: 'Viettel', type: 'viettel' },
          { display: 'Vinaphone', type: 'vinaphone' },
        ],
        code: undefined,
        type: undefined,
        seri: undefined,
        loading: false,
        message: {
          error: undefined,
          success: undefined,
        },
      },
      tsrCard: {
        typeOptions: [
          { display: 'Viettel', type: 'viettel' },
          { display: 'Vinaphone', type: 'vinaphone' },
        ],
        code: undefined,
        type: undefined,
        seri: undefined,
        loading: false,
        message: {
          error: undefined,
          success: undefined,
        },
      },
    };
  },
  validations() {
    return {
      manualCard: {
        type: {
          required: this.$rules.required,
        },
        seri: {
          required: this.$rules.required,
        },
        code: {
          required: this.$rules.required,
        },
      },
      tsrCard: {
        type: {
          required: this.$rules.required,
        },
        seri: {
          required: this.$rules.required,
        },
        code: {
          required: this.$rules.required,
        },
      },
    };
  },
  methods: {
    rechargeManualCard() {
      this.$v.manualCard.$touch();
      this.manualCard.message = {
        error: undefined,
        success: undefined,
      };

      if (this.$v.manualCard.$invalid) {
        this.manualCard.message.error = 'Vui lòng kiểm tra lại thông tin ';
      }
    },

    rechargeTsrCard() {
      this.$v.tsrCard.$touch();
      this.tsrCard.message = {
        error: undefined,
        success: undefined,
      };

      if (this.$v.tsrCard.$invalid) {
        this.tsrCard.message.error = 'Vui lòng kiểm tra lại thông tin ';
      }
    },
  },
};
</script>
