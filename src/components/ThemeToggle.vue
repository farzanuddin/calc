<script setup lang="ts">
import { computed } from 'vue';
import { triggerTapHaptic } from '../composables/useHaptics';
import { darkModeToggleBaseClasses } from '../ui/calculatorTheme';

const props = defineProps<{
  isDarkMode: boolean;
}>();

const emit = defineEmits<{
  toggle: [];
}>();

const iconSrc = computed(() => (props.isDarkMode ? '/sun.svg' : '/moon.svg'));

const handleToggle = () => {
  triggerTapHaptic();
  emit('toggle');
};
</script>

<template>
  <button
    @click="handleToggle"
    :title="`Switch to ${props.isDarkMode ? 'Light' : 'Dark'} mode`"
    :class="[
      darkModeToggleBaseClasses,
      'border-(--color-toggle-border) bg-(--color-toggle-bg) text-(--color-toggle-text) shadow-(--shadow-toggle)',
    ]"
  >
    <img
      :src="iconSrc"
      alt=""
      aria-hidden="true"
      class="h-3.5 w-3.5 sm:h-3 sm:w-3"
    />
  </button>
</template>
