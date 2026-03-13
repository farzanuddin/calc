<script setup lang="ts">
import { useHaptics } from '../composables/useHaptics';
import { darkModeToggleBaseClasses } from '../ui/calculatorTheme';

const props = defineProps<{
  isDarkMode: boolean;
  themeClasses: string;
}>();

const emit = defineEmits<{
  toggle: [];
}>();

const { triggerTapHaptic } = useHaptics();

const handleToggle = () => {
  triggerTapHaptic();
  emit('toggle');
};
</script>

<template>
  <button
    @click="handleToggle"
    :title="`Switch to ${props.isDarkMode ? 'Light' : 'Dark'} mode`"
    :class="[darkModeToggleBaseClasses, props.themeClasses]"
  >
    <img
      v-if="props.isDarkMode"
      src="/sun.svg"
      alt=""
      aria-hidden="true"
      class="h-3.5 w-3.5 sm:h-3 sm:w-3"
    />
    <img
      v-else
      src="/moon.svg"
      alt=""
      aria-hidden="true"
      class="h-3.5 w-3.5 sm:h-3 sm:w-3"
    />
  </button>
</template>
