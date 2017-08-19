import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css']
})
export class SingupComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

  onSignUp(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
  }

}
