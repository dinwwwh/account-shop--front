<template>
  <div class="space-y-6 px-2">
    <HeadingBase2 class="text-center"> Cập nhật thông tin game </HeadingBase2>

    <AccountInfoFormFillSelfs
      v-model="rawAccountInfos"
      :account-infos="account.accountType.accountInfos"
      @emit-panel="panel = $event"
    />

    <!-- Action -->
    <div class="space-y-2">
      <MessageBase :message="message" />

      <ButtonPrimary theme="green" :loading="loading" @click="update">
        Cập nhật
      </ButtonPrimary>
    </div>
  </div>
</template>

<script>
import { typeCheck } from 'type-check';

export default {
  props: {
    account: {
      type: Object,
      required: true,
      validator(account) {
        return (
          typeCheck('Array', account.accountInfos) &&
          typeCheck('Array', account.accountType?.accountInfos)
        );
      },
    },
  },
  data() {
    return {
      rawAccountInfos: {},
      message: {
        error: undefined,
        success: undefined,
      },
      loading: false,
      panel: undefined,
    };
  },
  created() {
    this.account.accountInfos.forEach((accountInfo) => {
      this.rawAccountInfos[accountInfo.id] = {
        values: accountInfo.pivot.values,
      };
    });
  },
  methods: {
    async update() {
      this.message.error = null;
      this.message.success = null;
      if (this.panel.check().isInvalid) {
        this.message.error = 'Vui lòng kiểm tra lại thông tin.';
      } else {
        this.loading = true;

        const rawAccountInfos = {};
        for (const key in this.rawAccountInfos) {
          if (this.rawAccountInfos[key]?.values?.every((e) => e)) {
            rawAccountInfos[key] = this.rawAccountInfos[key];
          }
        }

        try {
          await this.$axios.$patch(`account/${this.account.id}/account-infos`, {
            rawAccountInfos,
          });
          this.message.success = 'Cập nhật thành công';
        } catch (e) {
          this.message.error = 'Thất bại, vui lòng thử lại sau.';
        }
      }

      this.loading = false;
    },
  },
};
</script>
