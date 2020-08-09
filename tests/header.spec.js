import Header from '../src/utilities/header';

describe('Header', () => {
  describe('constructor', () => {
    test('sets key when key is a string', () => {
      const actual = new Header('foo', 'bar');
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
        try {
          new Header(x.key, 'foobar');
          expect(true).toBe(false);
        } catch (e) {
          expect(e instanceof TypeError).toBe(true);
          expect(e.message).toBe('Header keys must be of type string');
        }
      });
    });

    [
      { value: 'bar', desc: 'string' },
      { value: 42, desc: 'number' },
      { value: false, desc: 'boolean' },
    ].forEach(x => {
      test(`sets value when value is a ${x.desc}`, () => {
        const actual = new Header('foo', x.value);
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
        try {
          new Header('foobar', x.value);
          expect(true).toBe(false);
        } catch (e) {
          expect(e instanceof TypeError).toBe(true);
          expect(e.message).toBe('Header values must be of type string, number, or boolean');
        }
      });
    });
  });
});
