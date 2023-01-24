import { Component, OnInit } from '@angular/core';
import { CognitoService } from './services/cognito.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  constructor(private cognitoService: CognitoService) {
    cognitoService.setUserSession();
  }

  ngOnInit(): void { }

}
