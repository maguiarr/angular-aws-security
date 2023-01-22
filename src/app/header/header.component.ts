import { Component, OnInit } from '@angular/core';
import { CognitoService } from '../services/cognito.service';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLogged: boolean = false;
  user = {} as User;

  constructor(private router:Router, private cognitoService: CognitoService) { }

  ngOnInit(): void {
    this.user = this.cognitoService.getSessionUser();
    this.isLogged = this.cognitoService.isAuthenticated();
    console.log('fromHeader isLogged: ',this.cognitoService.isAuthenticated());
   // console.log('fromHeader user: ',this.cognitoService.getSessionUser());
  }

  onLoginClick() {
    const URL ="https://auth.cloudbean.ca/login?client_id=11bd7njio5sovpeih3pekqadsb&response_type=code&scope=aws.cognito.signin.user.admin+email+openid+phone&redirect_uri=http://localhost:4200";
    window.location.assign(URL);
  }

  onLogoutClick() {
    this.isLogged = false;
    this.router.navigate(['/']);
    this.cognitoService.signOut();
  }

}
