export default class OverlookerElementTiming {
  constructor(propName = 'oet') {
    this.observers = [];
    this.timings = [];

    if (!window[propName]) {
      window[propName] = [];
    }

    if (!(window[propName] instanceof OverlookerElementTiming)) {
      if (window[propName].forEach instanceof Function) {
        window[propName].forEach(this._prepareEntry.bind(this));
      }

      window[propName] = this;
    } else {
      window[propName].observe((entry) => this.push(entry));
    }
  }

  _fireObservers(entry) {
    this.timings.push(entry);

    this.observers.forEach((cb) => cb(entry));
  }

  _calcVisibility(viewportSize, position, size) {
    if (position > 0) {
      return viewportSize - (position + size) >= 0 ? size : Math.max(viewportSize - position, 0);
    } else if (position < 0) {
      return Math.abs(position) > size ? 0 : size + position;
    } else {
      return viewportSize > size ? size : viewportSize;
    }
  }

  _prepareEntry(rawEntry) {
    const {
      name,
      startTime,
      renderTime,
      loadTime,
      intersectionRect,
      identifier,
      naturalWidth,
      naturalHeight,
      url
    } = rawEntry;

    const timingEntries = window.performance.getEntriesByName(url);
    const timingEntry = timingEntries && timingEntries.length ? timingEntries[0].toJSON() : null;

    const { innerHeight, innerWidth } = window;

    const {
      x,
      y,
      width: intersectWidth,
      height: intersectHeight
    } = intersectionRect;

    const height = naturalHeight || intersectHeight;
    const width = naturalWidth || intersectWidth;

    const visibleHeight = this._calcVisibility(innerHeight, y, height);
    const visibleWidth = this._calcVisibility(innerWidth, x, width);

    const totalPixels = width * height;
    const visiblePixels = visibleWidth * visibleHeight;

    const visiblePercent = totalPixels ? visiblePixels / totalPixels : 0;

    const fetchStart = timingEntry ? timingEntry.fetchStart : startTime;
    const loadComplete = timingEntry ? timingEntry.responseEnd : loadTime;

    const entry = {
      type: name,
      name: identifier,
      view: {
        visiblePercent: visiblePercent,
        height,
        width
      },
      timings: name === 'image-paint' ? {
        fetchStart,
        loadComplete,
        loadAndAssociated: loadTime,
        render: renderTime,
        duration: renderTime - fetchStart
      } : {
        render: renderTime
      }
    };

    this._fireObservers(entry);
  }

  push(...entries) {
    entries.forEach(this._prepareEntry.bind(this));
  }

  getAll() {
    return this.timings;
  }

  clear() {
    this.timings = [];
  }

  observe(cb, buffered) {
    if (buffered) {
      this.timings.forEach((timing) => cb(timing));
    }

    this.observers.push(cb);
  }

  unobserve(cb) {
    this.observers = this.observers.filter((c) => c !== cb);
  }
}
