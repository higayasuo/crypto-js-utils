import CryptoJS from 'crypto-js';

/**
 * Convert Uint8Array to WordArray
 */
export const uint8ArrayToWordArray = (
  u8arr: Uint8Array,
): CryptoJS.lib.WordArray => {
  const len = u8arr.length;
  const words = [];
  for (let i = 0; i < len; i += 4) {
    words.push(
      ((u8arr[i] || 0) << 24) |
        ((u8arr[i + 1] || 0) << 16) |
        ((u8arr[i + 2] || 0) << 8) |
        (u8arr[i + 3] || 0),
    );
  }
  return CryptoJS.lib.WordArray.create(words, len);
};
