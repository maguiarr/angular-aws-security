import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DataService {

    isLogged = new BehaviorSubject<boolean>(false);
    currentState = this.isLogged.asObservable();

    constructor(){}

    changeMessage(state: boolean) {
        this.isLogged.next(state);
    }


}