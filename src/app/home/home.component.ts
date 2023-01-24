import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { CognitoService } from '../services/cognito.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void { }

}
