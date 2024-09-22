import { lastOf } from './lastOf';

type Options = {
  /**
   * @default false
   */
  clear?: boolean;
};

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
