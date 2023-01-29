import { Amplify } from "aws-amplify";
import { environment } from "src/environments/environment";

export class AmplifyConfig {
    static configureAmplify() {
        if( process.env['NODE_ENV'] === 'production'){
            console.log('production');
        } else {
            Amplify.configure({
                Auth: environment.cognito
            });
        }
    }
  }