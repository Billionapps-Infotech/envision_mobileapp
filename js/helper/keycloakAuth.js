import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import * as Crypto from 'expo-crypto';

WebBrowser.maybeCompleteAuthSession();

const KEYCLOAK_CONFIG = {
  realm: '',
  clientId: '',
  baseUrl: '',
};

export const configureKeycloak = (config) => {
  KEYCLOAK_CONFIG.realm = config.realm || '';
  KEYCLOAK_CONFIG.clientId = config.clientId || '';
  KEYCLOAK_CONFIG.baseUrl = config.url || '';
};

const getDiscoveryDocument = () => {
  const baseUrl = KEYCLOAK_CONFIG.baseUrl;
  const realm = KEYCLOAK_CONFIG.realm;
  
  return {
    authorizationEndpoint: `${baseUrl}/realms/${realm}/protocol/openid-connect/auth`,
    tokenEndpoint: `${baseUrl}/realms/${realm}/protocol/openid-connect/token`,
    revocationEndpoint: `${baseUrl}/realms/${realm}/protocol/openid-connect/revoke`,
    endSessionEndpoint: `${baseUrl}/realms/${realm}/protocol/openid-connect/logout`,
  };
};

export const generateCodeVerifier = async () => {
  const randomBytes = await Crypto.getRandomBytesAsync(32);
  return btoa(String.fromCharCode(...randomBytes))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
};

export const generateCodeChallenge = async (verifier) => {
  const digest = await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    verifier,
    { encoding: Crypto.CryptoEncoding.BASE64 }
  );
  return digest
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
};

export const login = async () => {
  try {
    const discovery = getDiscoveryDocument();
    const redirectUri = AuthSession.makeRedirectUri({
      scheme: 'envision',
      path: 'auth',
    });

    const codeVerifier = await generateCodeVerifier();
    const codeChallenge = await generateCodeChallenge(codeVerifier);

    const request = new AuthSession.AuthRequest({
      clientId: KEYCLOAK_CONFIG.clientId,
      redirectUri,
      scopes: ['openid', 'profile', 'email'],
      responseType: AuthSession.ResponseType.Code,
      codeChallengeMethod: AuthSession.CodeChallengeMethod.S256,
      codeChallenge,
    });

    const result = await request.promptAsync(discovery);

    if (result.type === 'success') {
      const tokenResponse = await AuthSession.exchangeCodeAsync(
        {
          clientId: KEYCLOAK_CONFIG.clientId,
          code: result.params.code,
          redirectUri,
          extraParams: {
            code_verifier: codeVerifier,
          },
        },
        discovery
      );

      return {
        success: true,
        tokens: {
          access_token: tokenResponse.accessToken,
          refresh_token: tokenResponse.refreshToken,
          id_token: tokenResponse.idToken,
          expires_in: tokenResponse.expiresIn,
          token_type: tokenResponse.tokenType,
        },
      };
    }

    return { success: false, error: result.type };
  } catch (error) {
    console.error('Keycloak login error:', error);
    return { success: false, error: error.message };
  }
};

export const logout = async (idToken) => {
  try {
    const discovery = getDiscoveryDocument();
    const redirectUri = AuthSession.makeRedirectUri({
      scheme: 'envision',
      path: 'logout',
    });

    await WebBrowser.openAuthSessionAsync(
      `${discovery.endSessionEndpoint}?id_token_hint=${idToken}&post_logout_redirect_uri=${encodeURIComponent(redirectUri)}`,
      redirectUri
    );

    return { success: true };
  } catch (error) {
    console.error('Keycloak logout error:', error);
    return { success: false, error: error.message };
  }
};

export const refreshTokens = async (refreshToken) => {
  try {
    const discovery = getDiscoveryDocument();
    
    const tokenResponse = await AuthSession.refreshAsync(
      {
        clientId: KEYCLOAK_CONFIG.clientId,
        refreshToken,
      },
      discovery
    );

    return {
      success: true,
      tokens: {
        access_token: tokenResponse.accessToken,
        refresh_token: tokenResponse.refreshToken,
        id_token: tokenResponse.idToken,
        expires_in: tokenResponse.expiresIn,
        token_type: tokenResponse.tokenType,
      },
    };
  } catch (error) {
    console.error('Token refresh error:', error);
    return { success: false, error: error.message };
  }
};

const Login = {
  startLoginProcess: login,
  logout: logout,
  refreshToken: refreshTokens,
  config: configureKeycloak,
};

export default Login;
