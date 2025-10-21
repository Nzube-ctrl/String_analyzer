export function parseNaturalLanguageQuery(query: string) {
  const lower = query.toLowerCase();
  const filters: Record<string, any> = {};
  if (lower.includes('palindromic')) filters.is_palindrome = true;
  if (lower.includes('single word')) filters.word_count = 1;
  if (lower.includes('longer than')) {
    const num = parseInt(lower.match(/longer than (\\d+)/)?.[1] || '0');
    if (num > 0) filters.min_length = num + 1;
  }
  if (lower.includes('containing the letter')) {
    const letter = lower.match(/containing the letter (\\w)/)?.[1];
    if (letter) filters.contains_character = letter;
  }

  if (Object.keys(filters).length === 0)
    throw new Error('Unable to parse natural language query');

  return filters;
}
