import { describe, it, expect } from 'vitest';
import { wordArrayToUint8Array } from '../wordArrayToUint8Array';
import CryptoJS from 'crypto-js';

describe('wordArrayToUint8Array', () => {
  it('should convert an empty WordArray to an empty Uint8Array', () => {
    const wordArray = CryptoJS.lib.WordArray.create([], 0);
    const result = wordArrayToUint8Array(wordArray);
    expect(result.length).toBe(0);
  });

  it('should convert a WordArray with one byte to Uint8Array', () => {
    const wordArray = CryptoJS.lib.WordArray.create([0x12000000], 1);
    const result = wordArrayToUint8Array(wordArray);
    expect(result.length).toBe(1);
    expect(result[0]).toBe(0x12);
  });

  it('should convert a WordArray with four bytes to Uint8Array', () => {
    const wordArray = CryptoJS.lib.WordArray.create([0x12345678], 4);
    const result = wordArrayToUint8Array(wordArray);
    expect(result.length).toBe(4);
    expect(result[0]).toBe(0x12);
    expect(result[1]).toBe(0x34);
    expect(result[2]).toBe(0x56);
    expect(result[3]).toBe(0x78);
  });

  it('should convert a WordArray with five bytes to Uint8Array', () => {
    const wordArray = CryptoJS.lib.WordArray.create(
      [0x12345678, 0x9a000000],
      5,
    );
    const result = wordArrayToUint8Array(wordArray);
    expect(result.length).toBe(5);
    expect(result[0]).toBe(0x12);
    expect(result[1]).toBe(0x34);
    expect(result[2]).toBe(0x56);
    expect(result[3]).toBe(0x78);
    expect(result[4]).toBe(0x9a);
  });

  it('should handle WordArray with partial words', () => {
    const wordArray = CryptoJS.lib.WordArray.create([0x12345600], 3);
    const result = wordArrayToUint8Array(wordArray);
    expect(result.length).toBe(3);
    expect(result[0]).toBe(0x12);
    expect(result[1]).toBe(0x34);
    expect(result[2]).toBe(0x56);
  });

  it('should handle WordArray with multiple words', () => {
    const wordArray = CryptoJS.lib.WordArray.create(
      [0x12345678, 0x9abcdef0],
      8,
    );
    const result = wordArrayToUint8Array(wordArray);
    expect(result.length).toBe(8);
    expect(result[0]).toBe(0x12);
    expect(result[1]).toBe(0x34);
    expect(result[2]).toBe(0x56);
    expect(result[3]).toBe(0x78);
    expect(result[4]).toBe(0x9a);
    expect(result[5]).toBe(0xbc);
    expect(result[6]).toBe(0xde);
    expect(result[7]).toBe(0xf0);
  });

  it('should handle WordArray with sigBytes less than words.length * 4', () => {
    const wordArray = CryptoJS.lib.WordArray.create(
      [0x12345678, 0x9abcdef0],
      6,
    );
    const result = wordArrayToUint8Array(wordArray);
    expect(result.length).toBe(6);
    expect(result[0]).toBe(0x12);
    expect(result[1]).toBe(0x34);
    expect(result[2]).toBe(0x56);
    expect(result[3]).toBe(0x78);
    expect(result[4]).toBe(0x9a);
    expect(result[5]).toBe(0xbc);
  });
});
