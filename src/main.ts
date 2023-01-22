import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { Amplify, Auth } from 'aws-amplify';
//import awsconfig from './aws-exports';
//Amplify.configure(awsconfig);


// Amplify.configure({
//   Auth: {

//        // REQUIRED - Amazon Cognito Region
//       region: 'us-east-1',

//       // OPTIONAL - Amazon Cognito Federated Identity Pool Region 
//       // Required only if it's different from Amazon Cognito Region
//       identityPoolRegion: 'us-east-1',

//       // OPTIONAL - Amazon Cognito User Pool ID
//       userPoolId: 'us-east-1_6zMMf2WHM',

//       // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
//       userPoolWebClientId: '74heu1houigaueh8dvhbecdldg',

//       // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
//       mandatorySignIn: false,
      
//       // OPTIONAL - This is used when autoSignIn is enabled for Auth.signUp
//       // 'code' is used for Auth.confirmSignUp, 'link' is used for email link verification
//       signUpVerificationMethod: 'code', // 'code' | 'link' 


//       // OPTIONAL - Manually set the authentication flow type. Default is 'USER_SRP_AUTH'
//       //authenticationFlowType: 'USER_PASSWORD_AUTH',

//       // OPTIONAL - Manually set key value pairs that can be passed to Cognito Lambda Triggers
//       //clientMetadata: { myCustomKey: 'myCustomValue' },

//        // OPTIONAL - Hosted UI configuration
//       oauth: {
//           domain: 'auth.cloudbean.ca',
//           scope: ['phone', 'email', 'profile', 'openid', 'aws.cognito.signin.user.admin'],
//           redirectSignIn: 'http://localhost:4200/private',
//           redirectSignOut: 'http://localhost:4200/private',
//           //redirectSignIn: 'http://localhost:3000/',
//           //redirectSignOut: 'http://localhost:3000/',
//           responseType: 'code' // or 'token', note that REFRESH token will only be generated when the responseType is code
//       }
//   }
// });

Amplify.configure({
  Auth: {

       // REQUIRED - Amazon Cognito Region
      region: 'us-east-1',

      // OPTIONAL - Amazon Cognito Federated Identity Pool Region 
      // Required only if it's different from Amazon Cognito Region
      identityPoolRegion: 'us-east-1',

      // OPTIONAL - Amazon Cognito User Pool ID
      userPoolId: 'us-east-1_6zMMf2WHM',

      // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
      userPoolWebClientId: '11bd7njio5sovpeih3pekqadsb',

      // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
      mandatorySignIn: false,
      
      // OPTIONAL - This is used when autoSignIn is enabled for Auth.signUp
      // 'code' is used for Auth.confirmSignUp, 'link' is used for email link verification
      signUpVerificationMethod: 'code', // 'code' | 'link' 


      // OPTIONAL - Manually set the authentication flow type. Default is 'USER_SRP_AUTH'
      //authenticationFlowType: 'USER_PASSWORD_AUTH',

      // OPTIONAL - Manually set key value pairs that can be passed to Cognito Lambda Triggers
      //clientMetadata: { myCustomKey: 'myCustomValue' },

       // OPTIONAL - Hosted UI configuration
      oauth: {
          domain: 'auth.cloudbean.ca',
          scope: ['phone', 'email', 'profile', 'openid', 'aws.cognito.signin.user.admin'],
          redirectSignIn: 'http://localhost:4200',
          redirectSignOut: 'http://localhost:4200',
          //redirectSignIn: 'http://localhost:3000/',
          //redirectSignOut: 'http://localhost:3000/',
          responseType: 'code' // or 'token', note that REFRESH token will only be generated when the responseType is code
      }
  }
});

const currentConfig = Auth.configure();

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
