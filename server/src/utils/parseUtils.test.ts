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

  test('formats dates correctly', () => {
    const d1 = ParseUtils.formatDate(new Date('2020-01-01'));
    expect(d1).toBe('01/01/2020');

    const d2 = ParseUtils.formatDate(new Date('1987-10-30'));
    expect(d2).toBe('10/30/1987');
  });

  test('maps rows to csv string', () => {
    expect(ParseUtils.toCsvRow([])).toBe('\n');
    expect(ParseUtils.toCsvRow([1])).toBe('1\n');
    expect(ParseUtils.toCsvRow([1, 2])).toBe('1,2\n');
    expect(ParseUtils.toCsvRow([1, 2, 'value'])).toBe('1,2,value\n');
    expect(ParseUtils.toCsvRow([1, 2, 'other value'])).toBe('1,2,other value\n');
    expect(ParseUtils.toCsvRow([1, 2, 'other, value'])).toBe('1,2,"other, value"\n');
    expect(ParseUtils.toCsvRow([1, 2, 'other, "0" value'])).toBe('1,2,"other, ""0"" value"\n');
    expect(ParseUtils.toCsvRow([1, 2, 'other"," value'])).toBe('1,2,"other"","" value"\n');
  });
});
