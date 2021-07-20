<template>
  <div>
    <SelectPlain
      v-model="value"
      error
      :items="[
        { a: 1, b: 'so 1' },
        { a: 2, b: 'so 2' },
      ]"
      placeholder="haha"
    >
      <template #label> This is label </template>
      <template #description> This is description </template>
    </SelectPlain>
  </div>
</template>

<script>
export default {
  layout: 'admin',
  data() {
    return {
      value: undefined,
    };
  },
};
</script>
