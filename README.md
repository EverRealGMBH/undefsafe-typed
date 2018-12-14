# undefsafe-typed

Library to safely get subproperties of objects in typescript, without crashing if any child is undefined along the object tree. Inspired by undefsafe.

Fully supports types and inferres children types as return types.

## Install:

```
yarn add undefsafe-typed
```

## Usage:

```ts
interface IChild {
  name?: string;
  age?: number;
}
interface IMainObject {
  value?: string;
  children?: IChild[];
  someOtherNestedValue?: {
    a?: {
      b?: string;
    };
  };
}

const item = {
  name: 'item1',
  children: [{}, { name: 'John Doe', age: 21 }],
};

const name = undefsafe(item, 'name'); // name is inferred to string
const firstChildAge = undefsafe(item, 'children', 0, 'age'); // firstChildAge is inferred to number
const thirdChildAge = undefsafe(item, 'children', 0, 'age'); // thirdChildAge is inferred to number
const nestedB = undefsafe(item, 'someOtherNestedValue', 'a', 'b'); // is inferred to string
```

### Dev and test

```
yarn install
yarn test
```
