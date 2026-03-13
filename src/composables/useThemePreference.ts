import { computed, onMounted, ref } from 'vue';
import { themeClasses } from '../ui/calculatorTheme';
import type { ThemeName } from '../types/calculator-ui';

const themeStorageKey = 'calc-theme';

export const useThemePreference = () => {
  const isDarkMode = ref(false);

  const themeName = computed<ThemeName>(() =>
    isDarkMode.value ? 'dark' : 'light'
  );

  const currentTheme = computed(() => themeClasses[themeName.value]);

  const toggleDarkMode = () => {
    isDarkMode.value = !isDarkMode.value;
    localStorage.setItem(themeStorageKey, isDarkMode.value ? 'dark' : 'light');
  };

  onMounted(() => {
    const savedTheme = localStorage.getItem(themeStorageKey);

    if (savedTheme === 'dark') {
      isDarkMode.value = true;
      return;
    }

    if (savedTheme === 'light') {
      isDarkMode.value = false;
      return;
    }

    isDarkMode.value = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;
  });

  return {
    isDarkMode,
    currentTheme,
    toggleDarkMode,
  };
};
