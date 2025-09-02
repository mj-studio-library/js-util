import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { createTimer } from './Timer';

describe('createTimer', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('creates timer object with timeout and clear methods', () => {
    const timer = createTimer();

    expect(timer).toHaveProperty('timeout');
    expect(timer).toHaveProperty('clear');
    expect(typeof timer.timeout).toBe('function');
    expect(typeof timer.clear).toBe('function');
  });

  it('executes timeout function after specified duration', () => {
    const timer = createTimer();
    const callback = vi.fn();

    timer.timeout(callback, 1000);

    expect(callback).not.toHaveBeenCalled();

    vi.advanceTimersByTime(1000);

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('supports multiple timeouts', () => {
    const timer = createTimer();
    const callback1 = vi.fn();
    const callback2 = vi.fn();

    timer.timeout(callback1, 1000);
    timer.timeout(callback2, 2000);

    vi.advanceTimersByTime(1000);
    expect(callback1).toHaveBeenCalledTimes(1);
    expect(callback2).not.toHaveBeenCalled();

    vi.advanceTimersByTime(1000);
    expect(callback2).toHaveBeenCalledTimes(1);
  });

  it('clears all timeouts when clear() is called', () => {
    const timer = createTimer();
    const callback1 = vi.fn();
    const callback2 = vi.fn();

    timer.timeout(callback1, 1000);
    timer.timeout(callback2, 2000);

    timer.clear();

    vi.advanceTimersByTime(3000);

    expect(callback1).not.toHaveBeenCalled();
    expect(callback2).not.toHaveBeenCalled();
  });

  it('clears previous timeouts when clear option is true', () => {
    const timer = createTimer();
    const callback1 = vi.fn();
    const callback2 = vi.fn();

    timer.timeout(callback1, 1000);
    timer.timeout(callback2, 2000, { clear: true });

    vi.advanceTimersByTime(3000);

    expect(callback1).not.toHaveBeenCalled();
    expect(callback2).toHaveBeenCalledTimes(1);
  });

  it('does not clear previous timeouts by default', () => {
    const timer = createTimer();
    const callback1 = vi.fn();
    const callback2 = vi.fn();

    timer.timeout(callback1, 1000);
    timer.timeout(callback2, 2000);

    vi.advanceTimersByTime(3000);

    expect(callback1).toHaveBeenCalledTimes(1);
    expect(callback2).toHaveBeenCalledTimes(1);
  });

  it('returns a function that clears the specific timeout', () => {
    const timer = createTimer();
    const callback = vi.fn();

    const clearSpecific = timer.timeout(callback, 1000);

    expect(typeof clearSpecific).toBe('function');

    clearSpecific();

    vi.advanceTimersByTime(1000);

    expect(callback).not.toHaveBeenCalled();
  });

  it('handles multiple timers independently', () => {
    const timer1 = createTimer();
    const timer2 = createTimer();
    const callback1 = vi.fn();
    const callback2 = vi.fn();

    timer1.timeout(callback1, 1000);
    timer2.timeout(callback2, 1000);

    timer1.clear();

    vi.advanceTimersByTime(1000);

    expect(callback1).not.toHaveBeenCalled();
    expect(callback2).toHaveBeenCalledTimes(1);
  });

  it('handles zero duration timeout', () => {
    const timer = createTimer();
    const callback = vi.fn();

    timer.timeout(callback, 0);

    vi.advanceTimersByTime(0);

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('handles callback with return value', () => {
    const timer = createTimer();
    const callback = vi.fn(() => 'test result');

    timer.timeout(callback, 1000);

    vi.advanceTimersByTime(1000);

    expect(callback).toHaveReturnedWith('test result');
  });

  it('handles callback that throws error', () => {
    const timer = createTimer();
    const callback = vi.fn(() => {
      throw new Error('Test error');
    });

    timer.timeout(callback, 1000);

    expect(() => {
      vi.advanceTimersByTime(1000);
    }).toThrow('Test error');
  });

  it('clears correctly when multiple timeouts with different durations', () => {
    const timer = createTimer();
    const callbacks = [vi.fn(), vi.fn(), vi.fn()];

    timer.timeout(callbacks[0], 500);
    timer.timeout(callbacks[1], 1000);
    timer.timeout(callbacks[2], 1500);

    vi.advanceTimersByTime(750); // First callback executed
    expect(callbacks[0]).toHaveBeenCalledTimes(1);

    timer.clear(); // Clear remaining timeouts

    vi.advanceTimersByTime(1000); // Advance past all original timeouts

    expect(callbacks[1]).not.toHaveBeenCalled();
    expect(callbacks[2]).not.toHaveBeenCalled();
  });

  it('handles clear option with explicit false value', () => {
    const timer = createTimer();
    const callback1 = vi.fn();
    const callback2 = vi.fn();

    timer.timeout(callback1, 1000);
    timer.timeout(callback2, 2000, { clear: false });

    vi.advanceTimersByTime(3000);

    expect(callback1).toHaveBeenCalledTimes(1);
    expect(callback2).toHaveBeenCalledTimes(1);
  });

  it('individual timeout clear clears the last timeout (limitation of current implementation)', () => {
    const timer = createTimer();
    const callback1 = vi.fn();
    const callback2 = vi.fn();

    timer.timeout(callback1, 1000);

    const clear2 = timer.timeout(callback2, 1000);

    clear2(); // This clears the last timeout (callback2)

    vi.advanceTimersByTime(1000);

    expect(callback1).toHaveBeenCalledTimes(1);
    expect(callback2).not.toHaveBeenCalled();
  });
});
