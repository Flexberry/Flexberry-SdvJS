# SDV.js
Spatial data visualization library.

#Usage example
This JS-code example is just to test syntax highlighting.
```javascript
// If you use other library which points to SDV as its global namespace, you can avoid such problem.
// Before usage of SDV.js facilities you can assign its global namespace to a local variable as follows:
var sdvjs = SDV.noConflict();

// Now sdvjs variable points to SDV.js library global namespace, and SDV points to that other library namespace.
// So you can use SDV.js facilities through a local variable as follows:
console.log('Current SDV.js version is ' + sdvjs.version);
```

#License
SDV.js is released under the [MIT license](http://en.wikipedia.org/wiki/MIT_License).<br>
See [license file](LICENSE) for details.