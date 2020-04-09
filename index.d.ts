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
}
