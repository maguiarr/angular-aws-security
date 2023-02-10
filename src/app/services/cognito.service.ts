import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Auth } from 'aws-amplify';
import { User } from '../models/user';
import { from, Observable } from  'rxjs';
import { DataService } from '../services/data.service';
import * as AWS from 'aws-sdk';



@Injectable()
export class CognitoService {

  user = {} as User;
  authenticated: boolean = false;
  message: Observable<string>;

  constructor(private data: DataService) { }

  public getCognitoUser() :Promise<any> {
    return  Auth.currentUserInfo();
  }

  public getCognitoToken(): Promise<any> {
    return Auth.currentSession();
  }

  public async setUserSession(){
    try {

      console.log('Auth: ', Auth.configure().userPoolId);
     if(Auth.configure().userPoolId){
        const [cognitoUser, cognitoSession] = await Promise.all([
          this.getCognitoUser(),
          this.getCognitoToken()
        ]);

        if (cognitoUser) {
          this.user.userName = cognitoUser.username;
          this.user.email = cognitoUser.attributes.email;
        }   

        if (cognitoSession) {
          this.user.idToken = cognitoSession.getIdToken().getJwtToken();

          AWS.config.credentials = new AWS.CognitoIdentityCredentials({
            IdentityPoolId: 'us-east-1:2b091c94-09c5-446e-aeae-349d75bc840d',
            Logins: {
              'cognito-idp.us-east-1.amazonaws.com/us-east-1_IZG5CoIgZ': this.user.idToken
            }
          }, { region: 'us-east-1'});
    
        }   

        sessionStorage.setItem('user', JSON.stringify(this.user));
        localStorage.clear();

        this.data.changeMessage(true);
      }
    } catch (error){
      console.log('error: ', error);
    }
  
  }

  isAuthenticated(): boolean {
   
    if(sessionStorage.getItem('user')) {
      return true;
    }
    return false;
  }

  getSessionUser(): User {
    if (this.isAuthenticated()){
      let stringUser = sessionStorage.getItem('user');
      if(stringUser) {
        return JSON.parse(stringUser);
      }  
      console.log('fromSession: ', stringUser);
    }
      return this.user;
    }
 

  public async signOut() {
    try {
      await Auth.signOut();
      sessionStorage.removeItem('isLogged');
      sessionStorage.removeItem('user');
    } catch (error) {
      console.log('error signing out: ', error);
    }
  }

  getCognitoURL(): URL {
    let domain = "https://" + environment.cognito.oauth.domain + "/login?";
    let client_id = "client_id=" + environment.cognito.userPoolWebClientId + "&";
    let response_type = "response_type=" + environment.cognito.oauth.responseType + "&";
    let scope = "scope=" + environment.cognito.oauth.scope.join('+') + "&";
    let redirect_uri = "redirect_uri=" + environment.cognito.oauth.redirectSignIn;

    const url = new URL(domain + client_id + response_type + scope + redirect_uri);
    return url;
 
    //return new URL ("https://auth.cloudbean.ca/login?client_id=11bd7njio5sovpeih3pekqadsb&response_type=code&scope=aws.cognito.signin.user.admin+email+openid+phone&redirect_uri=http://localhost:4200/private");
  }



  public getCognitoUserObs() :Observable<boolean>{
    return  from(Auth.currentUserInfo());
  }

}
