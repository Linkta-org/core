/**
 * Check if an object is of a certain type.
 *
 * This function checks if an object is of a certain type by comparing the types of the object's properties to the types of the properties of the type object.
 * Use by creating a new object of the type you want to check against and passing it as the second argument.
 *
 * @param object The object to check
 * @param type An object of the the type to check against
 * @return True if the object is of the type, false otherwise
 */
export function isType<T extends object>(object: T, type: Partial<T>): boolean {
  return (Object.keys(type) as (keyof T)[]).every((key: keyof T) => {
    const objectType = typeof object[key];
    const expectedType = typeof type[key];
    return objectType === expectedType;
  });
}
