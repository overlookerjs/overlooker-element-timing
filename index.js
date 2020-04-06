export default class OverlookerElementTiming {
  constructor() {
    this.observers = [];
    this.timings = [];

    if (!window.oet) {
      window.oet = [];
    }

    if (!(window.oet instanceof OverlookerElementTiming)) {
      window.oet.forEach(this.prepareEntry.bind(this));
      window.oet = this;
    } else {
      window.oet.observe((data, entry) => this.push(entry));
    }
  }

  fireObservers(data, entry) {
    this.observers.forEach((cb) => cb(data, entry));
  };

  prepareEntry(entry) {
    const {
      name,
      startTime,
      renderTime,
      loadTime,
      intersectionRect,
      identifier,
      naturalWidth,
      naturalHeight,
      id,
      element,
      url
    } = entry;

    const timingEntry = window.performance.getEntriesByName(url);

    const preparedEntry = { };

    this.timings.push(preparedEntry);

    this.fireObservers(preparedEntry, entry);
  };

  push(...entries) {
    entries.forEach(this.prepareEntry.bind(this));
  }

  getAll() {
    return this.timings;
  }

  observe(cb) {
    this.observers.push(cb);
  }

  unobserve(cb) {
    this.observers = this.observers.filter((c) => c !== cb);
  }
}
