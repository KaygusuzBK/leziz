// Types
export type { AuthState, AuthResult, UserProfileUpdates } from './types'

// Authentication
export { signInWithEmail, signUpWithEmail, signOut } from './authentication'

// User State
export { getCurrentUser, getCurrentSession, isAuthenticated } from './user-state'

// Password Management
export { resetPassword, updatePassword } from './password'

// Real-time Listeners
export { onAuthStateChange, subscribeToAuthChanges } from './listeners'

// Profile Management
export { updateUserProfile, deleteUser } from './profile'

// Session Management
export { refreshSession } from './session' 