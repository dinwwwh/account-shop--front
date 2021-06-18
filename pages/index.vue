<template>
  <div>
    <TextareaBase v-model="val"></TextareaBase>
  </div>
</template>

<script>
export default {
  data() {
    return {
      val: undefined,
    };
  },
};
</script>
