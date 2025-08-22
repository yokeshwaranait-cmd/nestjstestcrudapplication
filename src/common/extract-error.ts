// src/common/utils/extract-error.ts
export function extractErrorMessage(e: unknown): string {
  if (e instanceof Error) return e.message;
  if (typeof e === 'string') return e;
  return 'Internal server error';
}
