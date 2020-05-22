declare module 'overlooker-element-timing' {
  export type EntryImage = {
    type: 'image-paint',
    name: string,
    view: {
      visiblePercent: number,
      height: number,
      width: number
    },
    timings: {
      fetchStart: number,
      loadComplete: number,
      loadAndAssociated: number,
      render: number,
      duration: number
    }
  };

  export type EntryText = {
    type: 'text-paint',
    name: string,
    view: {
      visiblePercent: number,
      height: number,
      width: number
    },
    timings: {
      render: number
    }
  };

  export type Entry = EntryImage | EntryText;

  export default class OverlookerElementTiming {
    constructor(propName?: string, wnd?: Window);

    push(...entries: Array<PerformanceEntry>);

    getAll(): Array<Entry>;

    clear();

    observe(cb: Function, buffered: boolean);

    unobserve(cb: Function);
  }
}
