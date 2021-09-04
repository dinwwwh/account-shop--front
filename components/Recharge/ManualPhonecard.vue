<template>
  <GroupSeparated v-if="recharge_phonecard_manual_enable">
    <div class="space-y-4">
      <div>
        <HeadingBase4> Nạp thủ công </HeadingBase4>
        <DescriptionBase>
          Có thể mất đến hàng giờ để duyệt thẻ cào.
        </DescriptionBase>
      </div>

      <div class="space-y-2">
        <SelectBase
          v-model="manualCard.telco"
          class="md:w-4/5 lg:w-3/5"
          :options="recharge_phonecard_manual_telcos"
          display-key="name"
          value-key="key"
          :error="$v.manualCard.telco.$error"
        >
          <template #label> Loại thẻ </template>
          <template #description>
            {{ $getValidatorErrorMessage($v.manualCard.telco, 'loại thẻ') }}
          </template>
        </SelectBase>

        <SelectBase
          v-model="manualCard.faceValue"
          class="md:w-4/5 lg:w-3/5"
          :options="faceValueOptionsForManualCard"
          display-key="display"
          value-key="value"
          :error="$v.manualCard.faceValue.$error"
        >
          <template #label> Mệnh giá </template>
          <template #description>
            {{ $getValidatorErrorMessage($v.manualCard.faceValue, 'mệnh giá') }}
          </template>
        </SelectBase>

        <InputBase
          key="
          "
          v-model="manualCard.serial"
          class="md:w-4/5 lg:w-3/5"
          placeholder="10007719909801"
          :error="$v.manualCard.serial.$error"
        >
          <template #label> Số seri </template>
          <template #description>
            {{ $getValidatorErrorMessage($v.manualCard.serial, 'số seri') }}
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
            {{ $getValidatorErrorMessage($v.manualCard.code, 'mã thẻ') }}
          </template>
        </InputBase>
      </div>
    </div>
    <template #bottom>
      <div class="flex justify-end items-center gap-3">
        <MessageSimple :message="manualCard.message" />
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
</template>

<script>
import { format } from '~/utils/number';

export default {
  data() {
    return {
      manualCard: {
        code: undefined,
        telco: undefined,
        serial: undefined,
        faceValue: undefined,
        loading: false,
        message: {
          error: undefined,
          success: undefined,
          info: undefined,
        },
      },
    };
  },
  computed: {
    faceValueOptionsForManualCard() {
      const selectedTelco = this.recharge_phonecard_manual_telcos.find(
        ({ key }) => key === this.manualCard.telco
      );
      if (!selectedTelco) return [];
      return selectedTelco.faceValues.map((faceValue) => {
        const display =
          this.formatNumber(faceValue.value) +
          'đ = ' +
          this.formatNumber(
            faceValue.value - (faceValue.value * faceValue.tax) / 100
          ) +
          ' Coin (đồng vàng)';
        return {
          ...faceValue,
          display,
        };
      });
    },
    recharge_phonecard_manual_telcos() {
      return this.$dynamicConfig('recharge-phonecard.manual_telcos');
    },
    recharge_phonecard_manual_enable() {
      return this.$dynamicConfig('recharge-phonecard.port_manual_enable');
    },
  },
  validations() {
    return {
      manualCard: {
        telco: {
          required: this.$rules.required,
        },
        serial: {
          required: this.$rules.required,
        },
        code: {
          required: this.$rules.required,
        },
        faceValue: {
          required: this.$rules.required,
          in: this.$rules.in(
            this.faceValueOptionsForManualCard.map(({ value }) => value)
          ),
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
        info: undefined,
      };

      if (this.$v.manualCard.$invalid) {
        this.manualCard.message.error = 'Vui lòng kiểm tra lại thông tin ';
        return;
      }

      this.manualCard.loading = true;
      this.$axios
        .$post('recharge-phonecard', {
          serial: this.manualCard.serial,
          code: this.manualCard.code,
          faceValue: this.manualCard.faceValue,
          telco: this.manualCard.telco,
          port: 0,
        })
        .then(({ data: { status } }) => {
          if (status === 20) {
            this.manualCard.message.success =
              'Thành công vui lòng tải lại trang.';
          } else if (status === 0) {
            this.manualCard.message.info =
              'Thẻ đang được phê duyệt vui lòng kiêm tra trạng thái bên lịch sử.';
          } else {
            this.manualCard.message.error =
              'Thẻ không chính xác hoặc hệ thống bảo trì.';
          }
        })
        .catch(() => {
          this.manualCard.message.error = 'Thất bại, vui lòng thử lại sau';
        })
        .finally(() => {
          this.manualCard.loading = false;
        });
    },
    formatNumber: format,
  },
};
</script>
