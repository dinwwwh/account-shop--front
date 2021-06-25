<template>
  <div>
    <p>
      Tài khoản:
      <span class="font-bold">{{ baseInfos.username }}</span>
    </p>
    <p>
      Game:
      <span class="font-bold">
        {{ game.name }}
        <span class="text-sm font-normal"> ({{ game.publisherName }}) </span>
      </span>
    </p>
    <p>
      Kiểu tài khoản:
      <span class="font-bold">
        {{ accountType.name }}
      </span>
    </p>
    <p>
      Role sử dụng:
      <span class="font-bold">
        {{ role.name }}
      </span>
    </p>
    <!-- Finally -->
    <p class="font-bold text-red-700">
      Số tiền bạn sẽ nhận được {{ formatNumber()(baseInfos.cost) }} VNĐ sau khi
      nick được bán thành công.
    </p>
    <div>
      <p>Giá dự định shop sẽ bán cho khách {{ formatNumber()(price) }} VNĐ</p>
      <p>
        Chú ý: giá này có thể thay đổi thay đổi theo thời gian, nhưng dù nó có
        thay đổi như nào đi nữa số tiền bạn nhận được vẫn không đổi là
        {{ formatNumber()(baseInfos.cost) }} VND
      </p>
    </div>
  </div>
</template>

<script>
import formatNumber from 'format-number';

export default {
  props: {
    game: {
      type: Object,
      required: true,
    },
    accountType: {
      type: Object,
      required: true,
    },
    role: {
      type: Object,
      required: true,
    },
    baseInfos: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      price: undefined,
    };
  },
  async created() {
    const fee = await this.calculateFee(this.baseInfos.cost);
    this.price = fee + this.baseInfos.cost;
  },
  methods: {
    async calculateFee(cost) {
      const {
        data: { result },
      } = await this.$axios.$get(
        `account-type/${this.accountType.id}/calculate-fee?cost=${cost}`
      );
      return result;
    },
    formatNumber,
  },
};
</script>
