export const environment = {
  production: true,
  cognito: {
    userPoolId: 'us-east-1_6zMMf2WHM',
    userPoolWebClientId: '11bd7njio5sovpeih3pekqadsb',
    mandatorySignIn: false,
    oauth: {
      domain: 'auth.cloudbean.ca',
      scope: ['phone', 'email','openid', 'aws.cognito.signin.user.admin'],
      redirectSignIn: 'https://cloudbean.ca/private',
      redirectSignOut: 'https://cloudbean.ca/private',
      responseType: 'code' // or 'token', note that REFRESH token will only be generated when the responseType is code
    }
  }
};
