import { Injectable } from '@angular/core';
import { Amplify } from 'aws-amplify';
import { environment } from 'src/environments/environment';
import { Auth } from 'aws-amplify';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class CognitoService {

  user = {} as User;
  authenticated: boolean = false;

  constructor() { 
    Amplify.configure({
      Auth: environment.cognito
    })
   // this.setUserSession();
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
        console.log('coguser: ', cognitoUser);
        this.user.userName = cognitoUser.username;
        this.user.email = "maguiarr@yahoo.ca";
        //this.isLogged = true;
      }   

      const cognitoSession = await this.getCognitoToken();
      if (cognitoSession) {
        this.user.idToken = cognitoSession.getIdToken().getJwtToken();
      }   

      sessionStorage.setItem('user', JSON.stringify(this.user));
      localStorage.clear();

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
      // sessionStorage.clear();
      sessionStorage.removeItem('isLogged');
      sessionStorage.removeItem('user');
    } catch (error) {
      console.log('error signing out: ', error);
    }

  }

}
