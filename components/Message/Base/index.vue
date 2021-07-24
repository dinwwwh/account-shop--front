<template>
  <div class="space-y-3">
    <MessageBaseSuccess v-if="message.success">
      {{ message.success }}
    </MessageBaseSuccess>

    <MessageBaseInfo v-if="message.info"> {{ message.info }} </MessageBaseInfo>

    <MessageBaseWarning v-if="message.warning">
      {{ message.warning }}
    </MessageBaseWarning>

    <MessageBaseError v-if="message.error">
      {{ message.error }}
    </MessageBaseError>
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
