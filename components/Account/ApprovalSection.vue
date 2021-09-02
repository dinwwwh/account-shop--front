<template>
  <GroupBase>
    <HeadingBase4>Dành cho phê duyệt viên</HeadingBase4>

    <!-- Actions -->
    <div class="flex items-center gap-3">
      <ButtonPrimary
        v-if="account.canStartApproving"
        :loading="isLoadStartApproving"
        @click="startApproving"
      >
        Bắt đầu phê duyệt
      </ButtonPrimary>
      <ButtonPrimary
        v-if="account.canEndApproving"
        theme="gray"
        @click="isShowEndApproving = true"
      >
        Kết thúc phê duyệt
      </ButtonPrimary>
      <ButtonPrimary
        v-if="account.canEndApproving"
        theme="yellow"
        @click="isShowInfos = true"
      >
        <IconEye class="size-xl mr-1" />
        Xem thông tin nick
      </ButtonPrimary>
    </div>

    <!-- Username Password AccountInfos screen -->
    <PopupFullScreen v-model="isShowInfos">
      <div class="flex min-w-[420px]">
        <ul class="divide-y divide-yellow-500 mx-auto">
          <li class="flex justify-between items-end gap-4">
            <div class="text-lg text-gray-600 font-medium">Username:</div>
            <div class="text-gray-500">{{ account.username }}</div>
          </li>
          <li class="flex justify-between items-end gap-4">
            <div class="text-lg text-gray-600 font-medium">Password:</div>
            <div class="text-gray-500">{{ account.password }}</div>
          </li>

          <li
            v-for="accountInfo in account.accountInfos"
            :key="accountInfo.id"
            class="flex justify-between items-end gap-4"
          >
            <div class="text-lg text-gray-600 font-medium">
              {{ accountInfo.name }}:
            </div>
            <div class="text-gray-500">
              {{ accountInfo.pivot.values.toString() }}
            </div>
          </li>
        </ul>
      </div>
    </PopupFullScreen>

    <!-- End Approving screen -->
    <PopupBase v-model="isShowEndApproving">
      <div class="min-w-[420px] space-y-4">
        <HeadingBase4 class="text-center"> Kết thúc phê duyệt </HeadingBase4>

        <SelectBase
          v-model="endApprovingResult.success"
          :options="[
            {
              value: true,
              display: 'Thành công',
            },
            {
              value: false,
              display: 'Thất bại',
            },
          ]"
          display-key="display"
          value-key="value"
          :error="$v.endApprovingResult.success.$error"
        >
          <template #label> Kết quả </template>
          <template #description>
            {{
              $getValidatorErrorMessage(
                $v.endApprovingResult.success,
                'Kết quả'
              )
            }}
          </template>
        </SelectBase>

        <TextareaBase v-model="endApprovingResult.description">
          <template #label> Mô tả (optional) </template>
          <template #description>
            Không được chứa các thông tin nhạy cảm.
          </template>
        </TextareaBase>

        <MessageBase :message="endApprovingMessage" />

        <div class="flex items-center justify-end gap-3">
          <ButtonPrimary theme="red" @click="isShowEndApproving = false">
            Huỷ
          </ButtonPrimary>

          <ButtonPrimary
            theme="green"
            :loading="isLoadEndApproving"
            @click="endApproving"
          >
            Xác nhận
          </ButtonPrimary>
        </div>
      </div>
    </PopupBase>
  </GroupBase>
</template>

<script>
export default {
  props: {
    account: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isShowInfos: false,
      isLoadStartApproving: false,
      isLoadEndApproving: false,
      isShowEndApproving: false,
      approvingResult: undefined,
      endApprovingMessage: {
        success: undefined,
        error: undefined,
      },
      endApprovingResult: {
        success: undefined,
        description: undefined,
      },
    };
  },
  validations() {
    const { required } = this.$rules;
    return {
      endApprovingResult: {
        success: {
          required,
        },
      },
    };
  },
  methods: {
    async startApproving() {
      this.isLoadStartApproving = true;
      await this.$axios.$post(`account/start-approving/${this.account.id}`);
      this.isLoadStartApproving = false;
      this.$nuxt.refresh();
    },
    async endApproving() {
      this.endApprovingMessage = {
        success: undefined,
        error: undefined,
      };

      this.$v.endApprovingResult.$touch();
      if (this.$v.endApprovingResult.$invalid) {
        this.endApprovingMessage.error = 'Vui lòng kiểm tra lại thông tin.';
        return;
      }

      this.isLoadEndApproving = true;
      try {
        await this.$axios.$post(
          `account/end-approving/${this.account.id}`,
          this.endApprovingResult
        );
        this.endApprovingMessage.success = 'Phê duyệt thành công!';
        this.$nuxt.refresh();
      } catch (error) {
        this.endApprovingMessage.error = 'Thất bại vui lòng thử lại sau.';
      }
      this.isLoadEndApproving = false;
    },
  },
};
</script>
