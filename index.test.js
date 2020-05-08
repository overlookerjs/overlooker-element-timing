const { default: OverlookerElementTiming } = require('./index.js');

const elementTimingsImage = {
  name: 'image-paint',
  startTime: 10,
  renderTime: 15,
  loadTime: 20,
  identifier: 'main-image',
  naturalWidth: 100,
  naturalHeight: 200,
  url: 'first_url',
  intersectionRect: {
    x: 10,
    y: 10,
    width: 100,
    height: 200
  }
};

const elementTimingsText = {
  name: 'text-paint',
  startTime: 15,
  renderTime: 15,
  loadTime: 0,
  identifier: 'main-text',
  naturalWidth: 100,
  naturalHeight: 200,
  url: '',
  intersectionRect: {
    x: 10,
    y: 10,
    width: 100,
    height: 200
  }
};

const timingsEntries = {
  'first_url': {
    fetchStart: 111,
    responseEnd: 222
  },
  'second_url': {
    fetchStart: 333,
    responseEnd: 444
  }
};

const outputEntryImage = {
  type: 'image-paint',
  name: 'main-image',
  view: {
    visiblePercent: 1,
    height: 200,
    width: 100
  },
  timings: {
    fetchStart: 10,
    load: 20,
    render: 20
  }
};

const outputEntryText = {
  type: 'text-paint',
  name: 'main-text',
  view: {
    visiblePercent: 1,
    height: 200,
    width: 100
  },
  timings: {
    render: 15
  }
};

const getMockedNamespaces = (name) => {
  const namespaces = {
    default: {
      innerHeight: 768,
      innerWidth: 1366,
      performance: {
        getEntriesByName(url) {
          return timingsEntries[url];
        }
      }
    },
    cropped: {
      innerHeight: 100,
      innerWidth: 100,
      performance: {
        getEntriesByName(url) {
          return timingsEntries[url];
        }
      }
    }
  };

  return namespaces[name];
};


describe('OverlookerElementTiming tests', () => {
  test('object creating', () => {
    const namespace = getMockedNamespaces('default');
    const overlookerElementTiming = new OverlookerElementTiming('field', namespace);

    expect(overlookerElementTiming).toBeInstanceOf(OverlookerElementTiming);
    expect(namespace.field).toBeInstanceOf(OverlookerElementTiming);
  });

  describe('event receiving', () => {
    const namespace = getMockedNamespaces('default');

    const overlookerElementTiming = new OverlookerElementTiming('oet', namespace);

    test('observe', () => {
      const entries = [];

      overlookerElementTiming.observe((entry) => entries.push(entry));
      namespace.oet.push(elementTimingsImage);
      namespace.oet.push(elementTimingsText);

      expect(entries[0]).toStrictEqual(outputEntryImage);
      expect(entries[1]).toStrictEqual(outputEntryText);
    });

    test('observe buffered', () => {
      const entries = [];

      overlookerElementTiming.observe((entry) => entries.push(entry), true);

      expect(entries[0]).toStrictEqual(outputEntryImage);
      expect(entries[1]).toStrictEqual(outputEntryText);
    });

    test('getAll', () => {
      const entries = overlookerElementTiming.getAll();

      expect(entries[0]).toStrictEqual(outputEntryImage);
      expect(entries[1]).toStrictEqual(outputEntryText);
    });

    test('cleaning', () => {
      overlookerElementTiming.clear();

      const entries = overlookerElementTiming.getAll();

      expect(entries.length).toBe(0);
    });

    test('unsubscribe', () => {
      const entries = [];
      const observeFunction = (entry) => entries.push(entry);

      overlookerElementTiming.observe(observeFunction);
      overlookerElementTiming.unobserve(observeFunction);
      overlookerElementTiming.push(elementTimingsImage);

      expect(entries.length).toBe(0);
    });

    test('cropped view', () => {
      const namespace = getMockedNamespaces('cropped');
      const overlookerElementTiming = new OverlookerElementTiming('oet', namespace);

      overlookerElementTiming.push(elementTimingsImage);

      const entries = overlookerElementTiming.getAll();

      expect(entries[0].view).toStrictEqual({
        visiblePercent: 0.405,
        height: 200,
        width: 100
      });
    });
  });
});
