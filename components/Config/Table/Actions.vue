<template>
  <div>
    <ButtonPrimary
      v-if="config.canUpdate"
      size="xs"
      @click="isShowUpdate = true"
    >
      Sửa
    </ButtonPrimary>

    <!-- Update screen -->
    <PopupBase v-model="isShowUpdate">
      <div class="space-y-4">
        <HeadingBase3 class="text-center">{{ config.key }}</HeadingBase3>

        <div>
          <HeadingBase5> Cấu trúc dữ liệu </HeadingBase5>
          <p class="text-gray-500">{{ config.structureDescription }}</p>
        </div>

        <TextareaBase
          v-model="newConfig.data"
          :error="$v.newConfig.data.$error"
        >
          <template #label> Dữ liệu </template>
          <template #description>
            {{
              $getValidatorErrorMessage($v.newConfig.data) ||
              'Phải tuân thủ theo cú pháp JSON và cấu trúc dữ liệu.'
            }}
          </template>
        </TextareaBase>

        <TextareaBase v-model="newConfig.description">
          <template #label> Mô tả (optional) </template>
        </TextareaBase>

        <MessageBase :message="message" />

        <div class="flex justify-end gap-3">
          <ButtonPrimary theme="red" @click="isShowUpdate = false">
            Huỷ
          </ButtonPrimary>
          <ButtonPrimary theme="green" :loading="isLoading" @click="update">
            Cập nhật
          </ButtonPrimary>
        </div>
      </div>
    </PopupBase>
  </div>
</template>

<script>
export default {
  props: {
    config: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isShowUpdate: false,
      newConfig: {
        data: JSON.stringify(this.config.data),
        description: this.config.description,
      },
      message: {
        success: undefined,
        error: undefined,
      },
      isLoading: false,
    };
  },
  validations() {
    const { json, required } = this.$rules;
    return {
      newConfig: {
        data: {
          required,
          json,
        },
      },
    };
  },
  methods: {
    async update() {
      this.message = {
        error: undefined,
        success: undefined,
      };

      this.$v.newConfig.$touch();
      if (this.$v.newConfig.$invalid) {
        this.message.error = 'Vui lòng kiểm tra lại thông tin.';
        return;
      }

      try {
        this.isLoading = true;
        await this.$axios.$put(`config/${this.config.key}`, {
          data: JSON.parse(this.newConfig.data),
          description: this.newConfig.description,
        });
        this.message.success = 'Cập nhật thành công.';
      } catch (error) {
        this.message.error = 'Thất bại vui lòng thử lại sau.';
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>
