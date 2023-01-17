import { Component } from '@angular/core';
import { NgModel } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  urlToHit: string = 'http://localhost:8080/accounts';
  responseData!: any;
  result!: any;

  constructor(private httpClient: HttpClient, private router: Router) {}

  log(templateVar: NgModel) {
    console.log(templateVar);
  }
  checkCapital(pass: NgModel): boolean {
    var pattern = new RegExp('^(?=.*[A-Z]).+$');
    // console.log(pattern.test(pass.value));
    if (!pattern.test(pass.value)) {
      return true;
    } else return false;
  }
  checkSmall(pass: NgModel): boolean {
    var pattern = new RegExp('^(?=.*[a-z]).+$');
    // console.log(pattern.test(pass.value));
    if (!pattern.test(pass.value)) {
      return true;
    } else return false;
  }
  checkNum(pass: NgModel): boolean {
    var pattern = new RegExp('^(?=.*[0-9]).+$');
    // console.log(pattern.test(pass.value));
    if (!pattern.test(pass.value)) {
      return true;
    } else return false;
  }
  checkSpecialChar(pass: NgModel): boolean {
    var pattern = new RegExp('^(?=.*[@$!%*?&]).+$');
    // console.log(pattern.test(pass.value));
    if (!pattern.test(pass.value)) {
      return true;
    } else return false;
  }
  signup(
    firstName: string,
    lastName: string,
    civilId: number,
    password: string
  ) {
    console.log(
      `firstname:${firstName},last${lastName},civil${civilId} ,pass${password}`
    );
    this.httpClient
      .post(this.urlToHit, {
        balance: 0,
        civil_id: civilId,
        first_name: firstName,
        last_name: lastName,
        password: password,
      })
      .subscribe((response) => {
        this.responseData = response;
        console.log(response);
        alert(
          `Account created successfully , welcome ${this.responseData.first_name} `
        );
      });

    this.router.navigate(['homepage']);
  }
}
