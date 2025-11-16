let accessToken: string | null = null;

export const setAccessToken = (token: string | null) => {
  accessToken = token;
};

export const getAccessToken = () => accessToken;

export const isAuthenticated = (): boolean => {
  return accessToken !== null;
};

export const logout = async () => {
  // Clear access token from memory
  setAccessToken(null);

  // Clear refresh token cookie by calling backend
  try {
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });
  } catch (error) {
    console.error("Logout error:", error);
  }

  // Redirect to login page
  window.location.href = "/login";
};
