import { Component } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { Account } from '../account';
import { LoginServiceService } from '../login-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  log(templateVar: NgModel) {
    console.log(templateVar);
  }
  loggedinAccount!: Account;
  accountflag: boolean = false;

  login(civilId: number, accountNo: number, password: string) {
    // console.log(this.service.accountsList);
    this.service.accountsList.forEach(
      (element: {
        account_no: number;
        balance: number;
        civil_id: number;
        first_name: string;
        last_name: string;
        password: string;
      }) => {
        if (element.account_no == accountNo) {
          // console.log(element);
          this.accountflag = true;

          if (element.civil_id == civilId) {
            if (element.password == password) {
              this.loggedinAccount = element;
            } else {
              alert('invalid password');
            }
          } else {
            alert('invalid civil id');
          }
        }
      }
    );
    if (this.accountflag == false) {
      alert('invalid account number');
    } else {
      this.router.navigate(['homepage']);
    }
    // this.loggedinAccount = this.service.accountsList.filter(
    //   (element: { account_no: number }) => {
    //     console.log(element);
    //     console.log(`${typeof element.account_no}    =   ${typeof accountNo}`);
    //     element.account_no == accountNo;
    //   }
    // );
    console.log(this.loggedinAccount);
  }
  constructor(private service: LoginServiceService, private router: Router) {}
}
