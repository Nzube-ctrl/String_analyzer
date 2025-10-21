import * as CryptoJS from 'crypto-js';

export function analyzeString(value: string) {
  const normalized = value.toLowerCase().replace(/\s+/g, '');
  const reversed = normalized.split('').reverse().join('');
  const is_palindrome = normalized === reversed;

  const length = value.length;
  const words = value.trim().split(/\s+/);
  const word_count = words.filter(Boolean).length;
  const unique_characters = new Set(value).size;
  const sha256_hash = CryptoJS.SHA256(value).toString();

  const character_frequency_map: Record<string, number> = {};
  for (const ch of value) {
    character_frequency_map[ch] = (character_frequency_map[ch] || 0) + 1;
  }

  return {
    length,
    is_palindrome,
    unique_characters,
    word_count,
    sha256_hash,
    character_frequency_map,
  };
}
