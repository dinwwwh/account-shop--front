<template>
  <div class="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
    <div class="md:grid md:grid-cols-3 md:gap-6">
      <div class="md:col-span-1">
        <!-- Title -->
        <h3 class="text-lg font-medium leading-6 text-gray-900">
          <slot name="title">Thông tin game</slot>
        </h3>
        <!-- Description -->
        <p class="mt-1 text-sm text-gray-500">
          <slot name="description">...</slot>
        </p>
      </div>
      <div class="mt-5 md:mt-0 md:col-span-2 space-y-6">
        <!-- Game's name -->
        <div class="grid grid-cols-3 gap-6">
          <div class="col-span-3 sm:col-span-2">
            <InputBase
              v-model="game.name"
              placeholder="Liên Minh Huyền Thoại..."
              :can-edit="canEdit"
            >
              <template #label> Tên game </template>
              <template #description> This is a description </template>
            </InputBase>
          </div>
        </div>

        <!-- Publisher name -->
        <div class="grid grid-cols-3 gap-6">
          <div class="col-span-3 sm:col-span-2">
            <InputBase
              v-model="game.publisherName"
              placeholder="Garena ..."
              :can-edit="canEdit"
            >
              <template #label> Tên nhà phát hành </template>
              <template #description> This is a description </template>
            </InputBase>
          </div>
        </div>

        <!-- Description for game -->
        <TextareaBase
          v-model="game.description"
          placeholder="game rat la vui ..."
          :can-edit="canEdit"
        >
          <template #label> Mô tả game </template>
          <template #description> Hãy nghi những gì bạn thích. </template>
        </TextareaBase>

        <InputBaseAvatar
          v-model="game.image"
          rounded="lg"
          :image-path="game.imagePath"
          :can-edit="canEdit"
        >
          <template #label>Ảnh đại diện</template>
        </InputBaseAvatar>

        <!-- Actions -->
        <div>
          <slot name="actions"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  model: {
    prop: 'modelGame',
    event: 'input',
  },
  props: {
    modelGame: {
      type: Object,
      default() {
        return {};
      },
    },
    canEdit: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    game: {
      get() {
        return this.modelGame;
      },
      set(val) {
        this.$emit('input', val);
      },
    },
  },
};
</script>
