import {Component, OnInit} from '@angular/core';
import * as firebase from 'firebase';
import {AuthService} from "./services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private authService: AuthService,
              private router: Router) {
  }

  ngOnInit() {
    firebase.initializeApp({
      apiKey: "AIzaSyDwJAQlBj6wq9nSkLIZdoWZJlOSjJCV1Tw",
      authDomain: "angular-http-b118b.firebaseapp.com",
    });
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/signin']);
    }
  }
}
