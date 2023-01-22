import { Component, OnInit } from '@angular/core';
import { Auth } from 'aws-amplify';
import { User } from '../models/user';
import { CognitoService } from '../services/cognito.service';
//import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-private-content',
  templateUrl: './private-content.component.html',
  styleUrls: ['./private-content.component.css']
})
export class PrivateContentComponent implements OnInit {

  isLogged:boolean = false;

  user = {} as User;

  constructor(private cognitoService: CognitoService) { 

  }

  ngOnInit(): void {
    this.isLogged = this.cognitoService.isAuthenticated();
    this.user = this.cognitoService.getSessionUser();
    console.log('privateUser: ', this.user);
   
  }

}
