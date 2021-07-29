<template>
  <div class="space-y-3">
    <MessageSimpleSuccess v-if="message.success">
      {{ message.success }}
    </MessageSimpleSuccess>

    <MessageSimpleInfo v-if="message.info">
      {{ message.info }}
    </MessageSimpleInfo>

    <MessageSimpleWarning v-if="message.warning">
      {{ message.warning }}
    </MessageSimpleWarning>

    <MessageSimpleError v-if="message.error">
      {{ message.error }}
    </MessageSimpleError>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>
