# @higayasuo/crypto-js-utils

A collection of utilities for crypto-js.

## Installation

```bash
npm install @higayasuo/crypto-js-utils
```

### Peer Dependencies

This package requires `crypto-js` as a peer dependency. If you haven't already installed it, you'll need to install it separately:

```bash
npm install crypto-js
```

## Usage

```typescript
import {
  uint8ArrayToWordArray,
  wordArrayToUint8Array,
} from '@higayasuo/crypto-js-utils';

// Convert Uint8Array to WordArray
const u8arr = new Uint8Array([0x12, 0x34, 0x56, 0x78]);
const wordArray = uint8ArrayToWordArray(u8arr);

// Convert WordArray to Uint8Array
const backToUint8Array = wordArrayToUint8Array(wordArray);
```

## Available Utilities

### uint8ArrayToWordArray

Converts a Uint8Array to a CryptoJS WordArray.

```typescript
import { uint8ArrayToWordArray } from '@higayasuo/crypto-js-utils';

const u8arr = new Uint8Array([0x12, 0x34, 0x56, 0x78]);
const wordArray = uint8ArrayToWordArray(u8arr);
```

### wordArrayToUint8Array

Converts a CryptoJS WordArray to a Uint8Array.

```typescript
import { wordArrayToUint8Array } from '@higayasuo/crypto-js-utils';

const wordArray = CryptoJS.lib.WordArray.create([0x12345678], 4);
const u8arr = wordArrayToUint8Array(wordArray);
```

## Development

### Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher)

### Setup

1. Clone the repository:

```bash
git clone https://github.com/higayasuo/crypto-js-utils.git
cd crypto-js-utils
```

2. Install dependencies:

```bash
npm install
```

### Scripts

- `npm run build` - Build the package
- `npm test` - Run tests
- `npm run test:coverage` - Run tests with coverage
- `npm run preview` - Preview the build

## License

MIT
