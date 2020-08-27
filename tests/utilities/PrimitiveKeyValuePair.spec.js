import PrimitiveKeyValuePair from '../../src/utilities/PrimitiveKeyValuePair';
import * as utils from '../test-utils';

describe('PrimitiveKeyValuePair', () => {
  describe('constructor', () => {
    test('sets key when key is a string', () => {
      const actual = new PrimitiveKeyValuePair('foo', 'bar');
      expect(actual.key).toBe('foo');
    });

    [
      { key: null, desc: 'null' },
      { key: undefined, desc: 'undefined' },
      { key: false, desc: 'a boolean' },
      { key: 42, desc: 'a number' },
      { key: {}, desc: 'an object' },
      { key: [], desc: 'an array' },
    ].forEach(x => {
      test(`throws error when key is ${x.desc}`, () => {
        const e = utils.recordError(() => {
          new PrimitiveKeyValuePair(x.key, 'foobar');
        });
        expect(e).toBeDefined();
        expect(e instanceof TypeError).toBe(true);
        expect(e.message).toBe('Keys must be of type string');
      });
    });

    [
      { value: 'bar', desc: 'string' },
      { value: 42, desc: 'number' },
      { value: false, desc: 'boolean' },
    ].forEach(x => {
      test(`sets value when value is a ${x.desc}`, () => {
        const actual = new PrimitiveKeyValuePair('foo', x.value);
        expect(actual.value).toBe(x.value);
      });
    });

    [
      { value: null, desc: 'null' },
      { value: undefined, desc: 'undefined' },
      { value: {}, desc: 'an object' },
      { value: [], desc: 'an array' },
    ].forEach(x => {
      test(`throws error when value is ${x.desc}`, () => {
        const action = () => new PrimitiveKeyValuePair('foobar', x.value);
        const assertions = e => {
          expect(e).toBeDefined();
          expect(e instanceof TypeError).toBe(true);
          expect(e.message).toBe('Values must be of type string, number, or boolean');
        };

        utils.expectError(action, assertions);
      });
    });
  });

  describe('properties', () => {
    const key = 'foo';
    const value = 'bar';
    const actual = new PrimitiveKeyValuePair(key, value);

    describe('key', () => {
      test('returns key', () => {
        expect(actual.key).toBe(key);
      });

      test('cannot be set', () => {
        const action = () => actual.key = 'oops';
        const assertions = e => {
          expect(e).toBeDefined();
          expect(e instanceof Error).toBe(true);
          expect(e.message).toBe('Keys are read-only');
        };

        utils.expectError(action, assertions);
      });
    });

    describe('value', () => {
      test('returns value', () => {
        expect(actual.value).toBe(value);
      });

      [
        { value: 'baz', desc: 'string' },
        { value: 42, desc: 'number' },
        { value: false, desc: 'boolean' },
      ].forEach(x => {
        test(`can be set when value is a ${x.desc}`, () => {
          actual.value = x.value;
          expect(actual.value).toBe(x.value);
        });
      });

      [
        { value: null, desc: 'null' },
        { value: undefined, desc: 'undefined' },
        { value: {}, desc: 'an object' },
        { value: [], desc: 'an array' },
      ].forEach(x => {
        test(`throws error when new value is ${x.desc}`, () => {
          const action = () => new PrimitiveKeyValuePair('foobar', x.value);
          const assertions = e => {
            expect(e).toBeDefined();
            expect(e instanceof TypeError).toBe(true);
            expect(e.message).toBe('Values must be of type string, number, or boolean');
          };

          utils.expectError(action, assertions);
        });
      });
    });
  });
});
