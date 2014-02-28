#Arrow functions in Knockout.js

Recently, Knockout's original author Steve Sanderson released a plugin called [knockout-projections](https://github.com/stevesanderson/knockout-projections) which optimises the performance of the observable array methods filter and map. In [this post](blog.md), I take a peek into the future by combining this plugin with the forthcoming ES6 arrow functions to produce some very terse and highly efficient collection bindings.

#Build Instructions
browserify -e example/script.js > example/bundle.js
