export const validateProductInput = (data: unknown): boolean => {
  if (typeof data !== 'object' || data === null) return false;
  const obj = data as Record<string, unknown>;
  return typeof obj.name === 'string' && typeof obj.price === 'number';
};

export const validateOrderInput = (data: unknown): boolean => {
  if (typeof data !== 'object' || data === null) return false;
  const obj = data as Record<string, unknown>;
  return typeof obj.userId === 'string' && Array.isArray(obj.items);
};
