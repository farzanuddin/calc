<script setup lang="ts">
import CalculatorDisplay from './components/CalculatorDisplay.vue';
import CalculatorKeypad from './components/CalculatorKeypad.vue';
import ThemeToggle from './components/ThemeToggle.vue';
import { useCalculator } from './composables/useCalculator';
import { decoratedButtons } from './composables/useDecoratedButtons';
import { useThemePreference } from './composables/useThemePreference';

const { mainDisplay, handleClick } = useCalculator();
const { isDarkMode, toggleDarkMode } = useThemePreference();
</script>

<template>
  <div
    class="min-h-dvh flex items-stretch justify-center p-4 sm:min-h-screen sm:items-center sm:p-3.5 transition-colors duration-200 bg-(--color-app-surface)"
  >
    <div
      class="w-full max-w-[min(100vw-2rem,28rem)] h-[calc(100dvh-2rem)] flex flex-col sm:max-w-90 sm:h-auto"
    >
      <div class="mb-2 flex justify-end">
        <ThemeToggle
          :isDarkMode="isDarkMode"
          @toggle="toggleDarkMode"
        />
      </div>

      <div
        class="w-full overflow-hidden shadow-(--shadow-calculator-shell) flex-1 sm:flex-none"
      >
        <div class="p-3.5 h-full flex flex-col bg-(--color-calculator-body)">
          <CalculatorDisplay :display="mainDisplay" />
          <CalculatorKeypad :buttons="decoratedButtons" @press="handleClick" />
        </div>
      </div>

      <p
        class="mt-2 text-center text-[10px] select-none"
        :class="isDarkMode ? 'text-white/30' : 'text-black/30'"
      >
        &copy; {{ new Date().getFullYear() }}
        <a
          href="https://github.com/farzanuddin"
          target="_blank"
          rel="noopener noreferrer"
          class="font-semibold hover:opacity-70 transition-opacity duration-150"
          :class="isDarkMode ? 'text-white/30' : 'text-black/30'"
        >
          Farzan Uddin
        </a>
      </p>
    </div>
  </div>
</template>
