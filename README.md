[![MIT
license](https://img.shields.io/badge/License-MIT-blue.svg)](https://lbesson.mit-license.org/)
[![Build
Status](https://travis-ci.org/rethree/object-satisfies.svg?branch=master)](https://travis-ci.org/rethree/object-satisfies) 
[![Coverage Status](https://coveralls.io/repos/github/rethree/object-satisfies/badge.svg?branch=master)](https://coveralls.io/github/rethree/object-satisfies?branch=master)
[![CodeFactor](https://www.codefactor.io/repository/github/rethree/object-satisfies/badge)](https://www.codefactor.io/repository/github/rethree/object-satisfies)
[![dependencies
Status](https://david-dm.org/rethree/object-satisfies/status.svg)](https://david-dm.org/rethree/object-satisfies) 
[![devDependencies Status](https://david-dm.org/rethree/object-satisfies/status/dev-status.svg)](https://david-dm.org/rethree/object-satisfies/status?type=dev)

### object-satisfies

Tiny helper library written to simplify the task of fine-grained object validation. 
Pretty much what you can get from `ramda/where` or `lodash/conforms` except that it's 
smaller, prioritizes typings and adds field existence flag to field-level predicates arguments.

Given an arbitrary object, e.g.:

```typescript
const scenario = {
  a: 42,
  b: 'ohai',
}
```

`object-satisfies` allows key-based predicate composition, i.e.:

```typescript
import satisfies from '@rethree/satisfies';

const outcome = satisfies({
  a: x => x === 42,
  b: x => typeof x === 'string',
  // c is optional and not in the 'scenario' object, object-satisfies 
  // lets you run a predicate regardless, additionally - field existence flag is 
  // added to the list of predicate arguments; 
  c: (x, found) => !found     
})(scenario);

console.log(outcome); // true
```

Please note that type-wise, example above will only compile because the type of `scenario` object is 
unavailable at the time `spec` object is defined. To overcome this limitation one would need 
to specify generic argument explicitly, like this:

```typescript
import satisfies from '@rethree/satisfies';

satisfies<typeof scenario>({
  a: x => x === 42,
  b: x => typeof x === 'string',
  c: (x, found) => !found     
})(scenario);
```

...however, if validation of explicitly typed "scenario object" against a spec is performed one needs 
to make sure the former is a superset (key-wise) of the latter, optional properties do count. To fix the 
compilation error caused by the piece of code above following type definition would need to be
provided.

```typescript
type Scenario = { 
  a: number;
  b: string;
  c?: () => {};
};
const scenario: Scenario = {
  a: 42,
  b: 'ohai',
};
```

See [tests](https://github.com/rethree/object-satisfies/tree/master/lib/test) for additional use cases / behaviours.
