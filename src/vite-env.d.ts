/// <reference types="vite/client" />
/// <reference types="vitest/globals" />
/// <reference types="@testing-library/jest-dom" />

// Global test utilities
declare global {
  const vi: typeof import('vitest').vi;
  const jest: typeof vi;
}

export {};
