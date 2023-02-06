import { Component, OnInit } from '@angular/core';
import { CognitoService } from '../services/cognito.service';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLogged: Observable<boolean>;

  constructor(private router:Router, private cognitoService: CognitoService, private data: DataService) { }

  ngOnInit(): void {
    if(this.cognitoService.isAuthenticated()){
      this.data.changeMessage(true);
    }
    this.isLogged = this.data.currentState;
  }

  onLoginClick() {

    //const URL ="https://auth.cloudbean.ca/login?client_id=11bd7njio5sovpeih3pekqadsb&response_type=code&scope=aws.cognito.signin.user.admin+email+openid+phone&redirect_uri=http://localhost:4200/private";
   window.location.assign(this.cognitoService.getCognitoURL());
  }

  onLogoutClick() {
    this.router.navigate(['/']);
    this.cognitoService.signOut();
    this.data.changeMessage(false);
  }

}
