import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { setIntervalWithTimeout, TimeoutHandler } from './setIntervalWithTimeout';

describe('TimeoutHandler', () => {
  let handler: TimeoutHandler;

  beforeEach(() => {
    handler = new TimeoutHandler();
  });

  it('initializes with default values', () => {
    expect(handler.handler).toBe(-1);
    expect(handler.cleared).toBe(false);
  });

  it('sets and gets handler id', () => {
    const mockId = 123;
    handler.handler = mockId;
    expect(handler.handler).toBe(mockId);
  });

  it('sets cleared to true when cleared', () => {
    handler.clear();
    expect(handler.cleared).toBe(true);
  });

  it('calls clearTimeout when handler id is not -1', () => {
    const clearTimeoutSpy = vi.spyOn(global, 'clearTimeout');
    const mockId = 123;
    handler.handler = mockId;

    handler.clear();

    expect(clearTimeoutSpy).toHaveBeenCalledWith(mockId);
  });

  it('does not call clearTimeout when handler id is -1', () => {
    const clearTimeoutSpy = vi.spyOn(global, 'clearTimeout');

    handler.clear();

    expect(clearTimeoutSpy).not.toHaveBeenCalled();
  });
});

describe('setIntervalWithTimeout', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('executes callback repeatedly at specified interval', () => {
    const callback = vi.fn();

    setIntervalWithTimeout(callback, 1000);

    expect(callback).not.toHaveBeenCalled();

    vi.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(1);

    vi.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(2);

    vi.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(3);
  });

  it('provides clear function to callback', () => {
    let clearFn: (() => void) | null = null;
    const callback = vi.fn((clear) => {
      clearFn = clear;
    });

    setIntervalWithTimeout(callback, 1000);
    vi.advanceTimersByTime(1000);

    expect(callback).toHaveBeenCalledTimes(1);
    expect(typeof clearFn).toBe('function');
  });

  it('stops repeating when clear function from callback is called', () => {
    const callback = vi.fn((clear) => {
      if (callback.mock.calls.length === 2) {
        clear();
      }
    });

    setIntervalWithTimeout(callback, 1000);

    vi.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(1);

    vi.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(2);

    vi.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(2); // Should not increase
  });

  it('stops repeating when returned clear function is called', () => {
    const callback = vi.fn();

    const clearInterval = setIntervalWithTimeout(callback, 1000);

    vi.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(1);

    clearInterval();

    vi.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(1); // Should not increase
  });

  it('returns a function that can clear the interval', () => {
    const callback = vi.fn();

    const clearFn = setIntervalWithTimeout(callback, 1000);

    expect(typeof clearFn).toBe('function');
  });

  it('handles multiple intervals independently', () => {
    const callback1 = vi.fn();
    const callback2 = vi.fn();

    const clear1 = setIntervalWithTimeout(callback1, 1000);
    const clear2 = setIntervalWithTimeout(callback2, 500);

    vi.advanceTimersByTime(500);
    expect(callback1).toHaveBeenCalledTimes(0);
    expect(callback2).toHaveBeenCalledTimes(1);

    vi.advanceTimersByTime(500);
    expect(callback1).toHaveBeenCalledTimes(1);
    expect(callback2).toHaveBeenCalledTimes(2);

    clear1();

    vi.advanceTimersByTime(500);
    expect(callback1).toHaveBeenCalledTimes(1); // Should not increase
    expect(callback2).toHaveBeenCalledTimes(3);
  });

  it('callback can return values', () => {
    const callback = vi.fn(() => 'test result');

    setIntervalWithTimeout(callback, 1000);
    vi.advanceTimersByTime(1000);

    expect(callback).toHaveReturnedWith('test result');
  });
});
