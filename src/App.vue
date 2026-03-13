<script setup lang="ts">
import { computed } from 'vue';
import CalculatorDisplay from './components/CalculatorDisplay.vue';
import CalculatorKeypad from './components/CalculatorKeypad.vue';
import ThemeToggle from './components/ThemeToggle.vue';
import { useCalculator } from './composables/useCalculator';
import { useDecoratedButtons } from './composables/useDecoratedButtons';
import { useThemePreference } from './composables/useThemePreference';

const { mainDisplay, handleClick } = useCalculator();
const { isDarkMode, currentTheme, toggleDarkMode } = useThemePreference();
const { decoratedButtons } = useDecoratedButtons(currentTheme);

const currentYear = new Date().getFullYear();

const appClasses = computed(() => [
  'min-h-dvh flex items-stretch justify-center p-4 sm:min-h-screen sm:items-center sm:p-3.5 transition-colors duration-200',
  currentTheme.value.app,
]);

const shellClasses = computed(() => [
  'w-full overflow-hidden shadow-[var(--shadow-calculator-shell)] flex-1 sm:flex-none',
  currentTheme.value.shell,
]);

const bodyClasses = computed(() => [
  'p-3.5 h-full flex flex-col',
  currentTheme.value.body,
]);

const displayFrameClasses = computed(() => [
  'rounded-[10px] p-2.5 mb-3',
  currentTheme.value.displayFrame,
]);

const toggleButtonClasses = computed(() => currentTheme.value.toggle);

const copyrightClasses = computed(() =>
  isDarkMode.value ? 'text-white/30' : 'text-black/30'
);
</script>

<template>
  <div :class="appClasses">
    <div
      class="w-full max-w-[min(100vw-2rem,28rem)] h-[calc(100dvh-2rem)] flex flex-col sm:max-w-[360px] sm:h-auto"
    >
      <div class="mb-2 flex justify-end">
        <ThemeToggle
          :isDarkMode="isDarkMode"
          :themeClasses="toggleButtonClasses"
          @toggle="toggleDarkMode"
        />
      </div>

      <div :class="shellClasses">
        <div :class="bodyClasses">
          <CalculatorDisplay
            :display="mainDisplay"
            :frameClasses="displayFrameClasses"
            :isDarkMode="isDarkMode"
          />
          <CalculatorKeypad :buttons="decoratedButtons" @press="handleClick" />
        </div>
      </div>

      <p
        :class="['mt-2 text-center text-[10px] select-none', copyrightClasses]"
      >
        &copy; {{ currentYear }}
        <a
          href="https://github.com/farzanuddin"
          target="_blank"
          rel="noopener noreferrer"
          :class="[
            'font-semibold hover:opacity-70 transition-opacity duration-150',
            copyrightClasses,
          ]"
        >
          Farzan Uddin
        </a>
      </p>
    </div>
  </div>
</template>
