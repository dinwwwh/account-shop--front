<template>
  <div class="space-y-6 px-2">
    <HeadingBase2 class="text-center">
      Cập nhật thông tin tài khoản
    </HeadingBase2>

    <GameInfoFormFillSelfs
      v-model="rawGameInfos"
      :game-infos="account.accountType.game.gameInfos"
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
          typeCheck('Array', account.gameInfos) &&
          typeCheck('Array', account.accountType?.game?.gameInfos)
        );
      },
    },
  },
  data() {
    return {
      rawGameInfos: {},
      message: {
        error: undefined,
        success: undefined,
      },
      loading: false,
      panel: undefined,
    };
  },
  created() {
    this.account.gameInfos.forEach((gameInfo) => {
      this.rawGameInfos[gameInfo.id] = { values: gameInfo.pivot.values };
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

        const rawGameInfos = {};
        for (const key in this.rawGameInfos) {
          if (this.rawGameInfos[key]?.values?.every((e) => e)) {
            rawGameInfos[key] = this.rawGameInfos[key];
          }
        }

        try {
          await this.$axios.$patch(`account/${this.account.id}/game-infos`, {
            rawGameInfos,
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
