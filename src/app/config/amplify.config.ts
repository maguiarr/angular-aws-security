import { Injectable } from "@angular/core";
import { Amplify } from "aws-amplify";
import * as AWS from 'aws-sdk';
import { Credentials } from "aws-sdk";
import { environment } from "src/environments/environment";
import { awsConfig } from "./aws.config";

@Injectable()
export class AmplifyConfig {

    async getSSMParameters() {

        // if( true){
            if( process.env['NODE_ENV'] === 'production'){

                const userPoolIdEvn = '/s3-website/cognito/userPoolId';
                const userPoolWebClientIdEnv = '/s3-website/cognito/userPoolWebClientId';
                const oauthDomainEnv = '/s3-website/cognito/oauth/domain';
        
                try {
                const [userPoolId, userPoolWebClientId, oauthDomain] = await Promise.all([
                    this.getParameter(userPoolIdEvn),
                    this.getParameter(userPoolWebClientIdEnv),
                    this.getParameter(oauthDomainEnv)
                  ]);
        
        
        
                  if(userPoolId && userPoolWebClientId && oauthDomain){
                    environment.cognito.userPoolId = userPoolId;
                    environment.cognito.userPoolWebClientId = userPoolWebClientId;
                    environment.cognito.oauth.domain = oauthDomain;
        
                    console.log('userPoolId: ', userPoolId);
                    console.log('userPoolWebClientIdEnv: ', userPoolWebClientId);
                    console.log('oauthDomain: ', oauthDomain);
                    console.log('CognitoEnv: ', environment.cognito);
                    
        
                  }
        
                }catch (error){
                    console.log('error: ', error);
                }
    
            } 

            Amplify.configure({
                Auth: environment.cognito
            });
    }

    getParameter(parameterName: string) :Promise<any> {
        AWS.config.update({
            region: awsConfig.secrets.REGION,
            credentials: new Credentials(awsConfig.secrets.AWS_ACCESS_KEY_ID, awsConfig.secrets.AWS_SECRET_ACCESS_KEY)
            }
        );

        const ssm = new AWS.SSM();
        return new Promise((resolve, reject) => {
            ssm.getParameter({
              Name: parameterName
            }, (err, data) => {
              if (err) {
                reject(err);
              } else {
                console.log('getParameter: ', data.Parameter?.Value);
                resolve(data.Parameter?.Value);
              }
            });
          });
    }
  }