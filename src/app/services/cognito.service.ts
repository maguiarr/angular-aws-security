import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Auth } from 'aws-amplify';
import { User } from '../models/user';
import { from, Observable } from  'rxjs';
import { DataService } from '../services/data.service';
import { AmplifyConfig } from '../config/amplify.config';


@Injectable({
  providedIn: 'root'
})
export class CognitoService {

  user = {} as User;
  authenticated: boolean = false;
  message: Observable<string>;

  constructor(private data: DataService) { 
        AmplifyConfig.configureAmplify();
  }

  public getCognitoUser() :Promise<any> {
    return  Auth.currentUserInfo();
  }

  public getCognitoToken(): Promise<any> {
    return Auth.currentSession();
  }

  public async setUserSession(){
    try {
      const cognitoUser = await this.getCognitoUser();
      if (cognitoUser) {
        this.user.userName = cognitoUser.username;
        this.user.email = cognitoUser.attributes.email;
      }   

      const cognitoSession = await this.getCognitoToken();
      if (cognitoSession) {
        this.user.idToken = cognitoSession.getIdToken().getJwtToken();
      }   

      sessionStorage.setItem('user', JSON.stringify(this.user));
      localStorage.clear();

      this.data.changeMessage(true);
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
