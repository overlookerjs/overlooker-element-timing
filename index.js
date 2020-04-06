export default class OverlookerElementTiming {
  constructor(propName = 'oet') {
    this.observers = [];
    this.timings = [];

    if (!window[propName]) {
      window[propName] = [];
    }

    if (!(window[propName] instanceof OverlookerElementTiming)) {
      if (window[propName].forEach instanceof Function) {
        window[propName].forEach(this.prepareEntry.bind(this));
      }

      window[propName] = this;
    } else {
      window[propName].observe((data, entry) => this.push(entry));
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
