export function recordError(action) {
  try { action(); }
  catch (e) { return e; }
  return undefined;
}

export function expectError(action, assertions) {
  const e = recordError(action);
  assertions(e);
}
