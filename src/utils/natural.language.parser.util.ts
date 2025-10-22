export function parseNaturalLanguageQuery(query: string) {
  const filters: any = {};

  const lower = query.toLowerCase();

  if (lower.includes('palindrome')) filters.is_palindrome = true;

  const lengthMatch = lower.match(
    /length (?:between|from) (\d+) (?:and|to) (\d+)/,
  );
  if (lengthMatch) {
    filters.min_length = parseInt(lengthMatch[1]);
    filters.max_length = parseInt(lengthMatch[2]);
  }

  const wordCountMatch = lower.match(/word(?:s)? (?:count )?(?:of )?(\d+)/);
  if (wordCountMatch) {
    filters.word_count = parseInt(wordCountMatch[1]);
  }

  const containsMatch = lower.match(
    /contain(?:ing)? (?:the )?(?:letter |character )?["']?([a-zA-Z])["']?/,
  );
  if (containsMatch) {
    filters.contains_character = containsMatch[1];
  }

  const minOnly = lower.match(/longer than (\d+)/);
  if (minOnly) filters.min_length = parseInt(minOnly[1]);

  // Maximum length only
  const maxOnly = lower.match(/shorter than (\d+)/);
  if (maxOnly) filters.max_length = parseInt(maxOnly[1]);

  return filters;
}

// export function parseNaturalLanguageQuery(query: string) {
//   const lower = query.toLowerCase();
//   const filters: Record<string, any> = {};
//   if (lower.includes('palindromic')) filters.is_palindrome = true;
//   if (lower.includes('single word')) filters.word_count = 1;
//   if (lower.includes('longer than')) {
//     const num = parseInt(lower.match(/longer than (\\d+)/)?.[1] || '0');
//     if (num > 0) filters.min_length = num + 1;
//   }
//   if (lower.includes('containing the letter')) {
//     const letter = lower.match(/containing the letter (\\w)/)?.[1];
//     if (letter) filters.contains_character = letter;
//   }

//   if (Object.keys(filters).length === 0)
//     throw new Error('Unable to parse natural language query');

//   return filters;
// }
