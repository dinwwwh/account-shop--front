<template>
  <div class="space-y-2">
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
    <div class="grid grid-cols-3 gap-6">
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
    <div class="grid grid-cols-3 gap-6">
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

    <div v-if="rule.required === true" class="space-y-2">
      <label class="block text-sm font-medium text-gray-700">
        Những người dùng không bắt buộc
      </label>
      <UserSelect v-model="rule.unrequiredUserIds" />
    </div>

    <div v-if="rule.required === false" class="space-y-2">
      <label class="block text-sm font-medium text-gray-700">
        Những người dùng bắt buộc
      </label>
      <UserSelect v-model="rule.requiredUserIds" />
    </div>

    <!-- Values -->

    <InputBase
      v-model="originalValues"
      :can-edit="canEdit"
      placeholder="Sever 1|Sever 2|Sever 3 ..."
    >
      <template #label> Giới hạn giá trị (optional) </template>
      <template #description>
        Nếu bạn sử dụng chức năng này, thì người dùng chỉ được chọn các giá trị
        trong đây. Mỗi giá trị cách nhau bởi | nếu để trống tức là không sử
        dụng. Hiện tại đang có {{ lengthOfValues }} giá trị được ghi nhận.
      </template>
    </InputBase>
  </div>
</template>

<script>
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
    originalValues: {
      get() {
        if (!this.$typeCheck('Array', this.rule.values)) {
          return '';
        }
        return this.rule.values.join('|');
      },
      set(values) {
        values = values.split('|');
        if (!values.length) {
          this.rule.values = null;
          return;
        }
        this.rule.values = values;
      },
    },
    lengthOfValues() {
      return this.rule?.values?.length ?? 0;
    },
  },
  created() {
    this.rule.requiredUserIds = this.rule.requiredUsers?.map((user) => user.id);
    this.rule.unrequiredUserIds = this.rule.unrequiredUsers?.map(
      (user) => user.id
    );
  },
};
</script>
