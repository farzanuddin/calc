<script setup lang="ts">
import { nextTick, onMounted, ref, watch } from 'vue';

const props = defineProps<{
  display: string;
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
</script>

<template>
  <div class="rounded-[10px] p-2.5 mb-3 bg-(--color-display-frame) shadow-(--shadow-display-frame)">
    <div
      ref="displayScrollerRef"
      class="rounded-[9px] border-[3px] flex items-center px-3 py-2.5 sm:px-2.5 sm:py-2 overflow-x-auto overflow-y-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden min-h-22 sm:min-h-17.5 bg-(--color-display-screen-bg) border-(--color-display-screen-inner-border)"
    >
      <div class="inline-block min-w-full whitespace-nowrap text-right text-(--color-display-screen-text) leading-none [font-family:var(--font-calc-display)] select-none text-[clamp(30px,10vw,48px)] sm:text-[clamp(24px,6vw,40px)] tracking-[0.04em]">
        {{ display }}
      </div>
    </div>
  </div>
</template>
