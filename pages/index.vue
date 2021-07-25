<template>
  <div>
    <GroupBase>
      <FileInputBase v-model="value" multiple error>
        <template #label> Lable </template>
        <template #description> this is description </template>
      </FileInputBase>
    </GroupBase>
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
