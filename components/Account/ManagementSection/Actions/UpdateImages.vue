<template>
  <div class="space-y-6">
    <HeadingBase2 class="text-center">Cập nhật hình ảnh mô tả</HeadingBase2>

    <div class="space-y-2">
      <MessageBaseInfo>
        Mục nào không có ảnh thì sẽ sử dụng ảnh cũ không cập nhật
      </MessageBaseInfo>
      <FileInputBase v-model="rawRepresentativeImage" accept="image/*">
        <template #label>Ảnh nổi bật (một ảnh)</template>
      </FileInputBase>
      <FileInputBase v-model="rawOtherImages" multiple accept="image/*">
        <template #label>Ảnh mô tả (nhiều ảnh)</template>
      </FileInputBase>
    </div>

    <div class="space-y-3">
      <MessageBase :message="message" />
      <ButtonPrimary theme="green" :loading="loading" @click="update">
        Cập nhật
      </ButtonPrimary>
    </div>
  </div>
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
      rawRepresentativeImage: undefined,
      rawOtherImages: [],
      message: {
        error: undefined,
        success: undefined,
      },
      loading: false,
    };
  },
  methods: {
    update() {
      this.loading = true;
      this.$axios
        .$post(
          `account/${this.account.id}/images`,
          this.$withFile({
            _method: 'patch',
            representativeImage: this.rawRepresentativeImage,
            otherImages: this.rawOtherImages,
          })
        )
        .then(() => {
          this.message.error = null;
          this.message.success = 'Cập nhật thành công.';
        })
        .catch(() => {
          this.message.error = 'Cập nhật thất bại, vui lòng thử lại sau.';
          this.message.success = null;
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>
