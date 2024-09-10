
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;

export const selectUserRole = (state) => state.auth.userRole;

// Sélecteur pour vérifier si l'utilisateur a un rôle spécifique
export const selectHasRole = (requiredRole) => (state) =>
  requiredRole.includes(state.auth.userRole);
