<template>
  <PopupBase v-model="isShow">
    <div class="space-y-4 min-h-[400px]">
      <!-- Infos -->
      <div>
        <div class="text-gray-600">
          Nhà mạnh:
          <span class="font-medium">
            {{ $rechargePhonecard.getTelcoName(rechargePhonecard.telco) }}
          </span>
        </div>
        <div class="text-gray-600">
          Mệnh giá:
          <span class="font-medium">
            {{ format(rechargePhonecard.faceValue) }}đ
          </span>
        </div>
        <div class="text-gray-600">
          Số Serial:
          <span class="font-medium">
            {{ rechargePhonecard.serial }}
          </span>
        </div>
        <div class="text-gray-600">
          Số thẻ:
          <span class="font-medium">
            {{ rechargePhonecard.code }}
          </span>
        </div>
      </div>

      <!-- Select result -->
      <div>
        <SelectBase
          v-model="result.status"
          :options="resultOptions"
          display-key="display"
          value-key="status"
          :error="$v.result.status.$error"
        >
          <template #label> Kết quả </template>
          <template #description>
            {{ $getValidatorErrorMessage($v.result.status, 'kết quả') }}
          </template>
        </SelectBase>

        <SelectBase
          v-if="result.status === 40"
          v-model="result.realFaceValue"
          :options="faceValueOptions"
          display-key="display"
          value-key="value"
          :error="$v.result.realFaceValue.$error"
        >
          <template #label> Mệnh giá thực </template>
          <template #description>
            {{
              $getValidatorErrorMessage(
                $v.result.realFaceValue,
                'mệnh giá thực'
              ) ||
              'Nếu không có mệnh giá phù hợp thì chọn mệnh giá thấp và gần nhất.'
            }}
          </template>
        </SelectBase>
      </div>

      <!-- actions -->
      <div class="flex items-center justify-end gap-3">
        <MessageSimple :message="message" />
        <ButtonPrimary theme="red" @click="isShow = false"> Huỷ </ButtonPrimary>
        <ButtonPrimary theme="green" :loading="isLoading" @click="endApproving">
          Xác nhận
        </ButtonPrimary>
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
      required: true,
      default: false,
    },
    rechargePhonecard: {
      type: Object,
      required: true,
      default: () => ({}),
    },
  },
  data() {
    return {
      isLoading: false,
      message: {
        error: undefined,
        success: undefined,
      },
      result: {
        status: undefined,
        realFaceValue: undefined,
      },
    };
  },
  computed: {
    isShow: {
      get() {
        return this.model;
      },
      set(val) {
        this.$emit('change', val);
      },
    },
    resultOptions() {
      return [
        {
          display: 'thành công',
          status: 20,
        },
        {
          display: 'thất bại',
          status: 30,
        },
        {
          display: 'sai mệnh giá',
          status: 40,
        },
      ];
    },
    faceValueOptions() {
      const telco = this.$dynamicConfig(
        'recharge-phonecard.manual_telcos'
      ).find(({ key }) => key === this.rechargePhonecard.telco);

      return telco?.faceValues.map(({ value }) => ({
        value,
        display: this.format(value) + 'đ',
      }));
    },
  },
  validations() {
    return {
      result: {
        status: {
          required: this.$rules.required,
        },
        realFaceValue: {
          required: this.$rules.requiredIf(() => this.result.status === 40),
        },
      },
    };
  },
  methods: {
    endApproving() {
      this.message = {
        error: undefined,
        success: undefined,
      };

      this.$v.result.$touch();
      if (this.$v.result.$invalid) {
        this.message.error = 'Vui lòng kiểm tra lại thông tin';
        return;
      }

      this.isLoading = true;
      const data = {
        status: this.result.status,
      };
      if (data.status === 40) {
        data.realFaceValue = this.result.realFaceValue;
      }
      this.$axios
        .$patch(
          `recharge-phonecard/${this.rechargePhonecard.id}/end-approving`,
          data
        )
        .then(() => {
          this.message.success = 'Thành công';
          this.$emit('finish');
        })
        .catch(({ response: { status } }) => {
          if (status === 403) {
            this.message.success = 'Thất bại';
            this.$emit('finish');
          } else if (status === 422) {
            this.message.error = 'Vui lòng kiểm tra lại thông tin';
          } else {
            this.message.error = 'Vui lòng thử lại sau';
          }
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    format,
  },
};
</script>
