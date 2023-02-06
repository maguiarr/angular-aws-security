import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { CognitoService } from '../services/cognito.service';
import { DataService } from '../services/data.service';


@Component({
  selector: 'app-private-content',
  templateUrl: './private-content.component.html',
  styleUrls: ['./private-content.component.css']
})
export class PrivateContentComponent implements OnInit {

  isLogged: Observable<boolean>;

  user = {} as User;

  constructor(private cognitoService: CognitoService, private data: DataService) { 

  }

  ngOnInit(): void {
    if(this.cognitoService.isAuthenticated()){
      this.data.changeMessage(true);
    }
    this.isLogged = this.data.currentState;
    this.user = this.cognitoService.getSessionUser();
  }

}
