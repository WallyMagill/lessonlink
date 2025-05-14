/**
 * User Model Schema
 * 
 * Defines the structure for user accounts in the LessonLink platform.
 * 
 * Fields:
 * - email: Unique email address for login
 * - password: Hashed password
 * - role: User role (teacher, substitute, admin, parent)
 * - firstName: User's first name
 * - lastName: User's last name
 * - school: Associated school
 * - classes: Array of class references
 * - createdAt: Account creation timestamp
 * - lastLogin: Last login timestamp
 * 
 * Methods:
 * - Password hashing
 * - JWT token generation
 * - Role-based access control
 */
