<template>
  <!-- This example requires Tailwind CSS v2.0+ -->
  <nav aria-label="Progress">
    <ol class="flex items-center">
      <li v-for="step in lastStep" :key="step">
        <template v-if="step === currentStep">
          <StepsCirclesCurrentStep
            :class="{ 'pr-8 sm:pr-20': !(step === lastStep) }"
          />
        </template>
        <template v-else-if="step < currentStep">
          <StepsCirclesCompletedStep
            :class="{ 'pr-8 sm:pr-20': !(step === lastStep) }"
          />
        </template>
        <template v-else>
          <StepsCirclesUpcomingStep
            :class="{ 'pr-8 sm:pr-20': !(step === lastStep) }"
          />
        </template>
      </li>
    </ol>
  </nav>
</template>

<script>
export default {
  props: {
    lastStep: {
      type: Number,
      required: true,
      default: 3,
    },
    currentStep: {
      type: Number,
      required: true,
      default: 2,
    },
  },
};
</script>
