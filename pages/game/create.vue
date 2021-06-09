<template>
  <!-- This is detail game page -->
  <div>
    <FrameBox>
      <GameForm :game="game">
        <template #title> Thông tin game </template>
        <template #description> this is description </template>
        <template #actions>
          <div class="flex flex-row-reverse">
            <ButtonPrimary>Thêm mới</ButtonPrimary>
          </div>
        </template>
      </GameForm>
    </FrameBox>
  </div>
</template>

<script>
export default {
  layout: 'admin',
  data() {
    return {
      game: {},
    };
  },
};
</script>
