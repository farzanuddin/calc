export const useHaptics = () => {
  const triggerTapHaptic = () => {
    if (
      typeof navigator === 'undefined' ||
      typeof navigator.vibrate !== 'function'
    ) {
      return;
    }

    navigator.vibrate(10);
  };

  return {
    triggerTapHaptic,
  };
};
