// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  cognito: {
    userPoolId: 'us-east-1_6zMMf2WHM',
    userPoolWebClientId: '11bd7njio5sovpeih3pekqadsb',
    mandatorySignIn: false,
    oauth: {
      domain: 'auth.cloudbean.ca',
      scope: ['phone', 'email','openid', 'aws.cognito.signin.user.admin'],
      redirectSignIn: 'http://localhost:4200/private',
      redirectSignOut: 'http://localhost:4200/private',
      responseType: 'code' // or 'token', note that REFRESH token will only be generated when the responseType is code
    }
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
