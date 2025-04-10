import { describe, it, expect } from 'vitest';
import { uint8ArrayToWordArray } from '../uint8ArrayToWordArray';
import CryptoJS from 'crypto-js';

describe('uint8ArrayToWordArray', () => {
  it('should convert an empty Uint8Array to an empty WordArray', () => {
    const u8arr = new Uint8Array(0);
    const result = uint8ArrayToWordArray(u8arr);
    expect(result.words.length).toBe(0);
    expect(result.sigBytes).toBe(0);
  });

  it('should convert a Uint8Array with one byte to WordArray', () => {
    const u8arr = new Uint8Array([0x12]);
    const result = uint8ArrayToWordArray(u8arr);
    expect(result.words[0]).toBe(0x12000000);
    expect(result.sigBytes).toBe(1);
  });

  it('should convert a Uint8Array with four bytes to WordArray', () => {
    const u8arr = new Uint8Array([0x12, 0x34, 0x56, 0x78]);
    const result = uint8ArrayToWordArray(u8arr);
    expect(result.words[0]).toBe(0x12345678);
    expect(result.sigBytes).toBe(4);
  });

  it('should convert a Uint8Array with five bytes to WordArray', () => {
    const u8arr = new Uint8Array([0x12, 0x34, 0x56, 0x78, 0x9a]);
    const result = uint8ArrayToWordArray(u8arr);
    expect(result.words[0]).toBe(0x12345678);
    // 0x9a000000 is too large for a 32-bit signed integer
    // We need to check the bits directly instead of the numeric value
    expect((result.words[1] >>> 0).toString(16)).toBe('9a000000');
    expect(result.sigBytes).toBe(5);
  });

  it('should handle Uint8Array with missing values', () => {
    const u8arr = new Uint8Array([0x12, 0x34, 0x56]);
    const result = uint8ArrayToWordArray(u8arr);
    expect(result.words[0]).toBe(0x12345600);
    expect(result.sigBytes).toBe(3);
  });

  it('should produce the same result as CryptoJS.lib.WordArray.create', () => {
    const u8arr = new Uint8Array([0x12, 0x34, 0x56, 0x78]);
    const result = uint8ArrayToWordArray(u8arr);

    // Create a WordArray directly using CryptoJS
    const words: number[] = [];
    words.push(
      ((u8arr[0] || 0) << 24) |
        ((u8arr[1] || 0) << 16) |
        ((u8arr[2] || 0) << 8) |
        (u8arr[3] || 0),
    );
    const expected = CryptoJS.lib.WordArray.create(words, u8arr.length);

    expect(result.words).toEqual(expected.words);
    expect(result.sigBytes).toBe(expected.sigBytes);
  });
});
