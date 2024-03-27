/**
 * Generic type interface for use with isType.
 */
interface Type {
  [key: string]: any;
}

/**
 * Check if an object is of a certain type.
 *
 * @param object
 * @param type
 * @returns
 */
export function isType(object: Type, type: Type): boolean {
  const objectKeys = Object.keys(object);
  const typeKeys = Object.keys(type);

  if (objectKeys.length !== typeKeys.length) {
    return false;
  }

  for (const key of objectKeys) {
    if (
      !typeKeys.hasOwnProperty(key) ||
      typeof object[key] !== typeof type[key]
    ) {
      return false;
    }
  }

  return true;
}
