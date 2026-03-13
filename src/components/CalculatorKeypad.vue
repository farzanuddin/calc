<script setup lang="ts">
import { useHaptics } from '../composables/useHaptics';
import type { DecoratedButton } from '../types/calculator-ui';

const props = defineProps<{
  buttons: DecoratedButton[];
}>();

const emit = defineEmits<{
  press: [button: DecoratedButton];
}>();

const { triggerTapHaptic } = useHaptics();

const handlePress = (button: DecoratedButton) => {
  triggerTapHaptic();
  emit('press', button);
};
</script>

<template>
  <div class="grid flex-1 grid-cols-4 auto-rows-fr gap-2">
    <button
      v-for="btn in props.buttons"
      :key="btn.label"
      :class="btn.classes"
      @click="handlePress(btn)"
    >
      {{ btn.label }}
    </button>
  </div>
</template>
