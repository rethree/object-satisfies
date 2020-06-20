import test from 'ava';
import { satisfies } from '../src';

const T = x => x === x;

test('explicit type parameter -> spec ≡ scenario -> compiles', t => {
  const o = { a: 42, b: 'a' };

  satisfies<typeof o>({
    a: T,
    b: T
  })(o);

  t.pass('compilation-only');
});

test('explicit type parameter -> spec ⊇ scenario -> fails', t => {
  const o = { a: 42 };

  satisfies<typeof o>({
    a: T,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    b: T
  })(o);

  t.pass('compilation-only');
});

test('explicit type parameter -> spec ⊆ scenario -> compiles', t => {
  const o = { a: 42, b: 'a' };

  satisfies<typeof o>({
    a: T
  })(o);

  t.pass('compilation-only');
});

test('implicit type parameter -> spec ≡ scenario -> compiles', t => {
  const o = { a: 42, b: 'a' };

  satisfies({
    a: T,
    b: T
  })(o);

  t.pass('compilation-only');
});

test('implicit type parameter -> spec ⊇ scenario -> fails', t => {
  const o = { a: 42 };

  satisfies({
    a: T,
    b: T
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-expect-error
  })(o);

  t.pass('compilation-only');
});

test('implicit type parameter -> spec ⊆ scenario -> compiles', t => {
  const o = { a: 42, b: 'a' };

  satisfies({
    a: T
  })(o);

  t.pass('compilation-only');
});

test('explicit type parameter -> spec includes symbol keys -> compiles', t => {
  const s = Symbol('symbol');
  const o = { a: 42, b: 'a', [s]: 12 };

  satisfies<typeof o>({
    a: T,
    [s]: T
  })(o);

  t.pass('compilation-only');
});
