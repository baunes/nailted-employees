import { ParseUtils } from './parseUtils';

describe('ParseUtils', () => {
  // Trick for coverage on static methods
  new ParseUtils();

  test('sanitizes string', () => {
    expect(ParseUtils.sanitizeString('my string')).toBe('my string');
    expect(ParseUtils.sanitizeString('my "string".')).toBe('my "string".');
    expect(ParseUtils.sanitizeString('"string"')).toBe('string');
    expect(ParseUtils.sanitizeString("my 'string'.")).toBe("my 'string'.");
    expect(ParseUtils.sanitizeString("'string'")).toBe("'string'");
  });

  test('parses dates correctly', () => {
    const d1 = ParseUtils.parseDate('01/01/2020');
    expect(d1.getUTCDate()).toBe(1);
    expect(d1.getUTCMonth() + 1).toBe(1);
    expect(d1.getUTCFullYear()).toBe(2020);

    const d2 = ParseUtils.parseDate('1/1/2020');
    expect(d2.getUTCDate()).toBe(1);
    expect(d2.getUTCMonth() + 1).toBe(1);
    expect(d2.getUTCFullYear()).toBe(2020);

    const d3 = ParseUtils.parseDate('10/30/1987');
    expect(d3.getUTCDate()).toBe(30);
    expect(d3.getUTCMonth() + 1).toBe(10);
    expect(d3.getUTCFullYear()).toBe(1987);
  });
});
