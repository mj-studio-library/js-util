/**
 * Handles timeout clearing and state management
 */
export class TimeoutHandler {
  private handlerRef: { id: any } = { id: -1 };
  cleared = false;

  get handler(): any {
    return this.handlerRef.id;
  }

  set handler(n: any) {
    this.handlerRef.id = n;
  }

  clear() {
    this.cleared = true;
    if (this.handlerRef.id !== -1) {
      clearTimeout(this.handlerRef.id as any);
    }
  }
}

/**
 * Creates a repeating timeout that can be cleared from within the callback
 *
 * @param callback - Function to execute at each interval, receives clear function
 * @param intervalMs - Interval duration in milliseconds
 * @returns Function to clear the interval
 *
 * @example
 * const stop = setIntervalWithTimeout((clear) => {
 *   console.log('Running...')
 *   if (someCondition) clear()
 * }, 1000)
 *
 * @example
 * const stop = setIntervalWithTimeout(() => {
 *   console.log('Repeating task')
 * }, 2000)
 * setTimeout(stop, 10000) // Stop after 10 seconds
 */
export function setIntervalWithTimeout(
  callback: (clear: () => void) => any,
  intervalMs: number,
): () => void {
  const handleWrapper = new TimeoutHandler();

  const timeout = () => {
    handleWrapper.handler = setTimeout(() => {
      callback(() => {
        handleWrapper.clear();
      });

      if (!handleWrapper.cleared) {
        timeout();
      }
    }, intervalMs);
  };
  timeout();

  return () => {
    handleWrapper.clear();
  };
}
