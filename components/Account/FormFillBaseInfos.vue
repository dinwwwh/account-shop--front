<template>
  <div class="space-y-4">
    <!-- User name -->
    <div>
      <InputBase
        v-model="account.username"
        placeholder="test@gmail.com, 0379293599, ..."
        :error="$v.account.username.$error"
      >
        <template #label> Tài khoản đăng nhập </template>
        <template #description>
          {{ $getValidatorErrorMessage($v.account.username) }}
        </template>
      </InputBase>
    </div>
    <!-- Password -->
    <InputBase
      v-model="account.password"
      type="password"
      placeholder="123456789"
      :error="$v.account.password.$error"
    >
      <template #label> Mật khẩu đăng nhập </template>
      <template #description>
        {{ $getValidatorErrorMessage($v.account.password) }}
      </template>
    </InputBase>
    <!-- Cost -->
    <InputBase
      v-model.number="account.cost"
      type="number"
      placeholder="99000"
      :error="$v.account.cost.$error"
    >
      <template #label> Giá tiền (VND) </template>
      <template #description>
        <template v-if="$v.account.cost.$error">
          {{ $getValidatorErrorMessage($v.account.cost) }}
        </template>
        <template v-else class="space-y-2">
          <p class="text-blue-900 font-bold">
            Giá nick được tính theo hình thức ATM, MOMO,... (khồng phải thẻ
            cào).
          </p>
          <p class="text-indigo-900">
            Sau khi nick được bán thành công bạn sẽ nhận được
            {{ formatNumber()(account.cost) }} VND vào tài khoản shop của bạn.
            Số tiền đó tương đương với số dư ATM, MOMO,... và bạn có thể rút ra
            bất cứ lúc nào.
          </p>
          <p>
            Đây là giá tiền cơ bản của nick. Tức là đây chỉ là số tiền bạn nhận
            được sau khi nick đã bán. Nhưng shop bán cho khách thì phải đội thêm
            một số chi phí khác.
          </p>
        </template>
      </template>
    </InputBase>
    <!-- Description -->
    <TextareaBase
      v-model="account.description"
      placeholder="Acc siêu cấp vip pro, PK thì cả sever phải gọi là cụ ..."
    >
      <template #label> Mô tả nick của bạn </template>
      <template #description>
        Những thông tin này có thể giúp nick bạn gây chú ý hơn. Nhưng đừng ghi
        những thứ sai sự thật.
      </template>
    </TextareaBase>
    <!-- Representative image -->
    <InputFileBase
      v-model="account.representativeImage"
      accept="image/*"
      :error="$v.account.representativeImage.$error"
    >
      <template #label> Ảnh đại diện </template>
      <template #description>
        {{
          $getValidatorErrorMessage($v.account.representativeImage) ||
          `Hãy chọn bức ảnh đẹp nhất, nổi bật nhất của bạn. Hình ảnh này sẽ được
            hiện thị ưu tiên.`
        }}
      </template>
    </InputFileBase>
    <!-- other images -->
    <InputFileBase v-model="account.images" accept="image/*" multiple>
      <template #label> Những ảnh mô tả </template>
      <template #description>
        Những bức ảnh mô tả được chi tiết nick của bạn. Nhưng hãy hạn chế những
        hình ảnh dư thừa, không tác dụng.
      </template>
    </InputFileBase>
  </div>
</template>

<script>
import formatNumber from 'format-number';

export default {
  model: {
    prop: 'model',
    event: 'input',
  },
  props: {
    model: {
      type: Object,
      required: true,
    },
    isRequiredRepresentativeImage: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    account: {
      get() {
        return this.model;
      },
      set(val) {
        this.$emit('input', val);
      },
    },
    panel() {
      return {
        check: () => {
          const result = {
            isInvalid: false,
            isPending: false,
          };
          this.$v.$touch();
          if (this.$v.$invalid) result.isInvalid = true;
          if (this.$v.$pending) result.isPending = true;
          return result;
        },
      };
    },
  },
  validations() {
    const { required } = this.$vuelidate.validators;
    const representativeImage = {};

    if (this.isRequiredRepresentativeImage) {
      representativeImage.required = required;
    }

    return {
      account: {
        username: { required },
        password: { required },
        cost: { required },
        representativeImage,
      },
    };
  },
  created() {
    this.$emit('emit-panel', this.panel);
  },
  methods: {
    formatNumber,
  },
};
</script>
