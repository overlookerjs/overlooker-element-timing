export default class OverlookerElementTiming {
  constructor() {
    this.observers = [];
    this.timings = [];

    if (!window.oet) {
      window.oet = [];
    }

    window.oet.forEach(this.prepareEntry.bind(this));
    window.oet = this;
  }

  fireObservers(data) {
    this.observers.forEach((cb) => cb(data));
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

    this.fireObservers(preparedEntry);
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
