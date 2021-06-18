<template>
  <FrameBox>
    <GameInfoForm v-model="gameInfo">
      <template #actions>
        <div class="flex flex-row-reverse gap-4 items-center">
          <ButtonPrimary @click="create"> Tạo </ButtonPrimary>
          <NuxtLink
            v-if="createdGameInfo"
            :to="{
              name: 'game-info-id',
              params: { id: createdGameInfo.id },
            }"
          >
            <ButtonPrimary> Truy cập </ButtonPrimary>
          </NuxtLink>
          <p
            class="text-sm"
            :class="{
              'text-green-500': !message.error,
              'text-red-500': message.error,
            }"
          >
            {{ message.error || message.success }}
          </p>
        </div>
      </template>
    </GameInfoForm>
  </FrameBox>
</template>

<script>
export default {
  layout: 'admin',
  async middleware({ $auth, error, params }) {
    if (!(await $auth.can('create', `AccountType,Game:${params.id}`))) {
      return error(403);
    }
  },
  data() {
    return {
      gameInfo: {
        rule: {},
      },
      message: {
        error: undefined,
        success: undefined,
      },
      createdGameInfo: undefined,
    };
  },
  methods: {
    create() {
      this.$axios
        .$post(`game-info/${this.$route.params.id}`, this.gameInfo)
        .then(({ data }) => {
          this.message.error = null;
          this.message.success = 'Thành công!!';
          this.createdGameInfo = data;
        })
        .catch(() => {
          this.message.error = 'Thất bại :((';
          this.message.success = null;
        });
    },
  },
};
</script>
