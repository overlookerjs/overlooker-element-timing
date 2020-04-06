# overlooker-element-timing

### Install
```
npm i overlooker-element-timing
```

### Usage
```js
if (!window.oet) {window.oet = [];}new PerformanceObserver(function (l) {window.oet.push(...l);}).observe({ entryTypes: ['element'] });
```
