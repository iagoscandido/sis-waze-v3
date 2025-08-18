export type Role = "ADMIN" | "USER";

export function canAccess(role: Role, action: string): boolean {
  const permissions = {
    ADMIN: ["create", "read", "update", "delete"],
    USER: ["read"],
  };

  return permissions[role]?.includes(action) ?? false;
}
