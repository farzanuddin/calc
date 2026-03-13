/** @vitest-environment jsdom */

import { defineComponent, nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { useCalculator } from '../src/composables/useCalculator';

const pressKey = async (key: string) => {
  window.dispatchEvent(new KeyboardEvent('keydown', { key }));
  await nextTick();
};

describe('useCalculator keyboard integration', () => {
  it('maps x key to multiplication and evaluates on Enter', async () => {
    const Harness = defineComponent({
      template: '<div />',
      setup: () => useCalculator(),
    });

    const wrapper = mount(Harness);

    await pressKey('6');
    await pressKey('x');
    await pressKey('6');

    expect((wrapper.vm as any).mainDisplay).toBe('6×6');

    await pressKey('Enter');

    expect((wrapper.vm as any).mainDisplay).toBe('36');

    wrapper.unmount();
  });

  it('handles backspace over operand, then operator, without injecting 0', async () => {
    const Harness = defineComponent({
      template: '<div />',
      setup: () => useCalculator(),
    });

    const wrapper = mount(Harness);

    await pressKey('1');
    await pressKey('0');
    await pressKey('0');
    await pressKey('+');
    await pressKey('6');

    expect((wrapper.vm as any).mainDisplay).toBe('100+6');

    await pressKey('Backspace');
    expect((wrapper.vm as any).mainDisplay).toBe('100+');

    await pressKey('Backspace');
    expect((wrapper.vm as any).mainDisplay).toBe('100');

    wrapper.unmount();
  });
});
