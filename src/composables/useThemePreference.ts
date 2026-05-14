import { onMounted, ref } from 'vue';

const themeStorageKey = 'calc-theme';

const applyTheme = (dark: boolean) => {
  document.documentElement.dataset.theme = dark ? 'dark' : 'light';
};

export const useThemePreference = () => {
  const isDarkMode = ref(false);

  const toggleDarkMode = () => {
    isDarkMode.value = !isDarkMode.value;
    const theme = isDarkMode.value ? 'dark' : 'light';
    localStorage.setItem(themeStorageKey, theme);
    applyTheme(isDarkMode.value);
  };

  onMounted(() => {
    const savedTheme = localStorage.getItem(themeStorageKey);

    if (savedTheme === 'dark') {
      isDarkMode.value = true;
      applyTheme(true);
      return;
    }

    if (savedTheme === 'light') {
      isDarkMode.value = false;
      applyTheme(false);
      return;
    }

    const prefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;
    isDarkMode.value = prefersDark;
    applyTheme(prefersDark);
  });

  return {
    isDarkMode,
    toggleDarkMode,
  };
};
