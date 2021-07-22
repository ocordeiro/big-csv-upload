# Big CSV file Upload
Open big CSV files in browser and send batches of lines to backend.


## How to use

```
import { DropArea, FileApi } from './src/index.js';

const dropArea = new DropArea("drop-area", (files) => {
    const fileApi = new FileApi(files[0]);
    fileApi.onChunkLines = (lines) => {
        // fetch(...)
    };

});
```

### keywords
- FileStream
- Drag and Drop
- TextDecoder
- FileReader