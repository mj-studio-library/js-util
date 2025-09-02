import { lastOf } from './lastOf';

type Options = {
  /**
   * @default false
   */
  clear?: boolean;
};

/**
 * Creates a timer utility that manages multiple timeouts with optional clearing
 *
 * @returns Timer object with timeout and clear methods
 *
 * @example
 * const timer = createTimer()
 * timer.timeout(() => console.log('Hello'), 1000)
 * timer.clear() // Clears all timeouts
 *
 * @example
 * const timer = createTimer()
 * timer.timeout(() => console.log('First'), 1000)
 * timer.timeout(() => console.log('Second'), 2000, { clear: true }) // Clears previous timeouts
 */
export function createTimer() {
  const handlers: any[] = [];

  const clear = () => {
    handlers.forEach(clearTimeout);
  };

  return {
    clear,
    timeout: (
      fn: () => void,
      duration: number,
      { clear: clearOtherTimers }: Options = { clear: false },
    ) => {
      if (clearOtherTimers) {
        clear();
      }

      handlers.push(setTimeout(fn, duration));

      return () => clearTimeout(lastOf(handlers));
    },
  };
}
