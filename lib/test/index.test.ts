import test from 'ava';
import satisfies from '../src';

test('all keys are covered with predicates satisfied by the scenario -> returns true', t => {
  const o = { a: 42, b: 'a' };

  const actual = satisfies<typeof o>({
    a: x => x === 42,
    b: x => x === 'a',
  })(o);

  t.true(actual);
});

test('only keys covered with predicates satisfied by the scenario are provided -> returns true', t => {
  const o = { a: 42, b: 'a', c: { a: 12 } };

  const actual = satisfies<typeof o>({
    a: x => x === 42,
    b: x => x === 'a',
  })(o);

  t.true(actual);
});

test('some conditions not satisfied -> fails', t => {
  const o = { a: 42, b: 'a' };

  const actual = satisfies<typeof o>({
    a: x => x === 42,
    b: x => x === 'b',
  })(o);

  t.false(actual);
});

test('some keys are symbols', t => {
  const s = Symbol('symbol');
  const o = { a: 42, b: 'a', [s]: 12 };

  const actual = satisfies<typeof o>({
    a: x => x === 42,
    [s]: x => x === 12,
  })(o);

  t.true(actual);
});
