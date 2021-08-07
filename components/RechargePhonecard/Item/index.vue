<template>
  <div>
    <div class="flex items-center gap-3">
      <!-- Id -->
      <div>ID: {{ rechargePhonecard.id }}</div>

      <!-- Telco -->
      <div>
        Nhà mạng:
        <span class="font-medium">{{
          $rechargePhonecard.getTelcoName(rechargePhonecard.telco)
        }}</span>
      </div>

      <!-- Face value -->
      <div>
        Mệnh giá:
        <span class="font-medium">
          {{ formatNumber(rechargePhonecard.faceValue) }}đ
        </span>
      </div>

      <!-- Serial -->
      <div>Số serial: {{ rechargePhonecard.serial }}</div>

      <!-- Status -->
      <div
        class="px-2 py-1 text-sm font-medium rounded-full"
        :class="{
          'bg-blue-100 text-blue-500 ': rechargePhonecard.status === 0,
          'bg-teal-100 text-teal-500 ': rechargePhonecard.status === 10,
          'bg-green-100 text-green-500 ': rechargePhonecard.status === 20,
          'bg-red-100 text-red-500 ': rechargePhonecard.status === 30,
          'bg-gray-100 text-gray-500 ': rechargePhonecard.status === 40,
        }"
      >
        {{ $rechargePhonecard.getMeanOfStatus(rechargePhonecard.status) }}
      </div>

      <!-- Actions -->
      <div class="flex justify-end flex-1 gap-3">
        <!-- View info -->
        <div class="hover:text-blue-600 text-gray-500 cursor-pointer">
          <ButtonPrimary theme="blue" size="xs" @click="isShowInfos = true">
            Thông tin
          </ButtonPrimary>
        </div>

        <!-- Start approving -->
        <div
          v-if="canStartApproving"
          class="hover:text-blue-600 text-gray-500 cursor-pointer"
          @click="startApproving"
        >
          <ButtonPrimary
            theme="green"
            size="xs"
            :loading="isLoadingStartApproving"
          >
            Phê duyệt
          </ButtonPrimary>
        </div>

        <!-- Continue approving -->
        <div
          v-if="canEndApproving"
          class="hover:text-blue-600 text-gray-500 cursor-pointer"
          @click="continueApproving"
        >
          <ButtonPrimary theme="green" size="xs">
            Tiếp tục phê duyệt
          </ButtonPrimary>
        </div>
      </div>
    </div>

    <!-- Popup show detail infos -->
    <PopupBase v-model="isShowInfos">
      <pre>
            {{ rechargePhonecard }}
      </pre>
    </PopupBase>

    <!-- Popup approving  -->
    <RechargePhonecardItemPopupApproving
      v-model="isShowApproving"
      :recharge-phonecard="rechargePhonecard"
      @finish="onFinishApproving"
    />
  </div>
</template>

<script>
import { format } from '~/utils/number';

export default {
  props: {
    rechargePhonecard: {
      type: Object,
      required: true,
      default: () => ({}),
    },
  },
  data() {
    return {
      isShowInfos: false,
      isShowApproving: false,
      canStartApproving: this.rechargePhonecard.canStartApproving,
      isLoadingStartApproving: false,
      canEndApproving: this.rechargePhonecard.canEndApproving,
    };
  },
  methods: {
    formatNumber: format,
    startApproving() {
      this.isLoadingStartApproving = true;
      this.$axios
        .$patch(
          `recharge-phonecard/${this.rechargePhonecard.id}/start-approving`
        )
        .then(() => {
          this.canStartApproving = false;
          this.canEndApproving = true;
          this.isShowApproving = true;
        })
        .catch(() => {
          this.canStartApproving = false;
        })
        .finally(() => {
          this.isLoadingStartApproving = false;
        });
    },
    continueApproving() {
      this.isShowApproving = true;
    },
    onFinishApproving() {
      this.canStartApproving = false;
      this.canEndApproving = false;
    },
  },
};
</script>
