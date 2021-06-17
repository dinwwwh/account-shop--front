<template>
  <div>
    <!-- placeholder  -->
    <div class="grid grid-cols-3 gap-6">
      <div class="col-span-3 sm:col-span-2">
        <InputBase
          v-model="rule.placeholder"
          :can-edit="canEdit"
          placeholder="Chính là cái dòng bạn đang đọc nè"
        >
          <template #label> Placeholder </template>
        </InputBase>
      </div>
    </div>

    <!-- datatype -->
    <div class="grid grid-cols-3 gap-6 mb-20">
      <div class="col-span-3 sm:col-span-2">
        <SelectBase
          v-model="rule.datatype"
          :options="datatypeOptions"
          display-key="name"
          value-key="datatype"
        >
          <template #label> Kiểu dữ liệu </template>
        </SelectBase>
      </div>
    </div>

    <!-- required -->
    <div class="grid grid-cols-3 gap-6 mb-20">
      <div class="col-span-3 sm:col-span-2">
        <SelectBase
          v-model="rule.required"
          :options="requiredOptions"
          display-key="name"
          value-key="value"
        >
          <template #label> Bắt buộc hay không ? </template>
        </SelectBase>
      </div>
    </div>

    <!-- Required role keys -->
    <div v-if="rule.required === null" class="space-y-3">
      <HeadingBase6>Chọn role bắt buộc điền thông tin</HeadingBase6>
      <SelectModernMultiple
        v-model="rule.requiredRoleKeys"
        :options="originalRoles"
        display-key="name"
        value-key="key"
      />
    </div>
  </div>
</template>

<script>
// 'multiple',
// 'min',
// 'max',
// 'values'
export default {
  model: {
    prop: 'modelRule',
    event: 'input',
  },
  props: {
    modelRule: {
      type: Object,
      required: true,
    },
    canEdit: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      originalRoles: [],
      datatypeOptions: [
        {
          datatype: 'string',
          name: 'Kiểu chuỗi, ký tự.',
        },
        {
          datatype: 'integer',
          name: 'Kiểu số nguyên.',
        },
      ],
      requiredOptions: [
        {
          name: 'Bắt buộc',
          value: true,
        },
        {
          name: 'Không bắt buộc',
          value: false,
        },
        {
          name: 'Tuỳ theo role',
          value: null,
        },
      ],
    };
  },
  async fetch() {
    this.originalRoles = (await this.$axios.$get('role')).data;
  },
  computed: {
    rule: {
      get() {
        return this.modelRule;
      },
      set(val) {
        this.$emit('input', val);
      },
    },
  },
  watch: {
    modelRule() {
      this.rule.requiredRoleKeys = this.rule.requiredRoles?.map(
        (role) => role.key
      );
    },
  },
  created() {
    this.rule.requiredRoleKeys = this.rule.requiredRoles?.map(
      (role) => role.key
    );
  },
};
</script>
