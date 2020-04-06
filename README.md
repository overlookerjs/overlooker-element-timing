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
if (!window.oet) {window.oet = [];}new PerformanceObserver(function (l) {window.oet.push(...l);}).observe({ entryTypes: ['element'] });
```

*__Note:__ You can use something else instead of `oet`, but you should put this string in the OverlookerElementTiming constructor as the first argument.*

Second step is to import the module in your application and subscribe to it
```js
import OverlookerElementTiming from 'overlooker-element-timing';

const overlookerElementTiming = new OverlookerElementTiming(); // you can put the name of the global variable that you used for store entries, in the first argument (default = 'oet')

overlookerElementTiming.observe((entry) => {
    // entry object contains element timing data in readable form
    // use it according to your need
});
```
