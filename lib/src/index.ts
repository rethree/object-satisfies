type Predicate<T extends any[]> = (...args: T) => boolean;

type FieldPredicate<T> = Predicate<[T, boolean]>;

type Key = symbol | string | number;

type Dictionary<T = unknown> = Record<Key, T>;

type Spec<T extends Dictionary> = {
  [K in keyof T]?: FieldPredicate<T[K]>;
};

const getOwnKeys = <T>(x: T): any[] => [
  ...Object.getOwnPropertyNames(x),
  ...Object.getOwnPropertySymbols(x),
];

export default <T extends Dictionary>(spec: Spec<T>): Predicate<[T]> => {
  const keys = getOwnKeys(spec);
  return (scenario: T): boolean =>
    keys.every(key => spec[key]!(scenario[key], key in scenario));
};
