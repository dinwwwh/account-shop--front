<template>
  <div class="space-y-3">
    <MessageBaseSuccess v-if="message.success">
      {{ message.success }}
    </MessageBaseSuccess>

    <MessageBaseError v-if="message.error">
      {{ message.error }}
    </MessageBaseError>

    <MessageBaseWarning v-if="message.warning">
      {{ message.warning }}
    </MessageBaseWarning>

    <MessageBaseInfo v-if="message.info"> {{ message.info }} </MessageBaseInfo>
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
