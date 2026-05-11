import { ForbiddenError } from '../utils/errors';
import { TokenPayload } from './jwt';

export const ROLES = {
  ADMIN: 'admin',
  EDITOR: 'editor',
} as const;

export type Role = typeof ROLES[keyof typeof ROLES];

/**
 * Validates if a user has at least one of the required roles.
 * Currently, admin is top-level and editor is restricted.
 */
export function requireRole(user: TokenPayload, ...allowedRoles: string[]) {
  if (!allowedRoles.includes(user.role)) {
    // Basic hierarchy: admin can access editor routes
    if (user.role === ROLES.ADMIN && allowedRoles.includes(ROLES.EDITOR)) {
      return;
    }
    
    throw new ForbiddenError(`Role ${user.role} is not authorized to access this resource`);
  }
}
