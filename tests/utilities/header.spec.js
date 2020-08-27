import Header from '../../src/utilities/Header';
import PrimitiveKeyValuePair from '../../src/utilities/PrimitiveKeyValuePair';

describe('Header', () => {
  const key = 'foo';
  const value = 'bar';
  const actual = new Header(key, value);

  test('returns', () => {
    expect(actual).toBeDefined();
  });

  test('extends PrimitiveKeyValuePair', () => {
    expect(actual instanceof PrimitiveKeyValuePair).toBe(true);
  });
  
  test('constructor sets key', () => {
    expect(actual.key).toBe(key);
  });

  test('constructor sets value', () => {
    expect(actual.value).toBe(value);
  });
});
