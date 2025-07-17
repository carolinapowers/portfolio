import { afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';

// Make vi available globally as jest for compatibility
(globalThis as typeof globalThis & { jest?: typeof vi }).jest = vi;

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});
