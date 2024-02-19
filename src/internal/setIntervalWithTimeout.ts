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
    clearTimeout(this.handlerRef.id as any);
  }
}

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
