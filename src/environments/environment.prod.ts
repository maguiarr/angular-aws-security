export const environment = {
  production: true,
  cognito: {
    userPoolId: 'Your user pool id',
    userPoolWebClientId: 'Your client id',
    mandatorySignIn: false,
    oauth: {
      domain: 'Your domain',
      scope: ['phone', 'email','openid', 'aws.cognito.signin.user.admin'],
      redirectSignIn: 'http://localhost:4200/private',
      redirectSignOut: 'http://localhost:4200/private',
      responseType: 'code' // or 'token', note that REFRESH token will only be generated when the responseType is code
    }
  }
};
