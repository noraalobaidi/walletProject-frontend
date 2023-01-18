import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Account } from './account';
import { Transaction } from './transaction';

@Injectable({
  providedIn: 'root',
})
export class DWTService {
  updateAccUrl: string = 'http://localhost:8080/accounts';
  addNewTransactionUrl: string = 'http://localhost:8080/transactions/';
  constructor(private httpClient: HttpClient) {}
  updateAccount(updatedAccount: Account) {
    console.log(
      ` accountno :${updatedAccount.account_no}, balance :${updatedAccount.balance},civil :${updatedAccount.civil_id},first :${updatedAccount.first_name},last :${updatedAccount.last_name}`
    );
    this.httpClient
      .put(this.updateAccUrl, updatedAccount)
      .subscribe((response) => {
        console.log(response);
        console.log('account updated successfully');
      });
  }

  addTransaction(transaction: any, accountNumber: number) {
    this.httpClient
      .post(this.addNewTransactionUrl + accountNumber, transaction)
      .subscribe((response) => {
        console.log(response);
        console.log('transaction added successfully');
      });
  }

  addTransferTransaction(
    transaction: any,
    accountNumber: number,
    transferToAccount: number
  ) {
    this.httpClient
      .post(
        this.addNewTransactionUrl + accountNumber + '/' + transferToAccount,
        transaction
      )
      .subscribe((response) => {
        console.log(response);
        console.log('transaction added successfully');
      });
  }
}
