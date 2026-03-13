<script setup lang="ts">
import { nextTick, onMounted, ref, watch } from 'vue';

const props = defineProps<{
  display: string;
  frameClasses: string[];
  isDarkMode: boolean;
}>();

const displayScrollerRef = ref<HTMLElement | null>(null);

const scrollToLatest = () => {
  const scroller = displayScrollerRef.value;
  if (!scroller) return;

  scroller.scrollLeft = scroller.scrollWidth;
};

watch(
  () => props.display,
  async () => {
    await nextTick();
    scrollToLatest();
  }
);

onMounted(scrollToLatest);

const displayTextClasses =
  'text-[clamp(30px,10vw,48px)] sm:text-[clamp(24px,6vw,40px)] tracking-[0.04em]';
</script>

<template>
  <div :class="frameClasses">
    <div
      ref="displayScrollerRef"
      :class="[
        'rounded-[9px] border-[3px] flex items-center px-3 py-2.5 sm:px-2.5 sm:py-2 overflow-x-auto overflow-y-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden min-h-[88px] sm:min-h-[70px]',
        props.isDarkMode
          ? 'bg-[#7f9d7a] border-[#748073]'
          : 'bg-[var(--color-display-screen)] border-[var(--color-display-screen-border)]',
      ]"
    >
      <div
        :class="[
          'inline-block min-w-full whitespace-nowrap text-right text-[var(--color-display-screen-text)] leading-none [font-family:var(--font-calc-display)] select-none',
          displayTextClasses,
        ]"
      >
        {{ display }}
      </div>
    </div>
  </div>
</template>
