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
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css'],
})
export class TransferComponent {
  message!: string;
  allAccounts: Account[] = this.service.accountsList;
  flagFound: boolean = false;
  transferAccountlist: Account[] = [];

  amount!: number;
  date: Date = new Date();
  pipe = new DatePipe('en-US');
  newDate: string | null = this.pipe.transform(this.date, 'YYYY-MM-dd');

  //user
  userUpdatedAccount: Account = this.service.loggedInAccount;
  userbalance: number = this.service.loggedInAccount.balance;
  prebalance: number = this.userbalance;
  newbalance!: number;
  type: string = 'transfer';
  accountNo: number = this.service.loggedInAccount.account_no;
  transaction: Transaction = new Transaction();
  //transfer to Account
  transferAccount!: Account; //
  transferrAcc_balance!: number; //
  transferrAcc_prebalance!: number; //
  transferrAcc_newbalance!: number;
  transferrAcc_type: string = 'deposit (transfer)';
  transferrAcc_accountNo!: number; //
  transferTransaction: Transaction = new Transaction();
  log(templateVar: NgModel) {
    console.log(templateVar);
  }
  SearchAccount(accountno: any) {
    this.transferAccountlist = this.allAccounts.filter(
      (account) => account.account_no == accountno
    );
    if (this.transferAccountlist.length > 0) {
      this.transferAccount = this.transferAccountlist[0];
      this.transferrAcc_balance = this.transferAccount.balance;
      this.transferrAcc_prebalance = this.transferAccount.balance;
      this.transferrAcc_accountNo = this.transferAccount.account_no;

      this.flagFound = true;
      this.message = ` ${this.transferAccount.first_name}  ${this.transferAccount.last_name} `;
    } else {
      this.flagFound = true;
      this.message = ` Account does not exist `;
    }
  }
  submitTransfer(num: any) {
    // let num = amount.value;
    console.log(`amount = ${num} , type ${typeof num}`);
    console.log(this.date);
    console.log(this.newDate); //type of string

    if (num < this.prebalance) {
      //user
      this.newbalance = this.prebalance - num;
      this.userUpdatedAccount.balance = this.newbalance;
      this.dwtService.updateAccount(this.userUpdatedAccount);
      this.transaction.amount = num;
      this.transaction.date = this.newDate;
      this.transaction.new_balance = this.newbalance;
      this.transaction.pre_balance = this.prebalance;
      this.transaction.type = this.type;
      this.dwtService.addTransferTransaction(
        this.transaction,
        this.userUpdatedAccount.account_no,
        this.transferrAcc_accountNo
      );
      //transfer to account
      this.transferrAcc_newbalance = this.transferrAcc_prebalance + num;
      this.transferAccount.balance = this.transferrAcc_newbalance;
      this.dwtService.updateAccount(this.transferAccount);
      //
      this.transferTransaction.amount = num;
      this.transferTransaction.date = this.newDate;
      this.transferTransaction.new_balance = this.transferrAcc_newbalance;
      this.transferTransaction.pre_balance = this.transferrAcc_prebalance;
      this.transferTransaction.type = this.transferrAcc_type;
      this.dwtService.addTransferTransaction(
        this.transferTransaction,
        this.transferrAcc_accountNo,
        this.userUpdatedAccount.account_no
      );
      //
      this.service.getAllAccounts();
      alert('Transaction Successfull');
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
