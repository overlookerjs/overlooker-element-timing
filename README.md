# overlooker-element-timing

### Install
```
npm i overlooker-element-timing
```

### Usage
Adding the Overlooker Element Timing is a two-step process. 
First you need to add a snippet of code to the head of your document (before any other scripts run). 
This snippet creates a PerformanceObserver instance and starts observing element entry types.

```js
if (!window.oet) {window.oet = [];}if (PerformanceObserver) {new PerformanceObserver(function (l) {window.oet.push.apply(window.oet, l.getEntries());}).observe({ entryTypes: ['element'] });}
```

*__Note:__ You can use something else instead of `oet`, but you should put this string in the OverlookerElementTiming constructor as the first argument.*

Second step is to import the module in your application and subscribe to it
```js
import OverlookerElementTiming from 'overlooker-element-timing';

// you can put the name of the global variable that you used for store entries, in the first argument (default = 'oet')
const overlookerElementTiming = new OverlookerElementTiming();

overlookerElementTiming.observe((entry) => {
    // entry object contains element timing data in readable form
    // use it according to your need
});

// for getting already handled entries
overlookerElementTiming.getAll().forEach((entry) => {
    // handle
});
```

If you want to use this script in embedded version (with script tag), you can put the ./dist/index.min.js anywhere and use it from global namespace
```js
window.oet.observe(() => {
    // ...
});
```
