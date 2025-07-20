const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

export type TokenData  = {
  accessToken: string;
  refreshToken: string;
}

export const storageService = {
  setTokens(tokens: TokenData): void {
    try {
      localStorage.setItem(ACCESS_TOKEN_KEY, tokens.accessToken);
      localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refreshToken);
    } catch (error) {
      console.error('Failed to store tokens in localStorage:', error);
    }
  },

  getAccessToken(): string | null {
    try {
      return localStorage.getItem(ACCESS_TOKEN_KEY);
    } catch (error) {
      return null;
    }
  },

  getRefreshToken(): string | null {
    try {
      return localStorage.getItem(REFRESH_TOKEN_KEY);
    } catch (error) {
      return null;
    }
  },

  updateAccessToken(accessToken: string): void {
    try {
      localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    } catch (error) {
      console.error('Failed to update access token in localStorage:', error);
    }
  },

  updateRefreshToken(refreshToken: string): void {
    try {
      localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
    } catch (error) {
      console.error('Failed to update refresh token in localStorage:', error);
    }
  },

  clearTokens(): void {
    try {
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      localStorage.removeItem(REFRESH_TOKEN_KEY);
    } catch (error) {
      console.error('Failed to clear tokens from localStorage:', error);
    }
  },

  clearAccessToken(): void {
    try {
      localStorage.removeItem(ACCESS_TOKEN_KEY);
    } catch (error) {
      console.error('Failed to clear access token from localStorage:', error);
    }
  },

  clearRefreshToken(): void {
    try {
      localStorage.removeItem(REFRESH_TOKEN_KEY);
    } catch (error) {
      console.error('Failed to clear refresh token from localStorage:', error);
    }
  },

  hasAccessToken(): boolean {
    return !!this.getAccessToken();
  },

  hasRefreshToken(): boolean {
    return !!this.getRefreshToken();
  },

  getTokenExpiration(token: string): number | null {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp ? payload.exp * 1000 : null; 
    } catch (error) {
      console.error('Failed to decode token:', error);
      return null;
    }
  },

  isAccessTokenExpired(): boolean {
    const accessToken = this.getAccessToken();
    if (!accessToken) return true;

    const expiration = this.getTokenExpiration(accessToken);
    if (!expiration) return true;

    return Date.now() >= expiration;
  },

  isRefreshTokenExpired(): boolean {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) return true;

    const expiration = this.getTokenExpiration(refreshToken);
    if (!expiration) return true;

    return Date.now() >= expiration;
  },

  needsTokenRefresh(): boolean {
    return this.isAccessTokenExpired() && !this.isRefreshTokenExpired();
  }
};

export default storageService;