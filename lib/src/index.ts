type Predicate<T extends any[]> = (...args: T) => boolean;

type FieldPredicate<T> = Predicate<[T, boolean]>;

type Key = symbol | string | number;

type Dictionary<T = unknown> = Record<Key, T>;

type Spec<T extends Dictionary> = {
  [K in keyof T]?: FieldPredicate<T[K]>;
};

export default <T extends Dictionary>(spec: Spec<T>): Predicate<[T]> => {
  const keys = Reflect.ownKeys(spec) as any[];
  return (scenario: T): boolean =>
    keys.every(key => spec[key]!(scenario[key], key in scenario));
};
