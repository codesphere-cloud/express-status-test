# Express Status

A simple Express.js application that renders HTTP status codes with visual styling.
Has ci.yml included to be used with Codesphere

## Features
Navigate to `[url]` and try different status codes:
- `[url]/0xx` - Non standard (random)
- `[url]/1xx` - Informational (gray)
- `[url]/2xx` - Success (green)
- `[url]/3xx` - Redirect (blue)
- `[url]/4xx` - Not Found (orange) 
- `[url]/5xx` - Server Error (red)
- `[url]/6xx` - Non standard (random)
- `[url]/7xx` - Non standard (random)
- `[url]/8xx` - Non standard (random)
- `[url]/9xx` - Non standard (random)

**Warning:** `1xx` status codes may be interpreted by the browser and result in no page shown.

## Installation
```bash
npm install
```

## Usage
Start the server:
```bash
node index.js
```

