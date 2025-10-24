// Role-Based Access Control (RBAC) Helper

export type Role = 'super_admin' | 'admin' | 'editor';

export type Permission = 
  | 'manage_users'        // เพิ่ม/ลบ/แก้ไข users
  | 'manage_settings'     // แก้ไข settings
  | 'manage_products'     // จัดการสินค้า
  | 'manage_blog'         // จัดการบล็อก
  | 'manage_faq'          // จัดการ FAQ
  | 'manage_about'        // จัดการเกี่ยวกับเรา
  | 'manage_benefits'     // จัดการประโยชน์
  | 'view_subscribers'    // ดู subscribers
  | 'delete_content';     // ลบ content

// Permission matrix
const rolePermissions: Record<Role, Permission[]> = {
  super_admin: [
    'manage_users',
    'manage_settings',
    'manage_products',
    'manage_blog',
    'manage_faq',
    'manage_about',
    'manage_benefits',
    'view_subscribers',
    'delete_content',
  ],
  admin: [
    'manage_products',
    'manage_blog',
    'manage_faq',
    'manage_about',
    'manage_benefits',
    'view_subscribers',
    'delete_content',
  ],
  editor: [
    'manage_products',
    'manage_blog',
    'manage_faq',
    // ไม่สามารถ delete, ไม่สามารถจัดการ users
  ],
};

/**
 * Check if a role has a specific permission
 */
export function hasPermission(role: string | undefined, permission: Permission): boolean {
  if (!role) return false;
  const permissions = rolePermissions[role as Role];
  return permissions?.includes(permission) || false;
}

/**
 * Check if user can access a specific resource
 */
export function canAccess(role: string | undefined, resource: string): boolean {
  if (!role) return false;
  
  const permissionMap: Record<string, Permission> = {
    '/admin/users': 'manage_users',
    '/admin/settings': 'manage_settings',
    '/admin/products': 'manage_products',
    '/admin/blog': 'manage_blog',
    '/admin/faq': 'manage_faq',
    '/admin/about': 'manage_about',
    '/admin/benefits': 'manage_benefits',
    '/admin/subscribers': 'view_subscribers',
  };
  
  const requiredPermission = permissionMap[resource];
  if (!requiredPermission) return true; // Allow access to dashboard, etc.
  
  return hasPermission(role, requiredPermission);
}

/**
 * Get role display name
 */
export function getRoleDisplayName(role: string): string {
  const displayNames: Record<Role, string> = {
    super_admin: 'ຜູ້ດູແລລະບົບ',
    admin: 'ຜູ້ຈັດການ',
    editor: 'ບັນນາທິການ',
  };
  return displayNames[role as Role] || role;
}

/**
 * Get all available roles
 */
export function getAllRoles(): { value: Role; label: string; description: string }[] {
  return [
    {
      value: 'super_admin',
      label: 'ຜູ້ດູແລລະບົບ (Super Admin)',
      description: 'ສິດທິ์ເຕັມທີ່: ຈັດການທຸກສິ່ງ ລວມທັງຜູ້ໃຊ້ແລະການຕັ້ງຄ່າ',
    },
    {
      value: 'admin',
      label: 'ຜູ້ຈັດການ (Admin)',
      description: 'ຈັດການເນື້ອຫາທັງໝົດ ສິນຄ້າ ບລ໋ອກ FAQ ແຕ່ບໍ່ສາມາດຈັດການຜູ້ໃຊ້',
    },
    {
      value: 'editor',
      label: 'ບັນນາທິການ (Editor)',
      description: 'ແກ້ໄຂເນື້ອຫາ ສິນຄ້າ ບລ໋ອກ ແຕ່ບໍ່ສາມາດລົບຫຼືຈັດການຜູ້ໃຊ້',
    },
  ];
}

/**
 * Check if user can perform delete operation
 */
export function canDelete(role: string | undefined): boolean {
  return hasPermission(role, 'delete_content');
}

/**
 * Check if user can manage other users
 */
export function canManageUsers(role: string | undefined): boolean {
  return hasPermission(role, 'manage_users');
}

/**
 * Check if user can modify settings
 */
export function canManageSettings(role: string | undefined): boolean {
  return hasPermission(role, 'manage_settings');
}
