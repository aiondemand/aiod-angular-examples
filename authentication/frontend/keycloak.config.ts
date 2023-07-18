import { AuthConfig } from 'angular-oauth2-oidc';

export const authConfig: AuthConfig = {
  issuer: 'https://test.openml.org/aiod-auth/realms/dev',
  clientId: 'PUT_HERE_YOUR_CLIENT_ID',
  redirectUri: window.location.origin + '/',
  responseType: 'code',
  scope: 'openid profile email',
  showDebugInformation: true
};