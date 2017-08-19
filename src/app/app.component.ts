import {Component, OnInit} from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  ngOnInit() {
    firebase.initializeApp({
      apiKey: "AIzaSyDwJAQlBj6wq9nSkLIZdoWZJlOSjJCV1Tw",
      authDomain: "angular-http-b118b.firebaseapp.com",
    });
  }
}
