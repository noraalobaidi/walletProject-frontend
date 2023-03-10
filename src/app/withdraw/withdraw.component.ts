import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { Account } from '../account';
import { DWTService } from '../dwt.service';
import { LoginServiceService } from '../login-service.service';
import { Transaction } from '../transaction';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.css'],
})
export class WithdrawComponent {
  userUpdatedAccount: Account = this.service.loggedInAccount;
  transaction: Transaction = new Transaction();
  userbalance: number = this.service.loggedInAccount.balance;
  prebalance: number = this.userbalance;
  newbalance!: number;
  amount!: number;
  date: Date = new Date();
  pipe = new DatePipe('en-US');
  type: string = 'withdraw';
  accountNo: number = this.service.loggedInAccount.account_no;
  newDate: string | null = this.pipe.transform(this.date, 'YYYY-MM-dd');
  log(templateVar: NgModel) {
    console.log(templateVar);
  }

  submitWithdraw(num: any) {
    // let num = amount.value;
    console.log(`amount = ${num} , type ${typeof num}`);
    console.log(this.date);
    console.log(this.newDate); //type of string
    if (num < this.prebalance) {
      this.newbalance = this.prebalance - num;
      this.userUpdatedAccount.balance = this.newbalance;
      this.dwtService.updateAccount(this.userUpdatedAccount);
      let fromLocalStorage = JSON.parse(
        localStorage.getItem('loggedinUser') || '{}'
      );
      console.log(fromLocalStorage);
      fromLocalStorage.balance = this.newbalance;
      localStorage.setItem('loggedinUser', JSON.stringify(fromLocalStorage));
      this.transaction.amount = num;
      this.transaction.date = this.newDate;
      this.transaction.new_balance = this.newbalance;
      this.transaction.pre_balance = this.prebalance;
      this.transaction.type = this.type;
      this.dwtService.addTransaction(
        this.transaction,
        this.userUpdatedAccount.account_no
      );
      this.service.getAllAccounts();
      this.dwtService.getAllTransactions();
      alert('Transaction Successfull');
      this.router.navigate(['homepage']);
    } else {
      alert('insufficient balance');
    }
  }

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private service: LoginServiceService,
    private dwtService: DWTService
  ) {}
}
