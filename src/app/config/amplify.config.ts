import { Injectable } from "@angular/core";
import { Amplify } from "aws-amplify";
import { environment } from "src/environments/environment";

@Injectable()
export class AmplifyConfig {

    configureAmplify(){
        Amplify.configure({
            Auth: environment.cognito
        });
    }
  }