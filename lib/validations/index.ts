// Export all validation schemas
export * from './auth';
export * from './admin';
export * from './student';
export * from './course';
export * from './teacher';
export * from './admission';
export * from './gallery';

// Export form validation utilities
export * from '../utils/formValidation';

// Re-export commonly used Zod utilities
export { z } from 'zod';
export type { ZodSchema, ZodError } from 'zod';