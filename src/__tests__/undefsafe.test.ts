import { undefsafe } from '../index';

interface ITestingInterface {
  a1?: number;
  b1?: {
    a2?: string;
    b2?: {
      a3?: string;
    };
    c2?: Array<{
      a3?: boolean;
      b3?: Blob;
      c3?: number;
    }>;
  };
}

const smartIt = (expectedValue, item: ITestingInterface, ...keys: any[]) => {
  it(`SHOULD return "${expectedValue}" when reading "item.${keys.join('.')}"`, () => {
    const result = (undefsafe as any)(item, ...keys);
    expect(result).toEqual(expectedValue);
  });
};

describe('WHEN testing an a typed object', () => {
  describe('WHEN b1 property is not set', () => {
    const item: ITestingInterface = { a1: 10 };

    smartIt(undefined, item, 'b1', 'b2', 'a3');
    smartIt(undefined, item, 'b1', 'c2', 100, 'a3');
    smartIt(10, item, 'a1');
  });

  describe('WHEN a1 and b1.c2 property array are set but b1.b2 is not set', () => {
    const item: ITestingInterface = {
      a1: 10,
      b1: { c2: [{ a3: true, b3: null }, { a3: false, b3: null, c3: NaN }, { a3: false, b3: null, c3: 10 }] },
    };

    smartIt(undefined, item, 'b1', 'b2', 'a3');
    smartIt(10, item, 'a1');
    smartIt(true, item, 'b1', 'c2', 0, 'a3');
    smartIt(null, item, 'b1', 'c2', 0, 'b3');
    smartIt(undefined, item, 'b1', 'c2', 0, 'b3', 'notExisting1', 'notExisting2');
    smartIt(false, item, 'b1', 'c2', 1, 'a3');
    smartIt(null, item, 'b1', 'c2', 1, 'b3');
    smartIt(NaN, item, 'b1', 'c2', 1, 'c3');
    smartIt(false, item, 'b1', 'c2', 2, 'a3');
    smartIt(null, item, 'b1', 'c2', 2, 'b3');
    smartIt(10, item, 'b1', 'c2', 2, 'c3');
  });
});
