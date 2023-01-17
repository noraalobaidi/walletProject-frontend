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
}
