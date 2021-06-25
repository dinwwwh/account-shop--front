<template>
  <div>
    <InputFileBase v-model="val" multiple error>
      <template #label>XIn chao</template>
    </InputFileBase>
    <InputFileBase v-model="val" />

    <pre>
      {{ val }}
    </pre>
  </div>
</template>

<script>
export default {
  data() {
    return {
      val: undefined,
    };
  },
  watch: {
    val(val) {
      console.log(this.val, this.$typeCheck('File', this.val));
      this.$axios.post('test-images', this.$withFile({ images: val }));
    },
  },
};
</script>
