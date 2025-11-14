# Code-builder

This repository is a minimal demo project. It includes `lodash` as a sample dependency.

Example usage (Node):

```js
const _ = require('lodash');

const arr = [1,2,3,4,5,6];
// chunk the array into groups of 2
console.log(_.chunk(arr, 2)); // [[1,2],[3,4],[5,6]]
```

To run this example interactively:

```bash
node -e "console.log(require('lodash').chunk([1,2,3,4,5,6],2))"
```

License: ISC
