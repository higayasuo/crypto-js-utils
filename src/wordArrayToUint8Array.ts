import CryptoJS from 'crypto-js';

/**
 * Convert WordArray to Uint8Array
 */
export const wordArrayToUint8Array = (
  wordArray: CryptoJS.lib.WordArray,
): Uint8Array => {
  const words = wordArray.words;
  const sigBytes = wordArray.sigBytes;
  const u8 = new Uint8Array(sigBytes);
  let offset = 0;
  for (let i = 0; i < words.length && offset < sigBytes; i++) {
    const word = words[i];
    for (let j = 0; j < 4 && offset < sigBytes; j++) {
      u8[offset] = (word >> (24 - j * 8)) & 0xff;
      offset++;
    }
  }
  return u8;
};
